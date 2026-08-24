# Migration Greffio → Clareffio — 24 août 2026

## État sauvegardé

- Snapshot de code Clareffio conservé depuis `TheWilliamUniverse/greffio` : `628becfb942ac46830b5c0c2030f47306224f327`.
- Copie complète dans `TheWilliamUniverse/clareffio` effectuée à partir de ce snapshot (1310 fichiers lors de l'import).
- Branches de sécurité conservées dans le dépôt Greffio : `clareffio` et `archive/clareffio-migration-2026-08-24`.
- `TheWilliamUniverse/greffio/main` a été rétabli sur le dernier état Greffio antérieur au rebranding : `082c3dc44168a1bd35a13e8e550c68d33c77de80`.

## Sauvegarde base de données

Projet Supabase Greffio `rkarlbcnzfogpnjmgude` : copie de sécurité créée dans le schéma privé `backup_greffio_20260824`.

- 106 tables copiées.
- 3474 lignes consignées dans le manifeste de sauvegarde.
- Schémas couverts : `public`, `chat`, `storage`, `auth`.
- Accès au schéma de sauvegarde retiré à `public`, `anon` et `authenticated`.

## Point de sécurité avant bascule de domaine

La configuration de production indique `DOCUMENT_STORAGE_DRIVER=s3` et le bucket `greffio-production-documents`. La sauvegarde Supabase ne constitue donc pas, à elle seule, une sauvegarde des octets stockés dans AWS S3.

**Ne pas mettre `greffio.willentreprises.com` hors ligne et ne pas supprimer l'infrastructure Greffio tant qu'une sauvegarde/vérification du bucket S3 et des fichiers de production n'a pas été réalisée.**

## Clareffio

- Domaine applicatif préparé : `https://clareffio.willentreprises.com`.
- API transitoire conservée : `https://api.greffio.willentreprises.com` afin d'éviter une rupture avant séparation de l'infrastructure backend.
- Déploiement backend automatique du dépôt Clareffio volontairement bloqué tant qu'une cible distincte n'est pas provisionnée, afin d'empêcher l'écrasement de `/opt/greffio` / `greffio-api`.
- L'identifiant mobile `com.greffio.app` est conservé pour la continuité des mises à jour de l'application existante ; le nom visible est Clareffio.

## Identité visuelle

Le wordmark web Clareffio utilise exclusivement `/public/icons/clareffio-wordmark.svg`. Les tailles du wordmark de navigation et des variantes sur fond bleu ont été réalignées sur celles de Greffio. Le symbole arc reste réservé aux usages icône / favicon / app / chargement et aux variantes explicitement icon-only.
