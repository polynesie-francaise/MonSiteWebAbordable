# 🚀 Guide de Déploiement Complet

## 📋 Checklist avant déploiement

### Structure des fichiers requise :
```
votre-site/
├── index.html                    ✅ Page principale
├── admin/
│   ├── config.yml               ✅ Configuration Sveltia CMS
│   └── index.html               ✅ Interface admin
├── assets/
│   └── images/
│       ├── logo.png            📷 Ajoutez votre logo
│       └── favicon.ico         📷 Ajoutez votre favicon
├── content/                     📁 Dossier créé automatiquement
├── netlify.toml                ✅ Configuration Netlify
└── README.md                   ✅ Documentation
```

## 🌐 Option 1 : Déploiement Netlify (Recommandé)

### Étape 1 : Préparer le repository
```bash
git init
git add .
git commit -m "Initial commit - Site grossiste alimentaire"
git remote add origin https://github.com/votre-username/votre-repo.git
git push -u origin main
```

### Étape 2 : Déployer sur Netlify
1. Allez sur [netlify.com](https://netlify.com)
2. "New site from Git"
3. Connectez votre repository GitHub/GitLab
4. Configuration :
   - **Build command**: `echo "Site statique prêt"`
   - **Publish directory**: `.` (racine)
5. Cliquez "Deploy site"

### Étape 3 : Configurer l'authentification
1. **Site Settings** → **Identity** → **Enable Identity**
2. **Identity** → **Settings and usage** → **Registration preferences** → **Invite only**
3. **Identity** → **Services** → **Git Gateway** → **Enable Git Gateway**

### Étape 4 : Créer un utilisateur admin
1. **Identity** tab → **Invite users**
2. Ajoutez votre email
3. Cliquez sur le lien dans l'email reçu
4. Définissez votre mot de passe

### Étape 5 : Accéder à l'admin
- URL : `https://votre-site.netlify.app/admin`
- Connectez-vous avec vos identifiants

## 🖥️ Option 2 : Hébergement traditionnel

### Serveurs supportés :
- **Apache** : Compatible directement
- **Nginx** : Compatible directement  
- **IIS** : Compatible avec configuration
- **GitHub Pages** : Compatible (sans CMS)

### Configuration Apache (.htaccess) :
```apache
# Redirection pour l'admin
RewriteEngine On
RewriteRule ^admin/(.*)$ admin/index.html [L]

# Gestion des erreurs
ErrorDocument 404 /404.html

# Cache des assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/* "access plus 1 month"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType text/javascript "access plus 1 month"
</IfModule>
```

### Configuration Nginx :
```nginx
server {
    listen 80;
    server_name votre-domaine.com;
    root /path/to/your/site;
    
    # Admin routing
    location /admin {
        try_files $uri $uri/ /admin/index.html;
    }
    
    # Assets caching
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico)$ {
        expires 1M;
        add_header Cache-Control "public, immutable";
    }
}
```

## ☁️ Option 3 : Autres plateformes

### Vercel :
```json
// vercel.json
{
  "rewrites": [
    { "source": "/admin/(.*)", "destination": "/admin/index.html" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### GitHub Pages :
⚠️ **Limitation** : GitHub Pages ne supporte pas Sveltia CMS (pas de backend). 
Utilisable uniquement comme site statique sans interface d'admin.

## 🛠️ Configuration avancée

### Variables d'environnement Netlify :
```
NETLIFY_SITE_ID=votre-site-id
NETLIFY_ACCESS_TOKEN=votre-token
```

### Domaine personnalisé :
1. **Site settings** → **Domain management**
2. **Add custom domain** → Saisissez votre domaine
3. Configurez vos DNS :
   ```
   Type: CNAME
   Name: www
   Value: votre-site.netlify.app
   
   Type: A
   Name: @
   Value: 75.2.60.5
   ```

### SSL/HTTPS :
- Netlify : Automatique avec Let's Encrypt
- Autres : Configurez votre certificat SSL

## 🎨 Personnalisation post-déploiement

### 1. Accédez à l'admin
`https://votre-site.com/admin`

### 2. Configurez les couleurs
**Paramètres du site** → **Couleurs et thème** :
- Couleur principale (navbar, boutons)
- Couleur secondaire (CTA, accents)
- Couleurs de fond et texte

### 3. Ajoutez votre contenu
- **Services** : Décrivez vos services
- **Produits** : Uploadez images et descriptions
- **Contact** : Vos vraies coordonnées
- **À propos** : Histoire de votre entreprise

### 4. Optimisations SEO
- Ajoutez meta descriptions
- Optimisez les balises alt des images
- Configurez Google Analytics
- Ajoutez un sitemap.xml

## 📊 Analytics et suivi

### Google Analytics :
Ajoutez dans `<head>` de index.html :
```html
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Netlify Analytics :
Inclus automatiquement dans l'interface Netlify.

## 🔧 Maintenance

### Sauvegardes :
- Contenu : Automatique via Git
- Site complet : Export depuis Netlify
- Base de données : Non applicable (site statique)

### Mises à jour :
- Contenu : Via interface CMS
- Code : Push vers votre repository
- CMS : Mise à jour automatique de Sveltia

### Monitoring :
- **Uptime** : Pingdom, StatusCake
- **Performance** : Google PageSpeed Insights
- **Erreurs** : Sentry (optionnel)

## ❓ Résolution de problèmes

### "Cannot access /admin"
```bash
# Vérifiez la configuration Git Gateway
# Vérifiez le fichier admin/config.yml
# Vérifiez les permissions du repository
```

### "Changes not saving"
```bash
# Vérifiez Git Gateway dans Netlify
# Vérifiez les permissions d'écriture
# Videz le cache du navigateur
```

### "Site ne charge pas"
```bash
# Vérifiez les logs de build
# Vérifiez la configuration DNS
# Testez en navigation privée
```

## 🎯 Optimisations finales

### Performance :
- ✅ Images WebP
- ✅ CSS minifié
- ✅ Cache configuré
- ✅ Compression gzip

### SEO :
- ✅ Balises meta
- ✅ Structure sémantique
- ✅ Schema.org markup
- ✅ Sitemap XML

### Accessibilité :
- ✅ Contraste des couleurs
- ✅ Navigation au clavier
- ✅ Balises alt sur images
- ✅ Liens descriptifs

---

**🎉 Votre site est maintenant prêt et entièrement personnalisable via l'interface d'administration !**