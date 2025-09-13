// Système de chargement dynamique des données CMS
class CMSLoader {
    constructor() {
        this.data = {};
        this.isLoading = false;
    }

    // Charger un fichier JSON
    async loadJSON(path) {
        try {
            const response = await fetch(path);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.warn(`Impossible de charger ${path}:`, error);
        }
        return null;
    }

    // Charger un fichier Markdown avec frontmatter
    async loadMarkdown(path) {
        try {
            const response = await fetch(path);
            if (response.ok) {
                const text = await response.text();
                return this.parseMarkdown(text);
            }
        } catch (error) {
            console.warn(`Impossible de charger ${path}:`, error);
        }
        return null;
    }

    // Parser le frontmatter YAML
    parseMarkdown(content) {
        const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
        const match = content.match(frontmatterRegex);
        
        if (!match) {
            return { body: content };
        }

        const [, frontmatter, body] = match;
        const data = {};
        
        // Parser simple du YAML (pour les cas basiques)
        frontmatter.split('\n').forEach(line => {
            const colonIndex = line.indexOf(':');
            if (colonIndex > -1) {
                const key = line.substring(0, colonIndex).trim();
                let value = line.substring(colonIndex + 1).trim();
                
                // Nettoyer les guillemets
                if ((value.startsWith('"') && value.endsWith('"')) || 
                    (value.startsWith("'") && value.endsWith("'"))) {
                    value = value.slice(1, -1);
                }
                
                // Convertir les nombres
                if (/^\d+(\.\d+)?$/.test(value)) {
                    value = parseFloat(value);
                }
                
                // Convertir les booleans
                if (value === 'true') value = true;
                if (value === 'false') value = false;
                
                data[key] = value;
            }
        });

        return { ...data, body: body.trim() };
    }

    // Charger tous les fichiers d'un dossier
    async loadCollection(collectionName, fileList) {
        const items = [];
        
        for (const fileName of fileList) {
            const filePath = `_${collectionName}/${fileName}`;
            const item = await this.loadMarkdown(filePath);
            if (item) {
                items.push(item);
            }
        }
        
        return items;
    }

    // Charger toutes les données du site
    async loadAllData() {
        if (this.isLoading) return this.data;
        this.isLoading = true;

        try {
            // Charger les paramètres généraux
            const settings = await this.loadJSON('_data/settings.json');
            const homepage = await this.loadJSON('_data/homepage.json');
            const contact = await this.loadJSON('_data/contact.json');

            // Données par défaut si les fichiers n'existent pas
            this.data = {
                settings: settings || {
                    siteName: 'Mon Commerce',
                    logo: '',
                    primaryColor: '#007bff',
                    secondaryColor: '#6c757d',
                    accentColor: '#28a745'
                },
                homepage: homepage || {
                    title: 'Bienvenue dans notre magasin',
                    subtitle: 'Découvrez nos produits de qualité',
                    content: 'Nous sommes ravis de vous accueillir dans notre boutique.'
                },
                contact: contact || {
                    address: '123 Rue du Commerce, 75001 Paris',
                    phone: '01 23 45 67 89',
                    email: 'contact@moncommerce.fr',
                    hours: '<p>Lundi - Vendredi: 9h - 19h<br>Samedi: 9h - 18h<br>Dimanche: Fermé</p>'
                }
            };

            // Essayer de charger les collections (avec gestion d'erreur)
            try {
                // Charger les catégories
                const categoryFiles = ['electronique.md', 'vetements.md', 'maison.md'];
                this.data.categories = await this.loadCollection('categories', categoryFiles);
                
                if (this.data.categories.length === 0) {
                    this.data.categories = [
                        { name: 'Électronique', slug: 'electronique' },
                        { name: 'Vêtements', slug: 'vetements' },
                        { name: 'Maison', slug: 'maison' }
                    ];
                }
            } catch (e) {
                this.data.categories = [
                    { name: 'Électronique', slug: 'electronique' },
                    { name: 'Vêtements', slug: 'vetements' },
                    { name: 'Maison', slug: 'maison' }
                ];
            }

            // Charger les produits avec données par défaut
            try {
                const productFiles = ['smartphone-premium.md', 'tshirt-coton-bio.md', 'lampe-design.md'];
                this.data.products = await this.loadCollection('products', productFiles);
                
                if (this.data.products.length === 0) {
                    this.data.products = this.getDefaultProducts();
                }
            } catch (e) {
                this.data.products = this.getDefaultProducts();
            }

            // Charger les services
            try {
                const serviceFiles = ['livraison.md', 'sav.md'];
                this.data.services = await this.loadCollection('services', serviceFiles);
                
                if (this.data.services.length === 0) {
                    this.data.services = this.getDefaultServices();
                }
            } catch (e) {
                this.data.services = this.getDefaultServices();
            }

            // Charger les promotions
            try {
                const promoFiles = ['smartphone-promo.md'];
                this.data.promotions = await this.loadCollection('promotions', promoFiles);
                
                if (this.data.promotions.length === 0) {
                    this.data.promotions = this.getDefaultPromotions();
                }
            } catch (e) {
                this.data.promotions = this.getDefaultPromotions();
            }

            // Charger les actualités
            try {
                const newsFiles = ['nouvelle-collection.md'];
                this.data.news = await this.loadCollection('news', newsFiles);
                
                if (this.data.news.length === 0) {
                    this.data.news = this.getDefaultNews();
                }
            } catch (e) {
                this.data.news = this.getDefaultNews();
            }

            // Appliquer les couleurs CSS
            this.applyCSSColors();

        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
            this.loadDefaultData();
        }

        this.isLoading = false;
        return this.data;
    }

