// ═══════════════════════════════════════════════════════════════
// ACTIONS — Validation et application des inputs joueur
// Appelé par roomManager.handleAction()
// ═══════════════════════════════════════════════════════════════

/**
 * Applique une action d'un joueur sur l'état du jeu.
 * Retourne un tableau d'événements à diffuser (peut être vide).
 *
 * data.type :
 *   'launch_jet'     — lancer un jet de spores
 *   'set_build_mode' — démarrer une construction
 *   'cancel_build'   — annuler construction en cours
 */
function applyAction(state, slot, data) {
    if (!data || !data.type) return [];

    switch (data.type) {

        case 'launch_jet':
            return actionLaunchJet(state, slot, data);

        case 'set_build_mode':
            return actionSetBuildMode(state, slot, data);

        case 'cancel_build':
            return actionCancelBuild(state, slot, data);

        default:
            return [];
    }
}

// ── Lancer un jet ──
// data : { sourceName, dirX, dirY, sporeType }
function actionLaunchJet(state, slot, data) {
    const { sourceName, dirX, dirY, sporeType = 'normal' } = data;
    if (!sourceName) return [];

    // Normaliser direction
    const mag = Math.sqrt((dirX||0)**2 + (dirY||0)**2);
    if (mag < 0.01) return [];
    const nx = dirX / mag, ny = dirY / mag;

    const ok = state.launchJet(slot, nx, ny, sporeType, sourceName);
    if (!ok) return [];
    return [{ type: 'jet_launched', slot, sourceName, sporeType }];
}

// ── Démarrer une construction ──
// data : { bodyName, buildType }
// buildType : 'nid' | 'biome' | 'alveole' | 'parasite'
function actionSetBuildMode(state, slot, data) {
    const { bodyName, buildType } = data;
    if (!bodyName || !buildType) return [];

    const body = state.allBodies.find(b => b.name === bodyName);
    if (!body || body.owner !== slot) return [];
    if (body.buildMode !== 'off') return []; // déjà en construction

    const VALID = ['nid', 'biome', 'alveole', 'parasite'];
    if (!VALID.includes(buildType)) return [];

    // Vérifier le coût minimal avant de lancer
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

module.exports = { applyAction };
