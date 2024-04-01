# TO-DO LIST 📋

1. Design à partir des maquettes Figma
2. Réfléchir à la logique des algortithmes
3. Réaliser les algorigrammes des 2 algos
4. Coder l'algo #1 sur branche #1
5. Coder l'algo #2 sur branche #2
6. Responsive Design
7. Tester et Comparer les performances des algos
8. Recommander le meilleur algo
9. Créer la fiche d'investigation
10. VALIDATIONS (W3C, Accessibilité, ESLint)

# DESIGN 🎨

❌ Utiliser Bootstrap 

## HEADER
✅ logo  
✅ H1  
✅ searchbar  
✅ Positionner l'image dans le header  
✅ searchbar  
✅ Petite croix input  

## MAIN
✅ Filtre Ingrédients  
✅ Filtre Appareils  
✅ Filtre Ustensiles  
✅ 1500 recettes  
✅ Card  
✅ Dropdown recherche d'ingrédients  
✅ Tag selected
✅ .li-item  
✅ Croix search-mini  
✅ loupe png -> svg  
✅ Faire cours Green IT  

✅ Cursor pointer sur clear/delete  
✅ Cards    
✅ Réaliser l’interface de la page web    
✅ Poids images réduit 
✅ Faire cours Algorithmes 

❌ Cibler Thon rouge (ou blanc) & Champignons de paris, d'autres ? (font-size ?)
❌ Sticky Filters
❌ Fontawesome seulement icones nécessaires  
❌ Séparer et minifier le CSS  
❌ Régler problème largeur cards  
❌ Régler problème msg error fait bouger le reste 
❌ Replacer tag dans liste par rapport à son index ? 

## JAVASCRIPT
✅ clear search  
✅ clear search tags  
✅ Open tag
✅ Delete tag

## LOGIQUE ALGORITHMIQUE 🧠
❌ Travailler sur la logique de recherche et le document d’investigation de fonctionnalité.  
❌ Créer les 2 algorigrammes  
❌ Implémenter la première version de son algorithme de recherche. Il sera plus naturel de commencer par implémenter la recherche simple, 
    - puis la recherche par tags.   
❌ Répéter la procédure pour la 2ème implémentation.  
❌ Comparaison des résultats des algorithmes via un outil de benchmark comme jsben.ch, jsbench.me, jsperf.com.  

## RESPONSIVE DESIGN ➡️
❌ Media queries

## Validations ✅
❌ Exometer   
❌ Ecoindex
❌ ESLint pour JavaScript  
❌ Stylelint pour CSS  
❌ HTMLHint pour HTML  
❌ W3C     
❌ AChecker  
❌ WebAIM  

❌ Green Code : utiliser les bonnes pratiques   
❌ Remplir le README


## Fiche d’investigation 📄
Suivre le modèle de fiche d’investigation à la lettre
-> Compréhensible et décompose bien la problématique de la recherche d’un point de vue Front-end
    Prendre en compte le rafraîchissement de l’affichage
- un bref texte rappelant la problématique : une recherche à 2 étapes
- un schéma expliquant la décomposition logique de la recherche
- Le schéma est logique, montre bien le découpage de la recherche en 2 étapes et prend en compte la problématique d’affichage des résultats. 
- Le choix du moteur de recherche recommandé est justifié par une comparaison chiffrée des performances des 2 algorithmes issue d’un outil de benchmark (au moins le nombre d’opérations par seconde).
- Format PDF et contenir toutes les sections présentes dans le document exemple d’investigation de fonctionnalité.

Créer une branche pour chaque version de la fonction de recherche sur Git. 
Penser à un algorithme de recherche simple qui parcourt les recettes de manière linéaire. 
Avoir les 2 résultats, la recommandation doit se baser sur ceux-ci pour l’implémentation de la solution finale. 
Voir les différentes méthodes disponibles pour le tri de tableau :
- une version de la fonctionnalité avec les boucles natives de JavaScript (for, while...) 
- une version en programmation fonctionnelle avec les méthodes de l'objet array (foreach, filter, map, reduce) 
→ Comprendre la différence et les avantages. 
Il est important que le moteur de recherche **n’attende pas d’avoir filtré toutes les recettes pour afficher les résultats**. Les items qui s’affichent dans les filtres ne doivent être que ceux présents dans les ingrédients, les ustensiles ou les appareils présents dans les premières recettes retournées. 

## Sécurité dans les formulaires 🔒
S’assurer que les formulaires de recherche traitent correctement les tentatives d’insérer des balises html dans les champs.

## Recherche par tag 🔎
Les 3 champs de la recherche par tags étant basés sur le même principe
-> Optimiser son code afin d’appliquer les principe de **DRY (don’t repeat yourself)**. 
Tags, leur ordre d’affichage n’a pas d’importance, cependant, mais le tag ne doit apparaître qu’une seule fois dans la liste de sélection pour chaque ingrédient / ustensile / appareil.
 
## Green Code 🌱
Le code est bien décomposé en fonctions réutilisables. A minima :
- une fonction pour l’affichage des cartes de recettes
- une fonction pour les sélecteurs de Tags.