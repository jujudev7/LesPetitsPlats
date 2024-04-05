import { createRecipeCard } from './createRecipeCard.js';
import { getUniqueIngredients, getUniqueAppliances, getUniqueUstensils } from './searchRecipes.js'
import { selectListItem } from "./createTags.js";
import { createList } from "./createTags.js";

export function displayAllRecipes() {
  updateInterface(allRecipes);
}

// Fonction pour actualiser l'interface du site avec les recettes trouvées
export function updateInterface(recipes) {
  const error = document.querySelector(".error");
  const cardsContainer = document.querySelector(".grid-cards");

  // Supprimer les résultats précédents
  cardsContainer.innerHTML = "";

  if (recipes.length === 0) {
    error.style.display = "block";
    error.textContent =
      "0 résultat, veuillez effectuer une nouvelle recherche svp.";
  } else {
    error.style.display = "none";
    error.textContent = "";
    recipes.forEach((recipe) => {
      // Utiliser la fonction createRecipeCard pour générer la carte de recette
      const recipeCard = createRecipeCard(recipe);
      // Ajouter la carte de recette à l'interface utilisateur
      cardsContainer.appendChild(recipeCard);
    });

    // Mettre à jour les tags des filtres de recherche
    updateFilters(recipes);
  }
}

// Fonction pour mettre à jour les tags des filtres de recherche
export function updateFilters(recipes) {
  const ingredientsList = getUniqueIngredients(recipes);
  const appliancesList = getUniqueAppliances(recipes);
  const ustensilsList = getUniqueUstensils(recipes);

  console.log("Ingredients List:", ingredientsList);
  console.log("Appliances List:", appliancesList);
  console.log("Ustensils List:", ustensilsList);

  // Supprimer les anciennes listes des filtres de recherche
  removeOldLists();

  // Mettre à jour les listes des filtres de recherche avec les nouveaux éléments
  updateList("collapseIngredients", ingredientsList, selectListItem);
  updateList("collapseAppliances", appliancesList, selectListItem);
  updateList("collapseUstensils", ustensilsList, selectListItem);
}

// Fonction pour supprimer les anciennes listes des filtres de recherche
export function removeOldLists() {
  // Supprimer les anciennes listes des filtres de recherche
  const lists = document.querySelectorAll(".accordion-body ul");
  lists.forEach((list) => {
    list.innerHTML = "";
  });
}

// Fonction pour mettre à jour une liste des filtres de recherche avec de nouveaux éléments
export function updateList(id, items, onClickCallback) {
  const accordionBody = document.getElementById(id);
  const listElement = createList(items, onClickCallback);
  accordionBody.querySelector(".accordion-body").appendChild(listElement);
}
