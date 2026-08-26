# Clareffio

Plateforme SaaS de formalités d'entreprise : création, modification, suivi de dossier, documents, signature, paiement et opérations.

## Stack

- Frontend : React 18 + Vite
- Frontend Hostinger Web App : Node.js + Express pour servir `dist`
- Backend : Node.js + Express, actuellement conservé sur l'infrastructure API historique pendant la migration
- Base : Supabase/PostgreSQL
- Stockage documents : S3 en production
- Mobile : Capacitor / Expo selon cible

## URLs de migration

- Frontend Clareffio : `https://clareffio.willentreprises.com`
- API provisoire : `https://api.greffio.willentreprises.com`
- Domaine final prévu ultérieurement : `https://clareffio.com`

Le renommage du frontend ne doit pas entraîner une modification prématurée des identifiants techniques, callbacks ou buckets utilisés par la production.

## Développement local

```bash
npm ci
npm run dev
```

Backend local si nécessaire :

```bash
npm run dev:api
```

## Build production

```bash
npm run build
```

Le build Vite est généré dans `dist/`.

## Hostinger Web App via GitHub

Voir `FRONTEND_HOSTINGER_GIT_DEPLOY.md`.

Configuration cible :

- repository : `TheWilliamUniverse/clareffio`
- branch : `main`
- Node.js : `22.x`
- install : `npm ci`
- build : `npm run hostinger:build`
- output : `dist`
- entry file : `hostinger-entry.js`

Variables frontend minimales :

```env
VITE_APP_NAME=Clareffio
VITE_APP_URL=https://clareffio.willentreprises.com
VITE_API_BASE_URL=https://api.greffio.willentreprises.com
API_PUBLIC_URL=https://api.greffio.willentreprises.com
```

Ne pas définir `NODE_ENV=production` avant l'installation/build Hostinger : Vite est installé comme `devDependency`.

Ne jamais exposer dans l'application frontend les secrets backend (`DATABASE_URL`, service-role Supabase, secrets AWS, JWT, OpenAI, Mollie, etc.).

## Identité visuelle

- Wordmark : `public/icons/clareffio-wordmark.svg`
- Symbole arc : `public/icons/clareffio-arc.svg`

Le wordmark est utilisé dans l'interface. L'arc est réservé aux usages d'icône, favicon, store et animation de chargement selon l'identité validée.

## Vérification

- `.github/workflows/frontend-ci.yml` vérifie le projet frontend général.
- `.github/workflows/hostinger-readiness.yml` reproduit le chemin critique réellement utilisé par Hostinger Web App.

Après déploiement Hostinger, vérifier d'abord :

```text
/health
/
/login
/tarifs
```

`/health` doit identifier le service comme `clareffio-frontend`.
