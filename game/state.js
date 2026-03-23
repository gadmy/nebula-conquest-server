// ═══════════════════════════════════════════════════════════════
// GAME STATE — Logique autoritaire côté serveur
// Portage de la logique du client nebula-conquest_v4.html
// ═══════════════════════════════════════════════════════════════

// ── PRNG déterministe (identique au client) ──
const MAP_LIBRARY = require('./maps');

function mulberry32(a) {
    return function() {
        a |= 0; a = a + 0x6D2B79F5 | 0;
        var t = Math.imul(a ^ a >>> 15, 1 | a);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}

class GameState {
    constructor(playerDefs, config) {
        this.seed        = Math.floor(Math.random() * 2147483647);
        this.config      = config || { sunCount: 3, aiCount: 0 };
        this.playerDefs  = playerDefs;
        this.time        = 0;
        this.tick        = 0;

        // Corps célestes
        this.suns        = [];
        this.planets     = [];
        this.moons       = [];
        this.allBodies   = [];
        this.asteroidBelts = [];
        this.blackHole   = null;

        // Entités dynamiques
        this.jets        = [];
        this.particles   = [];

        // Joueurs
        this.players     = [];

        // Snapshots delta
        this._lastSnapshot = {};

        // Événements accumulés entre deux ticks
        this._events     = [];

        this._initPlayers();
    }

    // ── Init joueurs ──
    _initPlayers() {
        this.players = this.playerDefs.map(p => ({
            id:          p.slot,
            slot:        p.slot,
            name:        p.pseudo,
            color:       p.color,
            isHuman:     p.isHuman,
            isAI:        !p.isHuman,
spawnPlanet: null,
            bodies:      [],
            totalSpores: 0,
            stats: { growth: 0, velocity: 0, density: 0 },
            tech:  {},
_stats: { bodiesConquered: 0, jetsLaunched: 0, jetsNeutralized: 0, sporesProduced: 0 },
            multiTier: 0,
            multiProgress: 0,
            multiSacrifice: 0,
            _multiPending: false
        }));
    }

    // ── Génération univers (portage de generateUniverse()) ──
generateUniverse() {
        // Utiliser la vraie MAP_LIBRARY comme le client
        const mapIdx = (this.config.mapIndex != null)
            ? this.config.mapIndex
            : Math.floor(Math.random() * MAP_LIBRARY.length);
        const mapData = MAP_LIBRARY[mapIdx];
        this.config.mapIndex = mapIdx;
        this.config.mapName  = mapData.name;
        console.log(`[state] carte sélectionnée : ${mapData.name} (idx ${mapIdx})`);
        this.loadUniverse(mapData);
    }

    _generateUniverseLegacy() {
        const rng = mulberry32(this.seed);
        const cfg = this.config;
        this.blackHole = { x: 0, y: 0, radius: 300, dangerZone: 300,
                           gravityRange: 1500, gravityStrength: 1260 };

        const sunCount = cfg.sunCount || 3;
        const sunColors  = ['#FFE44D','#FF8C42','#4DC8FF','#FF4D7A','#A8FF4D','#C8A0FF'];
        const sunOrbitR  = [600, 1000, 1400, 1800, 2200, 2600];

        let bodyId = 0;
        for (let si = 0; si < sunCount; si++) {
            const angle   = (si / sunCount) * Math.PI * 2 + rng() * 0.3;
            const orbitR  = sunOrbitR[si % sunOrbitR.length] + rng() * 100;
            const radius  = 40 + Math.floor(rng() * 30);
            const speed   = 0.008 + rng() * 0.004;
            const sun = {
                _id: bodyId++, type: 'sun',
                name: 'Sol-' + (si+1),
                x: Math.cos(angle) * orbitR,
                y: Math.sin(angle) * orbitR,
                angle, orbitRadius: orbitR, orbitSpeed: speed,
                radius, color: sunColors[si % sunColors.length],
                planets: [], parent: null,
                owner: null, spores: 0, maxSpores: 0
            };
            this.suns.push(sun);

            // Planètes
            const pCount = 2 + Math.floor(rng() * 3);
            for (let pi = 0; pi < pCount; pi++) {
                const pAngle  = rng() * Math.PI * 2;
                const pOrbitR = 80 + pi * 60 + rng() * 40;
                const pRadius = 20 + Math.floor(rng() * 30);
                const pSpeed  = 0.02 + rng() * 0.03;
                const planet = {
                    _id: bodyId++, type: 'planet',
                    name: sun.name + '-P' + (pi+1),
                    x: sun.x + Math.cos(pAngle) * pOrbitR,
                    y: sun.y + Math.sin(pAngle) * pOrbitR,
                    angle: pAngle, orbitRadius: pOrbitR, orbitSpeed: pSpeed,
                    radius: pRadius,
                    flore: Math.floor(rng() * 101),
                    faune: Math.floor(rng() * 101),
                    _baseFaune: 0,
                    symbiosis: 0, symOwnerTime: 0,
                    buildMode: 'off', buildProgress: 0,
                    nids: 0, biomes: 0, alveoles: 0,
                    parasiteSpore: 0, parasiteProgress: 0,
                    parasite: null, droneCount: 0,
                    owner: null, spores: 0,
                    maxSpores: pRadius * 50,
                    baseMaxSpores: pRadius * 50,
                    parent: sun, moons: []
                };
                planet._baseFaune = planet.faune;
                sun.planets.push(planet);
                this.planets.push(planet);

                // Lunes
                const mCount = rng() < 0.5 ? 1 : (rng() < 0.5 ? 0 : 2);
                for (let mi = 0; mi < mCount; mi++) {
                    const mAngle  = rng() * Math.PI * 2;
                    const mOrbitR = pRadius * 2 + 20 + mi * 25 + rng() * 15;
                    const mRadius = 8 + Math.floor(rng() * 15);
                    const mSpeed  = 0.05 + rng() * 0.08;
                    const moon = {
                        _id: bodyId++, type: 'moon',
                        name: planet.name + '-L' + (mi+1),
                        x: planet.x + Math.cos(mAngle) * mOrbitR,
                        y: planet.y + Math.sin(mAngle) * mOrbitR,
                        angle: mAngle, orbitRadius: mOrbitR, orbitSpeed: mSpeed,
                        radius: mRadius,
                        flore: Math.floor(rng() * 51),
                        faune: Math.floor(rng() * 61),
                        _baseFaune: 0,
                        symbiosis: 0, symOwnerTime: 0,
                        buildMode: 'off', buildProgress: 0,
                        nids: 0, biomes: 0, alveoles: 0,
                        parasiteSpore: 0, parasiteProgress: 0,
                        parasite: null, droneCount: 0,
                        owner: null, spores: 0,
                        maxSpores: mRadius * 50,
                        baseMaxSpores: mRadius * 50,
                        parent: planet, moons: []
                    };
                    moon._baseFaune = moon.faune;
                    planet.moons.push(moon);
                    this.moons.push(moon);
                }
            }
        }

        this.allBodies = [...this.planets, ...this.moons];
        console.log(`[state] univers généré : ${this.suns.length} soleils, ${this.planets.length} planètes, ${this.moons.length} lunes`);
    }

// ── Charger un univers sérialisé (envoyé par l'hôte) ──
    loadUniverse(data) {
        this.blackHole = data.blackHole;
        this.suns = [];
        this.planets = [];
        this.moons = [];
        let bodyId = 0;
        for (const sd of data.suns) {
           const sun = { ...sd, _id: bodyId++, type: 'sun', planets: [], parent: null, owner: null, spores: 0, maxSpores: 0, color: sd.color || '#FFE44D' };
            for (const pd of sd.planets) {
                const planet = { ...pd, _id: bodyId++, type: 'planet', parent: sun, moons: [], owner: null, spores: 0, buildMode: 'off', buildProgress: 0, nids: 0, biomes: 0, alveoles: 0 };
                planet.baseMaxSpores = planet.maxSpores;
                for (const md of (pd.moons || [])) {
                    const moon = { ...md, _id: bodyId++, type: 'moon', parent: planet, owner: null, spores: 0, buildMode: 'off', buildProgress: 0, nids: 0, biomes: 0, alveoles: 0 };
                    moon.baseMaxSpores = moon.maxSpores;
                    planet.moons.push(moon);
                    this.moons.push(moon);
                }
                sun.planets.push(planet);
                this.planets.push(planet);
            }
            this.suns.push(sun);
        }
        this.allBodies = [...this.planets, ...this.moons];
        console.log(`[state] univers chargé depuis hôte : ${this.suns.length} soleils, ${this.planets.length} planètes, ${this.moons.length} lunes`);
    }

    // ── Sérialiser l'univers pour le client ──
    serializeUniverse() {
        const serBody = (b) => ({
            _id: b._id, type: b.type, name: b.name,
            x: b.x, y: b.y, angle: b.angle,
            orbitRadius: b.orbitRadius, orbitSpeed: b.orbitSpeed,
            radius: b.radius, flore: b.flore, faune: b.faune,
            maxSpores: b.maxSpores, baseMaxSpores: b.baseMaxSpores,
            parentId: b.parent?._id ?? null
        });
        return {
            seed:    this.seed,
            blackHole: this.blackHole,
        suns: this.suns.map(s => ({
                ...serBody(s),
                color: s.color || '#FFE44D',
                planets: s.planets.map(p => ({
                    ...serBody(p),
                    moons: p.moons.map(m => serBody(m))
                }))
            }))
        };
    }

    // ── Spawn joueur ──
    chooseSpawn(slot, bodyName) {
        const body = this.allBodies.find(b => b.name === bodyName && b.owner === null);
        if (!body) return false;
        const player = this.players[slot];
        if (!player || player.spawnPlanet) return false;
        body.owner = slot;
        body.spores = body.maxSpores * 0.5;
        player.spawnPlanet = body;
        player.bodies = [body];
        this._events.push({ type: 'spawn', slot, bodyName });
        return true;
    }

    // ── Spawn auto pour ceux qui n'ont pas choisi ──
    autoSpawnRemaining() {
        const rng = mulberry32(this.seed + 9999);
        for (const player of this.players) {
            if (player.spawnPlanet) continue;
            const free = this.planets.filter(p => p.owner === null);
            if (!free.length) continue;
            const pick = free[Math.floor(rng() * free.length)];
            pick.owner = player.slot;
            pick.spores = pick.maxSpores * 0.5;
            player.spawnPlanet = pick;
            player.bodies = [pick];
            this._events.push({ type: 'spawn', slot: player.slot, bodyName: pick.name });
        }
    }

    allPlayersSpawned() {
        return this.players.every(p => p.spawnPlanet !== null);
    }

    // ── Passer un joueur en IA ──
    setPlayerAI(slot) {
        const p = this.players[slot];
        if (p) { p.isHuman = false; p.isAI = true; }
    }

    // ═══════════════════════════════════════════════════════════
    // BOUCLE DE JEU (appelée par room.tickTimer)
    // ═══════════════════════════════════════════════════════════
    update(dt) {
        this.time += dt;
        this._updateOrbits(dt);
        this._updateProduction(dt);
        this._updateJets(dt);
        this._checkConquests();
    }

    // ── Orbites ──
    _updateOrbits(dt) {
        for (const sun of this.suns) {
            sun.angle += sun.orbitSpeed * dt;
            sun.x = Math.cos(sun.angle) * sun.orbitRadius;
            sun.y = Math.sin(sun.angle) * sun.orbitRadius;
            for (const planet of sun.planets) {
                planet.angle += planet.orbitSpeed * dt;
                planet.x = sun.x + Math.cos(planet.angle) * planet.orbitRadius;
                planet.y = sun.y + Math.sin(planet.angle) * planet.orbitRadius;
                for (const moon of planet.moons) {
                    moon.angle += moon.orbitSpeed * dt;
                    moon.x = planet.x + Math.cos(moon.angle) * moon.orbitRadius;
                    moon.y = planet.y + Math.sin(moon.angle) * moon.orbitRadius;
                }
            }
        }
    }

    // ── Production de spores (portage du client) ──
    _updateProduction(dt) {
        for (const body of this.allBodies) {
            if (body.owner === null || body.owner === undefined) continue;
            if (body.flore <= 0 && body.type === 'sun') continue;
            const player = this.players[body.owner];
            if (!player) continue;

            body.symOwnerTime = (body.symOwnerTime || 0) + dt;
            const symMax = body.type === 'planet' ? 600 : 300;
            body.symbiosis = Math.min(100, (body.symOwnerTime / symMax) * 100);

            const symBonus = 1 + (body.symbiosis / 100) * (body.type === 'planet' ? 0.20 : 0.10);
            const nidBonus = 1 + (body.nids || 0) * 0.025;
            const alvMax   = Math.floor((body.baseMaxSpores || body.maxSpores) * (1 + (body.alveoles || 0) * 0.05));
            if (body.maxSpores !== alvMax) body.maxSpores = alvMax;

            const rate = (0.4 + (body.flore / 100) * 0.6) * (1 + (player.stats?.growth || 0) * 0.3) * 2.5 * symBonus * nidBonus;

            // Modes de construction
            if (body.buildMode === 'nid' || body.buildMode === 'biome' || body.buildMode === 'alveole') {
                const base  = body.baseMaxSpores || body.maxSpores;
                const pct   = body.buildMode === 'alveole' ? 0.35 : body.buildMode === 'nid' ? 0.4 : 0.5;
                const cost  = Math.floor(base * pct);
                if (body.spores < cost * 0.8 && !(body.buildProgress > 0)) {
                    // pas assez
                } else if (body.spores < 5 && body.buildProgress > 0) {
                    body.buildProgress = 0; body.buildMode = 'off';
                    this._addEvent('build', { bodyName: body.name, msg: 'annulé' });
                } else {
                    const drain = Math.min(cost / 8 * dt, body.spores - 5, cost - (body.buildProgress || 0));
                    if (drain > 0) { body.spores -= drain; body.buildProgress = (body.buildProgress || 0) + drain; }
                    if ((body.buildProgress || 0) >= cost) {
                        const t = body.buildMode;
                        body.buildProgress = 0; body.buildMode = 'off';
                        if (t === 'nid')     { body.nids = (body.nids||0)+1; }
                        else if (t==='alveole') { body.alveoles=(body.alveoles||0)+1; }
                        else                { body.biomes=(body.biomes||0)+1; }
                        this._addEvent('build', { bodyName: body.name, buildType: t, slot: body.owner });
                    }
                }
            } else if (body.buildMode === 'parasite') {
                body.parasiteProgress = (body.parasiteProgress || 0) + dt;
                if (body.parasiteProgress >= 120) {
                    body.parasiteSpore = 1; body.parasiteProgress = 0; body.buildMode = 'off';
                    this._addEvent('build', { bodyName: body.name, buildType: 'parasite', slot: body.owner });
                }
            } else {
                // Production normale
                if (body.spores < body.maxSpores) {
                    body.spores = Math.min(body.maxSpores, (body.spores || 0) + rate * dt);
                }
            }

// Progression Prolifération
            const multiSac = player.multiSacrifice || 0;
            if (multiSac > 0 && (player.multiTier || 0) < 10) {
                const multiRate = rate * multiSac;
                player.multiProgress = (player.multiProgress || 0) + multiRate * dt;
                const tierCost = Math.floor(500 * Math.pow(1.8, player.multiTier || 0));
                if (player.multiProgress >= tierCost) {
                    player.multiProgress -= tierCost;
                    if (player.isHuman) {
                        player._multiPending = true;
                    } else {
                        // IA : boost le stat le plus faible
                        const s = player.stats;
                        const min = Math.min(s.growth, s.velocity, s.density);
                        if (s.growth === min) s.growth = Math.min(5, s.growth + 1);
                        else if (s.density === min) s.density = Math.min(5, s.density + 1);
                        else s.velocity = Math.min(5, s.velocity + 1);
                        player.multiTier++;
                    }
                }
            }
            // totalSpores
            player.totalSpores = (player.totalSpores || 0); // recalc ci-dessous
        }

        // Recalc totalSpores
        for (const p of this.players) {
            p.totalSpores = p.bodies.reduce((s, b) => s + (b.spores || 0), 0);
        }
    }

    // ── Jets (simplifié — positions, collision à la prochaine étape S2) ──
    _updateJets(dt) {
        for (let i = this.jets.length - 1; i >= 0; i--) {
            const jet = this.jets[i];
            if (!jet.alive) { this.jets.splice(i, 1); continue; }
            jet.age = (jet.age || 0) + dt;
            // Avancer vers la cible
            if (jet.target) {
                const tb = jet.target;
                const dx = tb.x - jet.x, dy = tb.y - jet.y;
                const d  = Math.sqrt(dx*dx + dy*dy);
                if (d < tb.radius + 8) {
                    // Arrivée
                    this._jetArrival(jet, tb);
                    this.jets.splice(i, 1);
                } else {
                    jet.x += (dx/d) * jet.speed * dt;
                    jet.y += (dy/d) * jet.speed * dt;
                }
            } else {
                jet.alive = false;
            }
        }
    }

  // ── Arrivée d'un jet sur un corps ──
    _jetArrival(jet, body) {
        const ownerTeam = this.players[jet.owner]?.team ?? jet.owner;
        const bodyOwnerTeam = body.owner !== null && body.owner !== undefined
            ? (this.players[body.owner]?.team ?? body.owner) : null;
        const isTeammate = body.owner !== null && body.owner !== undefined
            && body.owner !== jet.owner && ownerTeam === bodyOwnerTeam;

        if (body.owner === jet.owner || isTeammate) {
            // Renforcement (coéquipier ou soi-même)
            const db = 1 + (this.players[jet.owner]?.stats?.density || 0) * 0.05;
            body.spores = Math.min(body.maxSpores, (body.spores||0) + jet.spores * db);
        } else {
            // Attaque
            const biomeD = 1 + (body.biomes||0) * 0.05;
            const atk = jet.spores / biomeD;
            body.spores = (body.spores||0) - atk;
            if (body.spores < 0) {
                const oldOwner = body.owner;
                body.owner = jet.owner;
                body.spores = Math.abs(body.spores);
                body.nids = 0; body.biomes = 0; body.alveoles = 0;
                body.buildMode = 'off'; body.buildProgress = 0;
                body.symOwnerTime = 0; body.symbiosis = 0;
                body.maxSpores = body.baseMaxSpores || body.maxSpores;
                // Bonus colonie vierge
                if (oldOwner === null) {
                    const bonus = body.type === 'planet' ? 1000 : 500;
                    body.spores = Math.min(body.maxSpores, body.spores + bonus);
                }
                // Mettre à jour les bodies des joueurs
                if (oldOwner !== null) {
                    const op = this.players[oldOwner];
                    if (op) op.bodies = op.bodies.filter(b => b !== body);
                }
                const np = this.players[jet.owner];
                if (np && !np.bodies.includes(body)) np.bodies.push(body);
                const sunRef = body.type === 'planet' ? body.parent : body.parent?.parent;
                if (sunRef) sunRef._sysCache = null;
const np2 = this.players[jet.owner];
                if (np2?._stats) np2._stats.bodiesConquered++;
                this._addEvent('conquest', {
                    bodyName: body.name, oldOwner, newOwner: jet.owner
                });
            }
        }
    }

    _checkConquests() {
        // Les conquêtes sont traitées dans _jetArrival, rien de plus ici
    }

    // ── Lancer un jet ──
    launchJet(slot, dirX, dirY, sporeType, sourceName) {
        const player = this.players[slot];
        if (!player) return false;
        const source = this.allBodies.find(b => b.name === sourceName && b.owner === slot);
        if (!source) return false;

        let spores;
        if (sporeType === 'normal') {
            spores = Math.floor((source.spores || 0) * 0.5);
            if (spores < 5) return false;
            source.spores -= spores;
        } else if (sporeType === 'parasite') {
            if ((source.parasiteSpore||0) < 1) return false;
            source.parasiteSpore = 0;
            spores = 1;
        } else return false;

        // Trouver une cible dans la direction
        const speed  = 200 + (player.stats?.velocity || 0) * 20;
        const target = this._findTarget(source, dirX, dirY);
        if (!target) { source.spores += spores; return false; }

this.jets.push({
            id: Date.now() + Math.random(),
            owner: slot, color: player.color,
            spores, sporeType,
            x: source.x, y: source.y,
            speed, target, source,
            alive: true, age: 0
        });
        if (player._stats) player._stats.jetsLaunched++;
        return true;
    }

    // ── Trouver la cible la plus proche dans une direction ──
    _findTarget(source, dirX, dirY) {
        let best = null, bestScore = -Infinity;
        for (const body of this.allBodies) {
            if (body === source) continue;
            const dx = body.x - source.x, dy = body.y - source.y;
            const d  = Math.sqrt(dx*dx + dy*dy);
            if (d < 10) continue;
            const dot = (dx/d)*dirX + (dy/d)*dirY; // alignement avec direction
            const score = dot - d * 0.0001;
            if (dot > 0.3 && score > bestScore) { bestScore = score; best = body; }
        }
        return best;
    }

    // ── Événements internes ──
    _addEvent(type, data) {
        this._events.push({ type, ...data, t: this.time });
    }

    // ═══════════════════════════════════════════════════════════
    // SNAPSHOT DELTA
    // ═══════════════════════════════════════════════════════════
    buildSnapshot(tick) {
        const bodies = [];
        for (const body of [...this.allBodies, ...this.suns]) {
            const prev = this._lastSnapshot[body._id] || {};
            const delta = {};
            // Champs qui changent fréquemment
            if (Math.abs((body.spores||0) - (prev.spores||0)) > 0.5) delta.spores = Math.floor(body.spores||0);
            if (body.owner !== prev.owner)       delta.owner       = body.owner;
            if (body.buildMode !== prev.buildMode) delta.buildMode = body.buildMode;
            if (Math.abs((body.buildProgress||0) - (prev.buildProgress||0)) > 1) delta.buildProgress = Math.floor(body.buildProgress||0);
            if (body.nids !== prev.nids)         delta.nids        = body.nids;
            if (body.biomes !== prev.biomes)     delta.biomes      = body.biomes;
            if (body.alveoles !== prev.alveoles) delta.alveoles    = body.alveoles;
            if (body.maxSpores !== prev.maxSpores) delta.maxSpores = body.maxSpores;
            // Positions (toutes les 5 ticks pour les corps en orbite)
            if (tick % 5 === 0) {
                delta.x = Math.round(body.x);
                delta.y = Math.round(body.y);
                delta.angle = body.angle;
            }
            if (Object.keys(delta).length > 0) {
                bodies.push({ _id: body._id, ...delta });
                this._lastSnapshot[body._id] = { ...this._lastSnapshot[body._id], ...delta };
            }
        }

        // Jets (toujours envoyés)
        const jets = this.jets.map(j => ({
            id: j.id, owner: j.owner, color: j.color,
            x: Math.round(j.x), y: Math.round(j.y),
            spores: Math.floor(j.spores), alive: j.alive,
            targetId: j.target?._id
        }));

// Données joueurs (multiPending, stats)
        const players = this.players.map(p => ({
            slot:          p.slot,
            multiTier:     p.multiTier     || 0,
            multiProgress: Math.floor(p.multiProgress || 0),
            _multiPending: p._multiPending || false,
            stats:         { ...p.stats }
        }));

        // Events depuis le dernier tick
        const events = [...this._events];
        this._events = [];

        return { tick, time: this.time, bodies, jets, players, events };
    }

  // ── Victoire solo ──
    checkVictory() {
        const living = this.players.filter(p => p.bodies.length > 0);
        if (living.length === 1) return living[0].slot;
        if (living.length === 0) return 0;
        const total = this.allBodies.length;
        for (const p of living) {
            if (p.bodies.length >= total * 0.8) return p.slot;
        }
        return null;
    }

    // ── Victoire équipes ──
    checkTeamVictory(teamCount) {
        const total = this.allBodies.length;
        const teamBodies = {};
        for (let t = 0; t < teamCount; t++) teamBodies[t] = 0;
        for (const p of this.players) {
            const team = p.team ?? p.slot;
            if (teamBodies[team] !== undefined) teamBodies[team] += p.bodies.length;
        }
        for (let t = 0; t < teamCount; t++) {
            if (teamBodies[t] >= total * 0.8) {
                // Retourner le slot du premier joueur de cette équipe
                const winner = this.players.find(p => (p.team ?? p.slot) === t);
                return winner ? winner.slot : 0;
            }
        }
        // Une seule équipe encore en vie ?
        const aliveTeams = new Set(this.players.filter(p => p.bodies.length > 0).map(p => p.team ?? p.slot));
        if (aliveTeams.size === 1) {
            const winTeam = [...aliveTeams][0];
            const winner = this.players.find(p => (p.team ?? p.slot) === winTeam);
            return winner ? winner.slot : 0;
        }
        return null;
    }

    // ── Stats fin de partie ──
getStats() {
        const bySlot = (field) => {
            const obj = {};
            for (const p of this.players) obj[p.slot] = p._stats?.[field] || 0;
            return obj;
        };
        return {
            timeElapsed:     this.time,
            bodiesConquered: bySlot('bodiesConquered'),
            jetsLaunched:    bySlot('jetsLaunched'),
            jetsNeutralized: bySlot('jetsNeutralized'),
            sporesProduced:  bySlot('sporesProduced'),
            players: this.players.map(p => ({
                slot: p.slot, name: p.name, color: p.color,
                bodies: p.bodies.length, totalSpores: Math.floor(p.totalSpores || 0)
            }))
        };
    }
}

// ── Calcul ELO multi-joueurs ──
function computeElo(players, kFactor = 32) {
    // players = [{ userId, elo, rank }] rank 1 = gagnant
    // Filtre : humains uniquement, avec userId
    const humans = players.filter(p => p.userId && p.elo !== undefined);
    if (humans.length < 2) return []; // pas assez d'humains

    const updates = humans.map(p => ({ userId: p.userId, delta: 0 }));

    // Chaque paire
    for (let i = 0; i < humans.length; i++) {
        for (let j = i + 1; j < humans.length; j++) {
            const a = humans[i], b = humans[j];
            // Score réel : 1 si a mieux classé, 0 sinon, 0.5 si égal
            const scoreA = a.rank < b.rank ? 1 : a.rank > b.rank ? 0 : 0.5;
            const scoreB = 1 - scoreA;
            // Score attendu
            const expA = 1 / (1 + Math.pow(10, (b.elo - a.elo) / 400));
            const expB = 1 - expA;
            // Delta
            updates[i].delta += Math.round(kFactor * (scoreA - expA));
            updates[j].delta += Math.round(kFactor * (scoreB - expB));
        }
    }

    // Moyenner le delta par nb de matchups (n-1)
    const n = humans.length - 1;
    return updates.map(u => ({
        userId: u.userId,
        delta: Math.round(u.delta / n),
        newElo: Math.max(100, humans.find(h => h.userId === u.userId).elo + Math.round(u.delta / n))
    }));
}

module.exports = { GameState, computeElo };
