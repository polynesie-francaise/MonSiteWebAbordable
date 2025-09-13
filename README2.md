# 🔧 Configuration Netlify 2024 - Instructions mises à jour

## 📍 Où trouver les paramètres

Dans la nouvelle interface Netlify (2024), les paramètres se trouvent maintenant dans :

### 1. Accéder aux paramètres du site
1. Connectez-vous sur [app.netlify.com](https://app.netlify.com)
2. Cliquez sur votre site déployé
3. Dans le menu de gauche, cherchez **"Project configuration"** ou **"Site configuration"**

### 2. Navigation mise à jour

Au lieu de "Site settings", vous trouverez maintenant :

```
Votre Site → Project configuration → Security → Identity
```

**OU**

```
Votre Site → Site configuration → Identity
```

## ⚡ Configuration Identity (version 2024)

### Étape 1 : Activer Identity

1. **Allez dans** : `Project configuration` → `Security` → `Identity`
2. **Cliquez sur** : `Enable Identity` (gros bouton)
3. **Choisissez** : `Registration preferences` → `Invite only`

### Étape 2 : Configurer Git Gateway

1. **Restez dans Identity**
2. **Scrollez vers** : `Services` ou `External providers`
3. **Trouvez** : `Git Gateway`
4. **Cliquez** : `Enable Git Gateway`

### Étape 3 : Inviter des utilisateurs

1. **Allez dans l'onglet** : `Users` (dans la section Identity)
2. **Cliquez** : `Invite users`
3. **Entrez votre email**
4. **Envoyez l'invitation**

## 🚨 Si vous ne trouvez pas "Identity"

### Option A : Recherche directe
- Utilisez la barre de recherche dans Netlify
- Tapez "Identity" 
- Cliquez sur le résultat

### Option B : URL directe
Remplacez `YOUR-SITE-NAME` par le nom de votre site :
```
https://app.netlify.com/sites/YOUR-SITE-NAME/settings/identity
```

### Option C : Via Functions
Parfois Identity se trouve dans :
```
Project configuration → Functions → Identity
```

## 🎯 Alternative : Configuration via fichiers

Si vous ne trouvez toujours pas l'interface, vous pouvez configurer via des fichiers :

### 1. Ajoutez dans `netlify.toml`

```toml
[build]
  publish = "."

# Configuration Identity
[context.production.environment]
  NETLIFY_USE_IDENTITY = "true"

[[redirects]]
  from = "/admin/*"
  to = "/admin/index.html"
  status = 200

# Headers pour le CMS
[[headers]]
  for = "/admin/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
```

### 2. Ajoutez un fichier `_headers`

```
/admin/*
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
```

## 🔑 Méthode alternative avec GitHub

Si Identity ne fonctionne pas, utilisez directement GitHub :

### 1. Modifiez `admin/config.yml`

```yaml
backend:
  name: github
  repo: votre-username/votre-repo
  branch: main
  
# Supprimez la ligne git-gateway
# backend:
#   name: git-gateway

# Reste de la config...
```

### 2. Créez une GitHub App

1. Allez sur GitHub → Settings → Developer settings → OAuth Apps
2. Créez une nouvelle OAuth App
3. **Homepage URL**: `https://votre-site.netlify.app`
4. **Authorization callback URL**: `https://votre-site.netlify.app/admin/`
5. Copiez le Client ID

### 3. Ajoutez le Client ID dans config.yml

```yaml
backend:
  name: github
  repo: votre-username/votre-repo
  branch: main
  auth_type: oauth
  app_id: VOTRE_CLIENT_ID  # Client ID de l'étape précédente
```

## ✅ Test de fonctionnement

### 1. Vérifiez le déploiement
- Votre site doit être accessible sur `votre-site.netlify.app`
- La page `/admin/` doit charger l'interface CMS

### 2. Test de connexion
1. Allez sur `votre-site.netlify.app/admin/`
2. Vous devriez voir l'interface Sveltia CMS
3. Connectez-vous avec GitHub ou Identity

### 3. Test d'édition
1. Essayez de modifier un contenu
2. Sauvegardez
3. Vérifiez que les changements apparaissent sur le site

## 🆘 Dépannage

### "Cannot access admin"
- Vérifiez que le fichier `admin/index.html` existe
- Vérifiez les redirections dans `netlify.toml`

### "Backend not found"
- Vérifiez la configuration dans `admin/config.yml`
- Assurez-vous que Identity/GitHub est bien configuré

### "Build failed"
- Regardez les logs de déploiement
- Vérifiez que tous les fichiers sont bien présents

## 📱 Interface mobile Netlify

Si vous utilisez l'app mobile Netlify :
1. Les paramètres sont dans l'onglet ⚙️
2. Cherchez "Site settings" ou "Security"
3. L'option Identity devrait être visible

---

## 🎉 Configuration alternative simple

Si tout cela semble compliqué, voici une méthode **ultra-simple** :

### 1. Utilisez directement GitHub
- Modifiez juste `admin/config.yml` pour utiliser GitHub au lieu de git-gateway
- Plus besoin de configurer Identity

### 2. Fichier config.yml minimal

```yaml
backend:
  name: github
  repo: votre-username/votre-repo
  branch: main

media_folder: "assets/uploads"
public_folder: "/assets/uploads"

# Vos collections ici...
```

Cette méthode fonctionne immédiatement sans configuration supplémentaire ! 🚀

Install Auth0 

Connect to your site
To connect your site to Auth0:

Navigate to Site configuration for the site you want to connect to Auth0.
In the sidebar, select Auth0 by Okta under Extensions.
Select Add a tenant and follow the prompts to connect to your Auth0 account.
Select Save.

deprecier ?
netlify login
netlify link


git lfs install
# Traquer les fichiers volumineux (images)
git lfs track "*.jpg" "*.png" "*.gif"


git checkout main
git pull origin main
git merge --squash staging
git commit -m "Publication groupée CMS"
git push origin main


Option 1 : CLI Git

# Se placer sur la branche staging
git checkout staging
git pull origin staging

# Aller sur main
git checkout main
git pull origin main

# Squash merge pour tout combiner en un commit unique
git merge --squash staging

# Committer le merge
git commit -m "Publication groupée CMS"

# Push vers main → déclenche 1 build
git push origin main


Option 2 : GitHub UI

Crée une PR de staging → main.

Quand tu merges, choisis “Squash and merge” pour combiner tous les commits.

Cela déclenche 1 seul build Netlify pour toutes les modifications.