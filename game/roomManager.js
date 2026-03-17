// ═══════════════════════════════════════════════════════════════
// ROOM MANAGER — Gestion des parties
// ═══════════════════════════════════════════════════════════════

const GameState = require('./state');
const { applyAction } = require('./actions');

class Room {
    constructor(id, io, maxPlayers, tickRate, supa, computeElo) {
        this.id         = id;
        this.io         = io;
        this.maxPlayers = maxPlayers;
        this.tickRate   = tickRate;
        this.tickMs     = Math.floor(1000 / tickRate);
        this.supa       = supa;
        this.computeElo = computeElo;

        this.players    = [];   // [{ socket, slot, pseudo, color, ready, alive }]
        this.phase      = 'lobby'; // lobby | spawn | game | end
        this.state      = null; // GameState instance
        this.tickTimer  = null;
        this.spawnTimer = null;
        this.lastTick   = Date.now();
        this.tick       = 0;
        this.config     = { sunCount: 3, aiCount: 0 };

        console.log(`[room] créée : ${id}`);
    }

    // ── Nombre de joueurs connectés ──
    get playerCount() { return this.players.length; }
    get isFull()      { return this.players.length >= this.maxPlayers; }
    get isEmpty()     { return this.players.length === 0; }

    // ── Ajouter un joueur ──
    addPlayer(socket) {
        const slot = this.players.length;
        const p = { socket, slot, pseudo: socket.userName, color: socket.userColor, ready: false, alive: true };
        this.players.push(p);
        socket.join(this.id);
        socket.roomId = this.id;
        socket.slot   = slot;

        // Informer les autres
        this.io.to(this.id).emit('room_state', this._roomState());
        console.log(`[room:${this.id}] +joueur ${socket.userName} (slot ${slot})`);
        return slot;
    }

    // ── Retirer un joueur ──
    removePlayer(socket) {
        const idx = this.players.findIndex(p => p.socket.id === socket.id);
        if (idx < 0) return;
        const p = this.players[idx];
        console.log(`[room:${this.id}] -joueur ${p.pseudo} (slot ${p.slot})`);

        // En jeu → passer en IA passive
        if (this.phase === 'game' && this.state) {
            this.state.setPlayerAI(p.slot);
        }

        this.players.splice(idx, 1);
        socket.leave(this.id);
        socket.roomId = null;

        if (this.isEmpty) {
            this.destroy();
        } else {
            this.io.to(this.id).emit('room_state', this._roomState());
        }
    }

    // ── Marquer prêt ──
    setReady(socket, ready) {
        const p = this.players.find(p => p.socket.id === socket.id);
        if (p) p.ready = ready;
        this.io.to(this.id).emit('room_state', this._roomState());
        // Si tous prêts → démarrer
        if (this.players.length >= 1 && this.players.every(p => p.ready)) {
            this._startSpawn();
        }
    }

    // ── Phase spawn ──
    _startSpawn() {
        if (this.phase !== 'lobby') return;
        this.phase = 'spawn';

        // Créer l'état de jeu avec les joueurs actuels
        const playerDefs = this.players.map(p => ({
            slot: p.slot, pseudo: p.pseudo, color: p.color, isHuman: true
        }));
        this.state = new GameState(playerDefs, this.config);
        this.state.generateUniverse();

        // Envoyer l'univers complet à tous
        this.io.to(this.id).emit('game_start', {
            phase:   'spawn',
            seed:    this.state.seed,
            config:  this.config,
            players: playerDefs,
            universe: this.state.serializeUniverse()
        });

        // Timeout spawn : 30s puis auto-spawn
        this.spawnTimer = setTimeout(() => this._finishSpawn(), 30000);
        console.log(`[room:${this.id}] phase spawn démarrée`);
    }

    // ── Fin spawn → début partie ──
    _finishSpawn() {
        clearTimeout(this.spawnTimer);
        this.state.autoSpawnRemaining();
        this.phase = 'game';
        this.io.to(this.id).emit('game_phase', { phase: 'game' });
        this._startGameLoop();
        console.log(`[room:${this.id}] partie démarrée (${this.playerCount} joueurs)`);
    }

