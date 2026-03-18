// ═══════════════════════════════════════════════════════════════
// ACTIONS — Validation et application des inputs joueur
// Appelé par roomManager.handleAction()
// ═══════════════════════════════════════════════════════════════

/**
 * Applique une action d'un joueur sur l'état du jeu.
 * Retourne un tableau d'événements à diffuser (peut être vide).
 *
 * data.type :
 *   'jet'            — lancer un jet de spores (nom client)
 *   'launch_jet'     — alias legacy
 *   'set_build_mode' — démarrer une construction
 *   'cancel_build'   — annuler construction en cours
 *   'multi'          — choisir une stat de prolifération
 */
function applyAction(state, slot, data) {
    if (!data || !data.type) return [];
    switch (data.type) {
        case 'jet':           // nom envoyé par le client
        case 'launch_jet':    // alias legacy
            return actionLaunchJet(state, slot, data);
        case 'set_build_mode':
            return actionSetBuildMode(state, slot, data);
        case 'cancel_build':
            return actionCancelBuild(state, slot, data);
case 'multi':
            return actionMulti(state, slot, data);
        case 'set_sacrifice':
            return actionSetSacrifice(state, slot, data);
        default:
            return [];
    }
}

// ── Lancer un jet ──
// data : { srcName, dirX, dirY, sporeType }
function actionLaunchJet(state, slot, data) {
    const sourceName = data.srcName || data.sourceName;
    const dirX = data.dirX, dirY = data.dirY;
    const sporeType = data.sporeType || 'normal';

    if (!sourceName) return [];

    // Validation NaN/Infinity
    if (!isFinite(dirX) || !isFinite(dirY)) return [];

    // Normaliser direction
    const mag = Math.sqrt(dirX ** 2 + dirY ** 2);
    if (mag < 0.01) return [];
    const nx = dirX / mag, ny = dirY / mag;

    const ok = state.launchJet(slot, nx, ny, sporeType, sourceName);
    if (!ok) return [];
    return [{ type: 'jet_launched', slot, sourceName, sporeType }];
}

// ── Démarrer une construction ──
// data : { bodyName, buildType }
function actionSetBuildMode(state, slot, data) {
    const { bodyName, buildType } = data;
    if (!bodyName || !buildType) return [];
    const body = state.allBodies.find(b => b.name === bodyName);
    if (!body || body.owner !== slot) return [];
    if (body.buildMode !== 'off') return [];
    const VALID = ['nid', 'biome', 'alveole', 'parasite'];
    if (!VALID.includes(buildType)) return [];
    const base = body.baseMaxSpores || body.maxSpores;
    const costs = { alveole: 0.35, nid: 0.4, biome: 0.5, parasite: 0 };
    const minCost = Math.floor(base * (costs[buildType] || 0));
    if (buildType !== 'parasite' && (body.spores || 0) < minCost * 0.8) return [];
    body.buildMode = buildType;
    body.buildProgress = 0;
    return [{ type: 'build_started', slot, bodyName, buildType }];
}

// ── Annuler construction ──
// data : { bodyName }
function actionCancelBuild(state, slot, data) {
    const { bodyName } = data;
    if (!bodyName) return [];
    const body = state.allBodies.find(b => b.name === bodyName);
    if (!body || body.owner !== slot) return [];
    if (body.buildMode === 'off') return [];
    body.buildMode = 'off';
    body.buildProgress = 0;
    return [{ type: 'build_cancelled', slot, bodyName }];
}

// ── Choix stat prolifération ──
// data : { stat } — 'growth' | 'velocity' | 'density'
function actionMulti(state, slot, data) {
    const VALID_STATS = ['growth', 'velocity', 'density'];
    const { stat } = data;
    if (!VALID_STATS.includes(stat)) return [];
    const player = state.players[slot];
    if (!player) return [];
    if (!player._multiPending) return []; // pas en attente de choix
    player._multiPending = false;
    player.stats[stat] = Math.min(5, (player.stats[stat] || 0) + 1); // cap à 5
    return [{ type: 'multi_applied', slot, stat }];
}

// ── Régler le sacrifice multiplicité ──
// data : { value } — 0 à 50
function actionSetSacrifice(state, slot, data) {
    const value = parseInt(data.value);
    if (!isFinite(value)) return [];
    const player = state.players[slot];
    if (!player) return [];
    player.multiSacrifice = Math.max(0, Math.min(50, value)); // cap 0-50%
    return [];
}

module.exports = { applyAction };
