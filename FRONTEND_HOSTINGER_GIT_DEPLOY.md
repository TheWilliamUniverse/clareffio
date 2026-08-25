# Clareffio — déploiement Hostinger Web App via GitHub

Ce dépôt est préparé pour être connecté directement à **Hostinger → Deploy Web App → GitHub**.

## Source

- Repository : `TheWilliamUniverse/clareffio`
- Branch : `main`
- Root directory : `./`
- Node.js : `20.x`
- Framework : `Other` si l'auto-détection React ne permet pas de définir l'entry file

## Build Hostinger

Réglages recommandés :

- Install command : `npm ci`
- Build command : `npm run hostinger:build`
- Output directory : `dist`
- Entry file : `server/hostinger-frontend.js`

Le serveur d'entrée écoute `process.env.PORT` avec fallback sur le port `3000`, sert le build Vite dans `dist`, gère le fallback SPA React Router et expose `/health`.

## Variables d'environnement du FRONTEND Hostinger

Ajouter uniquement les variables publiques nécessaires au build / frontend :

```env
NODE_ENV=production
VITE_APP_NAME=Clareffio
VITE_APP_URL=https://clareffio.willentreprises.com
VITE_API_BASE_URL=https://api.greffio.willentreprises.com
API_PUBLIC_URL=https://api.greffio.willentreprises.com
```

Le backend/API reste provisoirement sur `api.greffio.willentreprises.com` pendant la bascule de marque. Le domaine public du frontend est `clareffio.willentreprises.com`.

### Ne jamais ajouter au frontend Hostinger

Ne pas copier les secrets backend dans cette Web App :

- `DATABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `AWS_SECRET_ACCESS_KEY`
- `JWT_SECRET`
- `OPENAI_API_KEY`
- `MOLLIE_API_KEY`
- `BREVO_API_KEY`
- toute autre clé privée / service-role

Ils restent sur l'infrastructure backend.

## Vérification après déploiement

Vérifier dans cet ordre :

1. `/health` doit répondre avec `"ok": true` et `"service": "clareffio-frontend"`.
2. `/` doit afficher la landing Clareffio.
3. `/login`, `/tarifs` et une route React profonde doivent se charger directement sans 404.
4. Le favicon doit utiliser l'arc Clareffio.
5. Le header doit utiliser le wordmark SVG Clareffio bleu.
6. Les requêtes API doivent partir vers `https://api.greffio.willentreprises.com` tant que le backend n'a pas été renommé.
7. Tester le callback de paiement avant toute coupure de l'ancien frontend.

## Déploiements suivants

Une fois l'intégration GitHub activée, Hostinger peut reconstruire automatiquement l'application à chaque push sur `main` selon les capacités du plan. Aucun ZIP manuel n'est nécessaire.

## Passage futur à clareffio.com

Ne pas modifier maintenant les identifiants techniques backend / mobile uniquement pour le changement de domaine. Le passage à `clareffio.com` fera l'objet d'une bascule séparée : DNS, canonical/SEO, CORS, callbacks paiement, universal/app links et variables d'environnement.
