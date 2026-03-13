// ═══════════════════════════════════════════════════════════════
// NEBULA CONQUEST — SERVEUR AUTORITAIRE
// Node.js + socket.io | Plan S1 → S5
// ═══════════════════════════════════════════════════════════════

const http    = require('http');
const { Server } = require('socket.io');
const { createClient } = require('@supabase/supabase-js');
const RoomManager = require('./game/roomManager');

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
    if (req.url === '/health') { res.writeHead(200); res.end('ok'); }
    else { res.writeHead(404); res.end('Nebula Conquest Server'); }
});

const io = new Server(httpServer, {
    cors: { origin: '*', methods: ['GET', 'POST'] },
    pingTimeout: 10000,
    pingInterval: 5000
});

const rooms = new RoomManager(io, MAX_PLAYERS, TICK_RATE);

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

    socket.on('lobby_list',    ()     => socket.emit('lobby_list', rooms.getPublicList()));
    socket.on('join_room',     (data) => {
        const result = rooms.join(socket, data);
        if (result.error) socket.emit('error', { msg: result.error });
        else socket.emit('room_joined', { roomId: result.roomId, slot: result.slot });
    });
    socket.on('leave_room',    ()     => rooms.leave(socket));
    socket.on('player_ready',  (data) => rooms.setReady(socket, data?.ready !== false));
    socket.on('player_action', (data) => rooms.handleAction(socket, data));
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
    console.log(`Supabase : ${supa ? 'connecté' : 'mode dev (pas de vérif JWT)'}`);
    console.log(`Max joueurs/room : ${MAX_PLAYERS} | Tick rate : ${TICK_RATE}Hz`);
});
