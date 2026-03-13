# nebula-conquest-server

Serveur autoritaire pour Nebula Conquest — jusqu'à 50 joueurs simultanés.

## Stack
- Node.js + socket.io 4.x
- Supabase (vérification JWT auth uniquement)

## Installation locale
```bash
npm install
node server.js
```

## Variables d'environnement
```
SUPABASE_URL=https://hcjajtpbzusqgxkyzbgc.supabase.co
SUPABASE_SERVICE_KEY=<service_role key — Dashboard > Settings > API>
PORT=3000
MAX_PLAYERS_PER_ROOM=50
TICK_RATE=20
```

Sans `SUPABASE_SERVICE_KEY`, le serveur tourne en mode dev (pas de vérification JWT).

## Déploiement Railway
1. Créer un projet Railway, connecter ce repo
2. Ajouter les variables d'env ci-dessus dans Railway > Variables
3. Deploy — Railway détecte `railway.json` automatiquement

## Structure
```
server.js              — HTTP + socket.io, gestion connexions
game/
  roomManager.js       — Rooms, lobby, boucle de jeu
  state.js             — État du jeu, orbites, production, jets
  actions.js           — Validation des inputs joueur
railway.json           — Config déploiement
```

## Plan de développement
Voir le DEV LOG dans `nebula-conquest_vX.html` — section PLAN D'ATTAQUE v4.0
- S1 ✅ Serveur minimal (ce repo)
- S2 ⬜ Logique de jeu complète côté serveur
- S3 ⬜ Migration client (socket.io côté HTML)
- S4 ⬜ 50 joueurs & optimisations
- S5 ⬜ Polish multijoueur
