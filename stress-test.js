/**
 * NEBULA CONQUEST — Stress Test Serveur Railway v2
 *
 * Simule N joueurs qui créent une room, se marquent prêts,
 * choisissent un spawn, jouent 60s et mesurent les snapshots.
 *
 * Usage :
 *   node stress-test.js [nb_joueurs] [url_serveur]
 *
 * Exemples :
 *   node stress-test.js 10
 *   node stress-test.js 50 https://nebula-conquest-server-production.up.railway.app
 *
 * Dépendances :
 *   npm install socket.io-client
 */

const { io } = require('socket.io-client');

const NB_JOUEURS = parseInt(process.argv[2]) || 10;
const SERVER_URL = process.argv[3] || 'https://nebula-conquest-server-production.up.railway.app';

// Noms de planètes fictifs pour le spawn
const SPAWN_NAMES = ['Alpha','Beta','Gamma','Delta','Epsilon','Zeta','Eta','Theta',
                     'Iota','Kappa','Lambda','Mu','Nu','Xi','Omicron','Pi'];

// ── Métriques ──────────────────────────────────────────────────
const metrics = {
    connected: 0, disconnected: 0, errors: 0,
    snapshots: 0, latencies: [], events: 0,
    roomJoined: 0, spawnOk: 0, gameStarted: false,
    startTime: Date.now(),
};

function printMetrics() {
    const elapsed = ((Date.now() - metrics.startTime) / 1000).toFixed(1);
    const avgLat  = metrics.latencies.length
        ? (metrics.latencies.reduce((a,b)=>a+b,0) / metrics.latencies.length).toFixed(1) : '—';
    const maxLat  = metrics.latencies.length ? Math.max(...metrics.latencies) : '—';
    console.log(
        `[${elapsed}s] Connectés:${metrics.connected}/${NB_JOUEURS}` +
        ` | Room:${metrics.roomJoined} | Spawn:${metrics.spawnOk}` +
        ` | Snapshots:${metrics.snapshots} | Lat moy:${avgLat}ms max:${maxLat}ms` +
        ` | Erreurs:${metrics.errors} | Déco:${metrics.disconnected}`
    );
}

// ── Créer un bot ───────────────────────────────────────────────
function createBot(index, roomIdRef) {
    const colors = ['#C084FC','#60A5FA','#34D399','#F97316','#F43F5E','#FACC15'];
    const socket = io(SERVER_URL, {
        transports: ['websocket'],
        reconnection: false,
        timeout: 10000,
        auth: {
            pseudo: `Bot-${index}`,
            color: colors[index % colors.length],
        }
    });

    let pingTime = null;
    let actionTimer = null;

    socket.on('connect', () => {
        metrics.connected++;

        // Bot 0 crée la room, les autres rejoignent la même
        setTimeout(() => {
            socket.emit('join_room', {
                roomId: roomIdRef.id || undefined,
                config: { sunCount: 3, aiCount: 0 }
            });
        }, index * 150); // échelonner les connexions
    });

    socket.on('room_joined', (data) => {
        metrics.roomJoined++;
        // Bot 0 stocke le roomId pour les autres
        if (index === 0) {
            roomIdRef.id = data.roomId;
            console.log(`[Bot-0] Room créée : ${data.roomId}`);
        }
        // Se marquer prêt après un court délai
        setTimeout(() => socket.emit('player_ready', { ready: true }), 500);
    });

    socket.on('game_start', (data) => {
        metrics.gameStarted = true;
        // Choisir un spawn parmi l'univers reçu
        const bodies = extractBodies(data.universe);
        const mySpawn = bodies[index % bodies.length] || SPAWN_NAMES[index % SPAWN_NAMES.length];
        setTimeout(() => {
            socket.emit('player_action', { type: 'choose_spawn', bodyName: mySpawn });
        }, 300 + Math.random() * 500);
    });

    socket.on('spawn_ok', () => {
        metrics.spawnOk++;
    });

    socket.on('game_phase', (data) => {
        if (data.phase === 'game') {
            // Lancer les actions aléatoires
            actionTimer = setInterval(() => {
                pingTime = Date.now();
                socket.emit('player_action', {
                    type: 'jet',
                    srcName: SPAWN_NAMES[Math.floor(Math.random() * SPAWN_NAMES.length)],
                    dirX: Math.random() * 2 - 1,
                    dirY: Math.random() * 2 - 1,
                    sporeType: 'normal',
                });
            }, 600 + Math.random() * 400);
        }
    });

    socket.on('game_snapshot', () => {
        metrics.snapshots++;
        if (pingTime) {
            metrics.latencies.push(Date.now() - pingTime);
            if (metrics.latencies.length > 2000) metrics.latencies.shift();
            pingTime = null;
        }
    });

    socket.on('game_events', () => { metrics.events++; });

    socket.on('error', (err) => {
        metrics.errors++;
        console.error(`[Bot-${index}] Erreur:`, err?.msg || err);
    });

    socket.on('connect_error', (err) => {
        metrics.errors++;
        console.error(`[Bot-${index}] Erreur connexion:`, err.message);
    });

    socket.on('disconnect', (reason) => {
        metrics.disconnected++;
        if (actionTimer) clearInterval(actionTimer);
        if (reason !== 'io client disconnect')
            console.warn(`[Bot-${index}] Déconnecté: ${reason}`);
    });

    return socket;
}

