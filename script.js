// Configuration Alpine.js
function siteData() {
    return {
        currentPage: 'accueil',
        selectedCategory: 'all',
        dataLoaded: true, // Mettre à true pour le mode par défaut
        
        // Configuration du site (modifiable via CMS)
        settings: {
            siteName: 'Mon Commerce',
            logo: '',
            primaryColor: '#007bff',
            secondaryColor: '#6c757d',
            accentColor: '#28a745'
        },

        // Page d'accueil
        homepage: {
            title: 'Bienvenue dans notre magasin',
            subtitle: 'Découvrez nos produits de qualité',
            content: '<p>Nous sommes ravis de vous accueillir dans notre boutique. Découvrez notre large gamme de produits sélectionnés avec soin pour vous satisfaire.</p>'
        },

        // Catégories
        categories: [
            { name: 'Électronique', slug: 'electronique' },
            { name: 'Vêtements', slug: 'vetements' },
            { name: 'Maison', slug: 'maison' }
        ],

        // Produits
        products: [
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
            },
            {
                name: 'Casque Audio',
                description: 'Casque audio haute qualité pour une expérience sonore exceptionnelle.',
                price: 149,
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
                category: 'electronique'
            },
            {
                name: 'Jeans Premium',
                description: 'Jean de qualité supérieure, confortable et durable.',
                price: 79,
                image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
                category: 'vetements'
            },
            {
                name: 'Coussin Décoratif',
                description: 'Coussin décoratif pour apporter une touche de style à votre salon.',
                price: 25,
                image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
                category: 'maison'
            }
        ],

        // Services
        services: [
            {
                title: 'Livraison à domicile',
                content: '<p>Nous livrons vos commandes directement chez vous dans les meilleurs délais.</p><ul><li>Livraison rapide 24-48h</li><li>Suivi de commande en temps réel</li><li>Livraison gratuite dès 50€ d\'achat</li></ul>',
                price: 'À partir de 5€'
            },
            {
                title: 'Service après-vente',
                content: '<p>Notre équipe est là pour vous accompagner après votre achat.</p><ul><li>Garantie étendue disponible</li><li>Support technique gratuit</li><li>Échange et remboursement facilités</li></ul>',
                price: 'Gratuit'
            },
            {
                title: 'Installation à domicile',
                content: '<p>Nos techniciens se déplacent chez vous pour installer vos équipements.</p><ul><li>Installation professionnelle</li><li>Formation à l\'utilisation</li><li>Mise en service complète</li></ul>',
                price: 'Sur devis'
            }
        ],

        // Promotions
        promotions: [
            {
                product: {
                    name: 'Smartphone Premium',
                    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
                    price: 699
                },
                discount: '-15%',
                newPrice: 594,
                description: 'Promotion exceptionnelle sur notre smartphone phare !',
                endDate: '31/12/2024'
            },
            {
                product: {
                    name: 'Casque Audio',
                    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
                    price: 149
                },
                discount: '-20%',
                newPrice: 119,
                description: 'Offre spéciale sur notre casque audio premium.',
                endDate: '15/11/2024'
            }
        ],

        // Actualités
        news: [
            {
                title: 'Nouvelle collection printemps',
                description: 'Découvrez notre nouvelle collection pour le printemps avec des couleurs vives et des matières premium.',
                content: '<p>Cette saison, nous vous proposons une sélection exclusive de produits qui allient style et qualité.</p><p><strong>Nos nouveautés :</strong></p><ul><li>Vêtements aux couleurs printanières</li><li>Matières naturelles et durables</li><li>Coupes modernes et confortables</li></ul><p>Venez découvrir nos nouveautés en magasin ou parcourez notre catalogue en ligne.</p>',
                image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
                date: '2024-03-15'
            },
            {
                title: 'Extension de nos horaires',
                description: 'Pour mieux vous servir, nous étendons nos horaires d\'ouverture.',
                content: '<p>À partir du 1er avril, nous serons ouverts :</p><ul><li><strong>Lundi au vendredi :</strong> 9h - 20h</li><li><strong>Samedi :</strong> 9h - 19h</li><li><strong>Dimanche :</strong> 10h - 18h</li></ul><p>Plus de flexibilité pour vos achats !</p>',
                image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
                date: '2024-03-20'
            },
            {
                title: 'Programme de fidélité',
                description: 'Lancez notre nouveau programme de fidélité avec de nombreux avantages.',
                content: '<p>Rejoignez notre programme de fidélité et bénéficiez de :</p><ul><li>Points sur chaque achat</li><li>Réductions exclusives</li><li>Invitations aux ventes privées</li><li>Cadeaux d\'anniversaire</li></ul><p>Inscription gratuite en magasin ou sur notre site.</p>',
                image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=400',
                date: '2024-03-10'
            }
        ],

        // Contact
        contact: {
            address: '123 Rue du Commerce, 75001 Paris',
            phone: '01 23 45 67 89',
            email: 'contact@moncommerce.fr',
            hours: '<p><strong>Lundi - Vendredi:</strong> 9h - 19h<br><strong>Samedi:</strong> 9h - 18h<br><strong>Dimanche:</strong> Fermé</p>'
        },

        // Méthodes
        init() {
            console.log('Site initialisé');
            this.loadCMSData();
        },

        // Charger les données du CMS (fonction future)
        async loadCMSData() {
            try {
                // Ici on pourrait charger les données depuis le CMS
                // Pour l'instant, on utilise les données par défaut
                console.log('Données chargées depuis les valeurs par défaut');
                this.applyCSSColors();
            } catch (error) {
                console.log('Utilisation des données par défaut');
            }
        },

        // Appliquer les couleurs CSS
        applyCSSColors() {
            const root = document.documentElement;
            root.style.setProperty('--primary-color', this.settings.primaryColor);
            root.style.setProperty('--secondary-color', this.settings.secondaryColor);
            root.style.setProperty('--accent-color', this.settings.accentColor);
        },

        // Produits filtrés
        get filteredProducts() {
            if (this.selectedCategory === 'all') {
                return this.products;
            }
            return this.products.filter(product => product.category === this.selectedCategory);
        }
    }
}

// Configuration pour Netlify Identity
if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
        if (!user) {
            window.netlifyIdentity.on("login", () => {
                document.location.href = "/admin/";
            });
        }
    });
}

// Initialisation Alpine.js
document.addEventListener('alpine:init', () => {
    console.log('Alpine.js initialisé avec succès');
});