    // Données par défaut pour les produits
    getDefaultProducts() {
        return [
            {
                name: 'Smartphone Premium',
                description: 'Un smartphone dernière génération avec toutes les fonctionnalités modernes.',
                price: 699,
                image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
                category: 'electronique'
            },
            {
                name: 'T-shirt Coton Bio',
                description: 'T-shirt confortable en coton biologique, disponible en plusieurs couleurs.',
                price: 29,
                image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
                category: 'vetements'
            },
            {
                name: 'Lampe Design',
                description: 'Une belle lampe design pour illuminer votre intérieur avec style.',
                price: 89,
                image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400',
                category: 'maison'
            }
        ];
    }

    // Données par défaut pour les services
    getDefaultServices() {
        return [
            {
                title: 'Livraison à domicile',
                content: '<p>Nous livrons vos commandes directement chez vous dans les meilleurs délais.</p>',
                price: 'À partir de 5€'
            },
            {
                title: 'Service après-vente',
                content: '<p>Notre équipe est là pour vous accompagner après votre achat.</p>',
                price: 'Gratuit'
            }
        ];
    }

    // Données par défaut pour les promotions
    getDefaultPromotions() {
        return [
            {
                product: {
                    name: 'Smartphone Premium',
                    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
                    price: 699
                },
                discount: '-15%',
                newPrice: 594,
                description: 'Promotion exceptionnelle sur notre smartphone phare !',
                endDate: '2024-12-31'
            }
        ];
    }

    // Données par défaut pour les actualités
    getDefaultNews() {
        return [
            {
                title: 'Nouvelle collection printemps',
                description: 'Découvrez notre nouvelle collection pour le printemps avec des couleurs vives et des matières premium.',
                body: '<p>Cette saison, nous vous proposons une sélection exclusive de produits qui allient style et qualité. Venez découvrir nos nouveautés en magasin ou sur notre site.</p>',
                image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
                date: '2024-03-15'
            }
        ];
    }

    // Charger toutes les données par défaut
    loadDefaultData() {
        this.data = {
            settings: {
                siteName: 'Mon Commerce',
                logo: '',
                primaryColor: '#007bff',
                secondaryColor: '#6c757d',
                accentColor: '#28a745'
            },
            homepage: {
                title: 'Bienvenue dans notre magasin',
                subtitle: 'Découvrez nos produits de qualité',
                content: 'Nous sommes ravis de vous accueillir dans notre boutique.'
            },
            contact: {
                address: '123 Rue du Commerce, 75001 Paris',
                phone: '01 23 45 67 89',
                email: 'contact@moncommerce.fr',
                hours: '<p>Lundi - Vendredi: 9h - 19h<br>Samedi: 9h - 18h<br>Dimanche: Fermé</p>'
            },
            categories: [
                { name: 'Électronique', slug: 'electronique' },
                { name: 'Vêtements', slug: 'vetements' },
                { name: 'Maison', slug: 'maison' }
            ],
            products: this.getDefaultProducts(),
            services: this.getDefaultServices(),
            promotions: this.getDefaultPromotions(),
            news: this.getDefaultNews()
        };
    }

    // Appliquer les couleurs CSS
    applyCSSColors() {
        if (this.data.settings) {
            const root = document.documentElement;
            root.style.setProperty('--primary-color', this.data.settings.primaryColor);
            root.style.setProperty('--secondary-color', this.data.settings.secondaryColor);
            root.style.setProperty('--accent-color', this.data.settings.accentColor);
        }
    }
}

// Instance globale du loader
window.cmsLoader = new CMSLoader();

// Intégration avec Alpine.js
window.siteData = function() {
    return {
        currentPage: 'accueil',
        selectedCategory: 'all',
        dataLoaded: false,
        
        // Données par défaut (seront remplacées par les données CMS)
        settings: {
            siteName: 'Mon Commerce',
            logo: '',
            primaryColor: '#007bff',
            secondaryColor: '#6c757d'
        },
        homepage: {
            title: 'Bienvenue dans notre magasin',
            subtitle: 'Découvrez nos produits de qualité',
            content: '<p>Nous sommes ravis de vous accueillir dans notre boutique.</p>'
        },
        categories: [],
        products: [],
        services: [],
        promotions: [],
        news: [],
        contact: {},

        // Initialisation
        async init() {
            const data = await window.cmsLoader.loadAllData();
            
            // Mettre à jour toutes les données
            Object.assign(this, data);
            this.dataLoaded = true;
            
            console.log('Données CMS chargées:', data);
        },

        // Produits filtrés
        get filteredProducts() {
            if (this.selectedCategory === 'all') {
                return this.products;
            }
            return this.products.filter(product => product.category === this.selectedCategory);
        }
    }
};