// Extraire les noms de corps célestes depuis l'univers sérialisé
function extractBodies(universe) {
    if (!universe) return SPAWN_NAMES;
    try {
        const names = [];
        (universe.suns || []).forEach(sun => {
            (sun.planets || []).forEach(p => names.push(p.name));
        });
        return names.length ? names : SPAWN_NAMES;
    } catch(e) { return SPAWN_NAMES; }
}

// ── Lancement ──────────────────────────────────────────────────
console.log(`\n🚀 NEBULA CONQUEST — Stress Test v2`);
console.log(`   Serveur  : ${SERVER_URL}`);
console.log(`   Joueurs  : ${NB_JOUEURS}`);
console.log(`   Flow     : connect → join_room → ready → spawn → game → actions\n`);

const roomIdRef = { id: null };
const sockets = [];

// Bot 0 en premier, puis les autres avec délai
sockets.push(createBot(0, roomIdRef));
for (let i = 1; i < NB_JOUEURS; i++) {
    setTimeout(() => sockets.push(createBot(i, roomIdRef)), i * 200);
}

const metricsTimer = setInterval(printMetrics, 3000);

// Arrêt après 90 secondes
setTimeout(() => {
    console.log('\n\n══════════════════════════════════');
    console.log('   RÉSULTATS FINAUX');
    console.log('══════════════════════════════════');
    printMetrics();

    const avgLat = metrics.latencies.length
        ? (metrics.latencies.reduce((a,b)=>a+b,0) / metrics.latencies.length).toFixed(1) : null;

    console.log('\n   Bilan :');
    console.log(`   Partie lancée        : ${metrics.gameStarted ? '✅' : '❌'}`);
    console.log(`   Spawns réussis       : ${metrics.spawnOk}/${NB_JOUEURS}`);
    console.log(`   Snapshots reçus      : ${metrics.snapshots}`);
    console.log(`   Events reçus         : ${metrics.events}`);
    console.log(`   Déconnexions inopinées: ${metrics.disconnected}`);
    console.log(`   Erreurs              : ${metrics.errors}`);

    console.log('\n   Verdict :');
    if (!metrics.gameStarted) {
        console.log('   ❌ La partie n\'a pas démarré — vérifier le flow lobby/spawn');
    } else if (metrics.errors === 0 && metrics.disconnected === 0) {
        console.log('   ✅ Serveur stable — aucune erreur');
    } else if (metrics.errors < 5) {
        console.log('   ⚠️  Quelques erreurs mineures');
    } else {
        console.log('   ❌ Trop d\'erreurs — optimisations nécessaires (S4)');
    }

    if (avgLat === null) {
        console.log('   ⚠️  Latence non mesurable (snapshots non reçus)');
    } else if (parseFloat(avgLat) < 100) {
        console.log(`   ✅ Latence excellente (${avgLat}ms)`);
    } else if (parseFloat(avgLat) < 300) {
        console.log(`   ⚠️  Latence acceptable (${avgLat}ms)`);
    } else {
        console.log(`   ❌ Latence trop élevée (${avgLat}ms)`);
    }
    console.log('══════════════════════════════════\n');

    clearInterval(metricsTimer);
    sockets.forEach(s => s.disconnect());
    process.exit(0);
}, 90000);

process.on('SIGINT', () => {
    console.log('\nInterrompu.');
    printMetrics();
    clearInterval(metricsTimer);
    sockets.forEach(s => s.disconnect());
    process.exit(0);
});
