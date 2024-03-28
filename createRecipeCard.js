// Importer les données des recettes depuis le fichier recipes.js
import { recipes } from './recipes.js';

// Fonction pour créer une carte de recette
export function createRecipeCard(recipe) {
  // Créer les éléments HTML pour la carte de recette
  const card = document.createElement('div');
  card.classList.add('col-md-4');

  const cardHTML = `
    <div class="card h-100">
      <img src="assets/images/damier-check.png" class="card-img-top" alt="...">
      <span class="badge rounded-pill">${recipe.time} min</span>
      <div class="card-body">
        <h3 class="card-title">${recipe.name}</h3>
        <h4 class="card-recipe">Recette</h4>
        <p class="card-text">${recipe.description}</p>
        <h4 class="card-ingredients">Ingrédients</h4>
        <div class="grid-ingredients">
          ${recipe.ingredients.map(ingredient => `
            <div class="row row-cols-2">
              <div class="col">
                <p class="card-ingredient">${ingredient.ingredient}</p>
                <p class="card-quantity">${ingredient.quantity}${ingredient.unit ? ' ' + ingredient.unit : ''}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  // Injecter le HTML de la carte dans l'élément parent
  card.innerHTML = cardHTML;

  return card;
}

// Fonction pour afficher les cartes de recettes
function displayRecipeCards() {
  // Sélectionner l'élément parent pour les cartes de recettes
  const cardContainer = document.querySelector('.grid-cards');

  // Vider le contenu existant du conteneur
  cardContainer.innerHTML = '';

  // Créer et ajouter les cartes de recettes au conteneur
  recipes.forEach(recipe => {
    const card = createRecipeCard(recipe);
    cardContainer.appendChild(card);
  });
}

// Appeler la fonction pour afficher les cartes de recettes au chargement de la page
window.addEventListener('DOMContentLoaded', displayRecipeCards);