    // ── Boucle de jeu ──
    _startGameLoop() {
        this.lastTick = Date.now();
        this.tickTimer = setInterval(() => {
            const now = Date.now();
            const dt  = Math.min((now - this.lastTick) / 1000, 0.1); // cap 100ms
            this.lastTick = now;
            this.tick++;

            // Update
            this.state.update(dt);

            // Snapshot delta → tous les joueurs
            const snap = this.state.buildSnapshot(this.tick);
            this.io.to(this.id).emit('game_snapshot', snap);

            // Vérifier victoire toutes les 60 ticks (~3s)
            if (this.tick % 60 === 0) {
                const winner = this.state.checkVictory();
                if (winner !== null) this._endGame(winner);
            }
        }, this.tickMs);
    }
// ── Fin de partie ──
    async _endGame(winnerSlot) {
        this.phase = 'end';
        clearInterval(this.tickTimer);
        const winner = this.players.find(p => p.slot === winnerSlot);
        const stats = this.state.getStats();

        // ── Calcul ELO ──
        let eloResults = [];
        if (this.supa && this.computeElo) {
            try {
                // Récupérer les ELO actuels depuis Supabase
                const humanPlayers = this.players.filter(p => p.socket.userId);
                const userIds = humanPlayers.map(p => p.socket.userId);
                const { data: profiles } = await this.supa
                    .from('profiles').select('id, elo').in('id', userIds);

                if (profiles && humanPlayers.length >= 2) {
                    // Rang : winnerSlot = rank 1, les autres classés par nb d'astres
                    const ranked = [...humanPlayers].sort((a, b) => {
                        if (a.slot === winnerSlot) return -1;
                        if (b.slot === winnerSlot) return 1;
                        const ba = stats.players.find(p => p.slot === a.slot)?.bodies || 0;
                        const bb = stats.players.find(p => p.slot === b.slot)?.bodies || 0;
                        return bb - ba;
                    });

                    const eloInput = ranked.map((p, i) => {
                        const profile = profiles.find(pr => pr.id === p.socket.userId);
                        return { userId: p.socket.userId, elo: profile?.elo || 1000, rank: i + 1 };
                    });

                    eloResults = this.computeElo(eloInput);

                    // Écrire les nouveaux ELO dans Supabase
                    for (const r of eloResults) {
                        await this.supa.from('profiles')
                            .update({ elo: r.newElo })
                            .eq('id', r.userId);
                    }
                    console.log(`[room:${this.id}] ELO mis à jour :`, eloResults.map(r => `${r.userId} ${r.delta > 0 ? '+' : ''}${r.delta}`).join(', '));
                }
            } catch(e) {
                console.error(`[room:${this.id}] Erreur calcul ELO:`, e.message);
            }
        }

        this.io.to(this.id).emit('game_end', {
            winnerSlot,
            winnerName: winner?.pseudo || 'Inconnu',
            stats,
            eloResults: eloResults.map(r => ({ userId: r.userId, delta: r.delta, newElo: r.newElo }))
        });
        console.log(`[room:${this.id}] fin de partie — gagnant : ${winner?.pseudo}`);
        setTimeout(() => this.destroy(), 60000);
    }

    // ── Action joueur ──
    handleAction(socket, data) {
        if (this.phase === 'spawn' && data?.type === 'choose_spawn') {
            const ok = this.state.chooseSpawn(socket.slot, data.bodyName);
            if (ok) {
                socket.emit('spawn_ok', { bodyName: data.bodyName });
                // Si tous ont spawné → lancer la partie
                if (this.state.allPlayersSpawned()) this._finishSpawn();
            }
            return;
        }
        if (this.phase !== 'game') return;
        const events = applyAction(this.state, socket.slot, data);
        // Diffuser les events produits (conquête, construction, etc.)
        if (events?.length) {
            this.io.to(this.id).emit('game_events', events);
        }
    }

    // ── Détruire la room ──
    destroy() {
        clearInterval(this.tickTimer);
        clearTimeout(this.spawnTimer);
        this.state = null;
        console.log(`[room:${this.id}] détruite`);
    }

    // ── Sérialiser l'état du lobby ──
    _roomState() {
        return {
            roomId:  this.id,
            phase:   this.phase,
            players: this.players.map(p => ({
                slot:   p.slot,
                pseudo: p.pseudo,
                color:  p.color,
                ready:  p.ready,
                alive:  p.alive
            }))
        };
    }

    // ── Pour le lobby public ──
    publicInfo() {
        return {
            roomId:      this.id,
            playerCount: this.playerCount,
            maxPlayers:  this.maxPlayers,
            phase:       this.phase
        };
    }
}

// ═══════════════════════════════════════════════════════════════
// ROOM MANAGER
// ═══════════════════════════════════════════════════════════════
class RoomManager {
    constructor(io, maxPlayers, tickRate, supa, computeElo) {
        this.io         = io;
        this.maxPlayers = maxPlayers;
        this.tickRate   = tickRate;
        this.supa       = supa;
        this.computeElo = computeElo;
        this.rooms      = new Map(); // roomId → Room
    }

    // ── Rejoindre ou créer une room ──
    join(socket, data) {
        if (socket.roomId) this.leave(socket); // quitter l'ancienne

        let room;
        if (data?.roomId && this.rooms.has(data.roomId)) {
            room = this.rooms.get(data.roomId);
            if (room.isFull)    return { error: 'Room pleine' };
            if (room.phase !== 'lobby') return { error: 'Partie déjà commencée' };
        } else {
            // Créer une nouvelle room
            const roomId = 'room-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
           room = new Room(roomId, this.io, this.maxPlayers, this.tickRate, this.supa, this.computeElo);
            if (data?.config) room.config = { ...room.config, ...data.config };
            this.rooms.set(roomId, room);
        }

        const slot = room.addPlayer(socket);
        return { roomId: room.id, slot };
    }

    // ── Quitter ──
    leave(socket) {
        if (!socket.roomId) return;
        const room = this.rooms.get(socket.roomId);
        if (!room) return;
        room.removePlayer(socket);
        if (room.isEmpty) this.rooms.delete(room.id);
    }

    // ── Action ──
    handleAction(socket, data) {
        const room = this.getRoomOf(socket);
        if (room) room.handleAction(socket, data);
    }

    // ── Prêt ──
    setReady(socket, ready) {
        const room = this.getRoomOf(socket);
        if (room) room.setReady(socket, ready);
    }

    // ── Room d'un socket ──
    getRoomOf(socket) {
        return socket.roomId ? this.rooms.get(socket.roomId) : null;
    }

// ── Vote bots ──
    voteBots(socket) {
        const room = this.getRoomOf(socket);
        if (room) room.addBotVote(socket);
    }

    // ── Liste publique ──
    getPublicList() {
        return Array.from(this.rooms.values())
            .filter(r => r.phase === 'lobby' && !r.isFull)
            .map(r => r.publicInfo());
    }
}

module.exports = RoomManager;
