/**
 * NEBULA CONQUEST — Stress Test Serveur Railway
 * 
 * Simule N joueurs connectés simultanément sur une room.
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

const NB_JOUEURS  = parseInt(process.argv[2]) || 10;
const SERVER_URL  = process.argv[3] || 'https://nebula-conquest-server-production.up.railway.app';
const ROOM_ID     = 'stress-test-room-' + Date.now();
const ACTION_INTERVAL_MS = 500; // ms entre chaque action simulée par joueur

// ── Métriques ──────────────────────────────────────────
const metrics = {
    connected:    0,
    disconnected: 0,
    snapshots:    0,
    errors:       0,
    latencies:    [],
    startTime:    Date.now(),
};

function printMetrics() {
    const elapsed = ((Date.now() - metrics.startTime) / 1000).toFixed(1);
    const avgLat  = metrics.latencies.length
        ? (metrics.latencies.reduce((a,b)=>a+b,0) / metrics.latencies.length).toFixed(1)
        : '—';
    const maxLat  = metrics.latencies.length ? Math.max(...metrics.latencies) : '—';
    console.log(`\n[${elapsed}s] Connectés: ${metrics.connected}/${NB_JOUEURS} | Snapshots reçus: ${metrics.snapshots} | Latence moy: ${avgLat}ms max: ${maxLat}ms | Erreurs: ${metrics.errors} | Déco: ${metrics.disconnected}`);
}

// ── Créer un joueur simulé ──────────────────────────────
function createPlayer(slotIndex) {
    const playerId = 'stress-player-' + slotIndex + '-' + Math.random().toString(36).slice(2,6);

    const socket = io(SERVER_URL, {
        transports: ['websocket'],
        reconnection: false,
        timeout: 10000,
    });

    let actionTimer = null;
    let pingTime = null;

    socket.on('connect', () => {
        metrics.connected++;
        // Rejoindre la room de test
        socket.emit('join_room', {
            roomId: ROOM_ID,
            playerId,
            pseudo: 'Bot-' + slotIndex,
            slot: slotIndex,
        });

        // Envoyer des actions aléatoires périodiquement
        actionTimer = setInterval(() => {
            const actions = ['jet', 'spawn', 'build'];
            const type = actions[Math.floor(Math.random() * actions.length)];
            pingTime = Date.now();
            socket.emit('player_action', {
                type,
                srcName: 'Planet-' + Math.floor(Math.random() * 10),
                dirX: Math.random() * 2 - 1,
                dirY: Math.random() * 2 - 1,
                sporeType: 'normal',
            });
        }, ACTION_INTERVAL_MS + Math.random() * 200); // léger décalage pour éviter les bursts
    });

    socket.on('game_snapshot', (snap) => {
        metrics.snapshots++;
        if (pingTime) {
            metrics.latencies.push(Date.now() - pingTime);
            if (metrics.latencies.length > 1000) metrics.latencies.shift(); // fenêtre glissante
            pingTime = null;
        }
    });

    socket.on('game_events', (events) => {
        // Juste compter, pas de traitement
    });

    socket.on('error', (err) => {
        metrics.errors++;
        console.error(`[Bot-${slotIndex}] Erreur socket:`, err?.msg || err);
    });

    socket.on('connect_error', (err) => {
        metrics.errors++;
        console.error(`[Bot-${slotIndex}] Erreur connexion:`, err.message);
    });

    socket.on('disconnect', (reason) => {
        metrics.disconnected++;
        if (actionTimer) clearInterval(actionTimer);
        console.warn(`[Bot-${slotIndex}] Déconnecté: ${reason}`);
    });

    return socket;
}

// ── Lancement ──────────────────────────────────────────
console.log(`\n🚀 NEBULA CONQUEST — Stress Test`);
console.log(`   Serveur  : ${SERVER_URL}`);
console.log(`   Room     : ${ROOM_ID}`);
console.log(`   Joueurs  : ${NB_JOUEURS}`);
console.log(`   Actions  : toutes les ~${ACTION_INTERVAL_MS}ms par joueur\n`);

const sockets = [];

// Connexions progressives (1 toutes les 100ms) pour éviter de flood le serveur d'un coup
for (let i = 0; i < NB_JOUEURS; i++) {
    setTimeout(() => {
        sockets.push(createPlayer(i));
    }, i * 100);
}

// Afficher les métriques toutes les 3 secondes
const metricsTimer = setInterval(printMetrics, 3000);

// Arrêt propre après 60 secondes
setTimeout(() => {
    console.log('\n\n══════════════════════════════════');
    console.log('   RÉSULTATS FINAUX');
    console.log('══════════════════════════════════');
    printMetrics();

    const avgLat = metrics.latencies.length
        ? (metrics.latencies.reduce((a,b)=>a+b,0) / metrics.latencies.length).toFixed(1)
        : 'N/A';

    console.log('\n   Verdict :');
    if (metrics.errors === 0 && metrics.disconnected === 0) {
        console.log('   ✅ Aucune erreur — serveur stable');
    } else if (metrics.errors < 5 && metrics.disconnected < 3) {
        console.log('   ⚠️  Quelques erreurs mineures — surveiller en production');
    } else {
        console.log('   ❌ Trop d\'erreurs — le serveur nécessite des optimisations');
    }

    if (parseFloat(avgLat) < 100) {
        console.log('   ✅ Latence excellente (' + avgLat + 'ms)');
    } else if (parseFloat(avgLat) < 300) {
        console.log('   ⚠️  Latence acceptable (' + avgLat + 'ms)');
    } else {
        console.log('   ❌ Latence trop élevée (' + avgLat + 'ms)');
    }

    console.log('══════════════════════════════════\n');

    clearInterval(metricsTimer);
    sockets.forEach(s => s.disconnect());
    process.exit(0);
}, 60000);

// Ctrl+C propre
process.on('SIGINT', () => {
    console.log('\n\nInterrompu par l\'utilisateur.');
    printMetrics();
    clearInterval(metricsTimer);
    sockets.forEach(s => s.disconnect());
    process.exit(0);
});
