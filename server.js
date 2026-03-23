// ═══════════════════════════════════════════════════════════════
// NEBULA CONQUEST — SERVEUR AUTORITAIRE
// Node.js + socket.io | Plan S1 → S5
// ═══════════════════════════════════════════════════════════════

const http    = require('http');
const { Server } = require('socket.io');
const { createClient } = require('@supabase/supabase-js');
const RoomManager = require('./game/roomManager');
const { computeElo } = require('./game/state');

// ── Config ──
const PORT               = process.env.PORT || 3000;
const SUPABASE_URL       = process.env.SUPABASE_URL || 'https://hcjajtpbzusqgxkyzbgc.supabase.co';
const SUPABASE_KEY       = process.env.SUPABASE_SERVICE_KEY || '';
const MAX_PLAYERS        = parseInt(process.env.MAX_PLAYERS_PER_ROOM || '50');
const TICK_RATE          = parseInt(process.env.TICK_RATE || '20');

// ── Supabase admin (vérification JWT) ──
const supa = SUPABASE_KEY
    ? createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { autoRefreshToken: false, persistSession: false } })
    : null;

// ── HTTP + socket.io ──
const httpServer = http.createServer((req, res) => {
    if (req.url === '/health') {
        res.writeHead(200); res.end('ok');
    } else if (req.url === '/stats') {
        const mem = process.memoryUsage();
        const activeRooms = Array.from(rooms.rooms.values());
        const stats = {
            uptime_s:       Math.floor(process.uptime()),
            memory_mb:      Math.round(mem.heapUsed / 1024 / 1024),
            memory_total_mb:Math.round(mem.heapTotal / 1024 / 1024),
            rooms_total:    activeRooms.length,
            rooms_lobby:    activeRooms.filter(r => r.phase === 'lobby').length,
            rooms_game:     activeRooms.filter(r => r.phase === 'game').length,
            rooms_end:      activeRooms.filter(r => r.phase === 'end').length,
            players_connected: io.engine.clientsCount,
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(stats, null, 2));
    } else {
        res.writeHead(404); res.end('Nebula Conquest Server');
    }
});

const io = new Server(httpServer, {
    cors: { origin: '*', methods: ['GET', 'POST'] },
    pingTimeout: 10000,
    pingInterval: 5000
});

const rooms = new RoomManager(io, MAX_PLAYERS, TICK_RATE, supa, computeElo);

// ── Vérification JWT Supabase ──
async function verifyToken(token) {
    if (!supa || !token) return null;
    try {
        const { data, error } = await supa.auth.getUser(token);
        if (error || !data?.user) return null;
        return data.user;
    } catch(e) { return null; }
}

// ── Connexions ──
io.on('connection', async (socket) => {
    console.log(`[connect] ${socket.id}`);

    const token = socket.handshake.auth?.token;
    const user  = await verifyToken(token);
    socket.userId    = user?.id    || socket.id;
    socket.userName  = socket.handshake.auth?.pseudo || 'Joueur-' + socket.id.slice(0,4);
    socket.userColor = socket.handshake.auth?.color  || '#C084FC';
    socket.guildTag  = socket.handshake.auth?.guildTag || null;
    socket.guildId   = socket.handshake.auth?.guildId  || null;

    socket.on('lobby_list',    ()     => socket.emit('lobby_list', rooms.getPublicList()));
socket.on('join_room',     (data) => {
        const result = rooms.join(socket, data);
        if (result.error) socket.emit('error', { msg: result.error });
        else socket.emit('room_joined', { roomId: result.roomId, slot: result.slot });
    });
    socket.on('send_universe', (data) => {
        const room = rooms.getRoomOf(socket);
        if (room && data?.universe) {
            room._pendingUniverse = data.universe;
        }
    });
socket.on('quick_match', (data) => {
        // Si déjà dans la room auto en lobby, juste confirmer
        if (socket.roomId) {
            const existing = rooms.rooms.get(socket.roomId);
            if (existing && existing._isAuto && existing.phase === 'lobby') {
                socket.emit('room_joined', { roomId: existing.id, slot: socket.slot });
                return;
            }
            rooms.leave(socket);
        }
        // Chercher LA room auto en attente
        let autoRoom = null;
        for (const r of rooms.rooms.values()) {
            if (r._isAuto && r.phase === 'lobby' && !r.isFull) {
                autoRoom = r; break;
            }
        }
        if (!autoRoom) {
            const created = rooms.createAutoRoom();
            autoRoom = created.room;
        }
        const slot = autoRoom.addPlayer(socket);
        socket.emit('room_joined', { roomId: autoRoom.id, slot });
        console.log(`[quick_match] ${socket.userName} → room ${autoRoom.id} slot ${slot}`);
    });
    socket.on('leave_room',    ()     => rooms.leave(socket));
    socket.on('player_ready',  (data) => rooms.setReady(socket, data?.ready !== false));
    socket.on('player_action', (data) => rooms.handleAction(socket, data));
    socket.on('vote_bots', () => rooms.voteBots(socket));
    socket.on('chat', (data) => {
        const room = rooms.getRoomOf(socket);
        if (!room) return;
        io.to(room.id).emit('chat', {
            pseudo: socket.userName, color: socket.userColor,
            msg: String(data?.msg || '').slice(0, 200)
        });
    });
    socket.on('disconnect', () => {
        console.log(`[disconnect] ${socket.id}`);
        rooms.leave(socket);
    });
});

// ── Start ──
httpServer.listen(PORT, () => {
    console.log(`Nebula Conquest Server — port ${PORT}`);
    rooms.createAutoRoom();
    console.log(`Supabase : ${supa ? 'connecté' : 'mode dev (pas de vérif JWT)'}`);
    console.log(`Max joueurs/room : ${MAX_PLAYERS} | Tick rate : ${TICK_RATE}Hz`);

// Log de santé toutes les 5 minutes
    setInterval(() => {
        const mem = process.memoryUsage();
        const activeRooms = Array.from(rooms.rooms.values());
        const inGame = activeRooms.filter(r => r.phase === 'game').length;
        const players = io.engine.clientsCount;
        const memMb = Math.round(mem.heapUsed / 1024 / 1024);
        console.log(`[health] ${new Date().toISOString()} | RAM: ${memMb}MB | rooms: ${activeRooms.length} (${inGame} en jeu) | joueurs: ${players}`);
    }, 5 * 60 * 1000);

    // Nettoyage automatique des rooms Supabase abandonnées toutes les 30 minutes
    if (supa) {
        setInterval(async () => {
            try {
                const cutoff = new Date(Date.now() - 60 * 60 * 1000).toISOString(); // 1 heure
                const { data: oldRooms } = await supa.from('game_rooms')
                    .select('id').eq('status', 'waiting').lt('created_at', cutoff);
                if (oldRooms && oldRooms.length > 0) {
                    const ids = oldRooms.map(r => r.id);
                    await supa.from('game_room_players').delete().in('room_id', ids);
                    await supa.from('game_rooms').delete().in('id', ids);
                    console.log(`[cleanup] ${oldRooms.length} room(s) abandonnée(s) supprimée(s)`);
                }
            } catch(e) {
                console.warn('[cleanup] Erreur nettoyage rooms:', e.message);
            }
        }, 30 * 60 * 1000);
    }
});
