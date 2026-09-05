# skizoPlat — site statique

Contenu : 4 pages (`index.html` = Quiz, `simulateur.html`, `broker.html`, `etf.html`), même contenu que les pages publiées sur claude.ai, mais avec des liens internes en relatif (`/broker.html`, etc.) pour fonctionner sous ton propre nom de domaine.

## Déployer (Vercel + GitHub)

1. Crée un repo vide sur GitHub (ex: nom de domaine choisi, sans espace).
2. Dans ce dossier :
   ```
   git remote add origin <URL du repo GitHub>
   git branch -M main
   git push -u origin main
   ```
3. Sur vercel.com → "Add New Project" → importer ce repo GitHub → Deploy (aucune configuration nécessaire, site 100% statique).
4. Une URL `xxx.vercel.app` est générée immédiatement — le site est déjà public à ce stade.
5. Une fois le nom de domaine choisi et acheté : Project → Settings → Domains → ajouter le domaine → suivre les instructions DNS affichées.

## Prochaine étape (incrément suivant)

Authentification (Supabase) pour la section "Mes finances" uniquement — les 4 pages actuelles restent publiques, sans compte requis.
