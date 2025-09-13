#!/bin/bash

# Script pour optimiser les builds Netlify
echo "🚀 Début du build optimisé..."

# Vérifier s'il y a des changements dans les fichiers importants
CHANGED_FILES=$(git diff --name-only $CACHED_COMMIT_REF $COMMIT_REF)

# Si seulement les fichiers de contenu ont changé, pas besoin de rebuild
if echo "$CHANGED_FILES" | grep -E "^(_data|_products|_services|_news|_promotions|assets)" > /dev/null; then
    if ! echo "$CHANGED_FILES" | grep -E "^(index.html|styles.css|script.js|admin)" > /dev/null; then
        echo "✅ Seuls les fichiers de contenu ont changé, pas de rebuild nécessaire"
        exit 0
    fi
fi

echo "🔧 Build nécessaire pour les changements détectés"
echo "📁 Fichiers modifiés:"
echo "$CHANGED_FILES"

# Optimisation des images si nécessaire
if command -v netlify &> /dev/null; then
    echo "🖼️ Optimisation des images avec Netlify Large Media..."
    netlify lm:install
fi

echo "✅ Build terminé avec succès !"