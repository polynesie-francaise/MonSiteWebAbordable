# 🛍️ Template E-commerce avec Sveltia CMS

Un template de site e-commerce complet, responsive et entièrement gérable via CMS, prêt à déployer sur Netlify.

## 🚀 Démo en direct

Le site fonctionne immédiatement avec des données par défaut. Une fois déployé, vous pourrez tout modifier via le CMS.

## 📁 Structure des fichiers

```
votre-site/
├── index.html              # Page principale
├── styles.css              # Styles CSS
├── script.js               # JavaScript principal  
├── admin/
│   ├── index.html          # Interface CMS
│   └── config.yml          # Configuration CMS
├── _data/
│   ├── settings.json       # Paramètres du site
│   ├── homepage.json       # Contenu page d'accueil
│   └── contact.json        # Informations contact
├── _categories/            # Dossier des catégories
├── _products/              # Dossier des produits
├── _services/              # Dossier des services
├── _promotions/            # Dossier des promotions
├── _news/                  # Dossier des actualités
├── _pages/                 # Pages personnalisées
├── assets/
│   └── uploads/            # Images uploadées
├── netlify.toml            # Configuration Netlify
└── _redirects              # Redirections
```

## ⚡ Installation rapide

### 1. Télécharger les fichiers

Créez les fichiers suivants dans votre projet :

**netlify.toml**
```toml
[build]
  publish = "."

[[redirects]]
  from = "/admin/*"
  to = "/admin/index.html" 
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

**_redirects**
```
/admin/* /admin/index.html 200
```

### 2. Créer les dossiers de données

```bash
mkdir _data _categories _products _services _promotions _news _pages assets/uploads
```

### 3. Fichiers de données par défaut

**_data/settings.json**
```json
{
  "siteName": "Mon Commerce",
  "logo": "",
  "primaryColor": "#007bff",
  "secondaryColor": "#6c757d", 
  "accentColor": "#28a745"
}
```

**_data/homepage.json**
```json
{
  "title": "Bienvenue dans notre magasin",
  "subtitle": "Découvrez nos produits de qualité",
  "content": "Nous sommes ravis de vous accueillir dans notre boutique."
}
```

**_data/contact.json**
```json
{
  "address": "123 Rue du Commerce, 75001 Paris",
  "phone": "01 23 45 67 89", 
  "email": "contact@moncommerce.fr",
  "hours": "**Lundi - Vendredi:** 9h - 19h<br>**Samedi:** 9h - 18h<br>**Dimanche:** Fermé"
}
```

## 🌐 Déploiement sur Netlify

### 1. Préparation

1. Créez un dépôt Git avec tous les fichiers
2. Poussez sur GitHub/GitLab/Bitbucket

### 2. Déploiement

1. Allez sur [netlify.com](https://netlify.com)
2. Cliquez "New site from Git"
3. Connectez votre dépôt
4. Configuration de build :
   - **Build command:** (laisser vide)
   - **Publish directory:** `.` 
5. Cliquez "Deploy site"

### 3. Configuration du CMS

1. **Activez Netlify Identity:**
   - Site settings → Identity
   - Cliquez "Enable Identity"
   - Registration preferences → "Invite only"

2. **Activez Git Gateway:**
   - Identity → Services 
   - Git Gateway → "Enable Git Gateway"

3. **Invitez des utilisateurs:**
   - Identity tab → "Invite users"
   - Entrez votre email

### 4. Accès au CMS

1. Allez sur `votre-site.netlify.app/admin/`
2. Créez votre compte administrateur
3. Commencez à modifier le contenu !

## 🎨 Fonctionnalités

### ✅ Pages disponibles
- **Accueil** - Hero section + contenu
- **Catalogue** - Produits avec filtres par catégorie
- **Services** - Description des services 
- **Promotions** - Produits en promotion
- **Actualités** - Blog/news avec images
- **Contact** - Coordonnées + formulaire

### ✅ Gestion via CMS
- **Couleurs** du site (primaire, secondaire, accent)
- **Logo** et nom du site
- **Tous les contenus** (textes, images, prix)
- **Catégories** de produits
- **Produits** complets (nom, description, prix, image, catégorie)
- **Services** avec tarifs
- **Promotions** avec dates de validité
- **Actualités** avec contenu riche
- **Informations de contact**

### ✅ Fonctionnalités techniques
- **Responsive design** (mobile, tablet, desktop)
- **Navigation fluide** entre les pages
- **Filtrage** des produits par catégorie
- **Formulaire de contact** intégré Netlify
- **SEO optimisé** avec structure sémantique
- **Performance** optimisée (CSS/JS minifiés)

## 🛠️ Personnalisation avancée

### Modifier les couleurs via CSS

Dans `styles.css`, modifiez les variables :

```css
:root {
    --primary-color: #007bff;    /* Couleur principale */
    --secondary-color: #6c757d;  /* Couleur secondaire */
    --accent-color: #28a745;     /* Couleur d'accent */
}
```

### Ajouter de nouvelles sections

1. Modifiez `admin/config.yml` pour ajouter des champs
2. Mettez à jour `script.js` pour charger les données
3. Ajoutez le HTML correspondant dans `index.html`

### Exemple d'ajout d'une section "Témoignages"

**Dans config.yml :**
```yaml
- name: "testimonials"
  label: "Témoignages"
  folder: "_testimonials" 
  create: true
  fields:
    - { label: "Nom", name: "name", widget: "string" }
    - { label: "Témoignage", name: "content", widget: "text" }
    - { label: "Note", name: "rating", widget: "number", max: 5, min: 1 }
```

## 🔧 Résolution de problèmes

### Le CMS ne fonctionne pas
- Vérifiez que Netlify Identity est activé
- Vérifiez que Git Gateway est activé
- Assurez-vous que `admin/config.yml` est correct

### Les images ne s'affichent pas
- Vérifiez le dossier `assets/uploads/`
- Utilisez des URLs complètes pour les images externes

### Erreur de déploiement
- Vérifiez que tous les fichiers sont présents
- Regardez les logs de déploiement dans Netlify
- Assurez-vous que `netlify.toml` est à la racine

## 📈 Prochaines étapes

Une fois votre site déployé :

1. **Personnalisez** via le CMS (`/admin/`)
2. **Ajoutez vos produits** avec de vraies images
3. **Configurez** les couleurs de votre marque
4. **Rédigez** vos actualités
5. **Testez** le formulaire de contact
6. **Partagez** votre nouveau site !

## 💡 Conseils d'utilisation

- **Utilisez des images de qualité** (recommandé : 800x600px minimum)
- **Optimisez vos images** avant upload (WebP recommandé)
- **Rédigez des descriptions** attractives pour vos produits
- **Mettez à jour régulièrement** vos actualités
- **Testez sur mobile** avant publication

## 🆘 Support

Si vous rencontrez des problèmes :

1. Consultez la [documentation Netlify](https://docs.netlify.com)
2. Regardez la [documentation Sveltia CMS](https://sveltia.dev)
3. Vérifiez les [issues GitHub du projet](https://github.com/sveltia/sveltia-cms)

---

🎉 **Félicitations !** Votre site e-commerce est maintenant prêt à être utilisé et personnalisé entièrement via le CMS.