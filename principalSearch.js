import { recipes } from "./data/recipes.js";
import { generateRecipeCards } from "./factory/cardFactory.js";
// import { displayAllRecipes } from "./factory/cardFactory.js";

// Sélectionner les éléments HTML pertinents
const searchInput = document.getElementById("principal-search");
const searchError = document.querySelector(".error");
const nbRecipes = document.querySelector(".nb-recipes");

// Fonction pour mettre à jour le nombre de recettes affichées
function updateRecipeCount(count) {
  if (count > 1) {
    nbRecipes.textContent = `${count} recettes`;
  } else {
    nbRecipes.textContent = `${count} recette`;
  }
}

// Fonction pour afficher toutes les recettes
function displayAllRecipes() {
  const allRecipes = recipes;
  generateRecipeCards(allRecipes);
  updateRecipeCount(allRecipes.length); // Mettre à jour le nombre de recettes affichées
}

// Fonction pour filtrer les recettes correspondantes à la recherche
function filterRecipes(search) {
  return recipes.filter((recipe) => {
    // Vérifier si le nom de la recette contient la requête
    if (recipe.name.toLowerCase().includes(search.toLowerCase())) {
      return true;
    }
    // Vérifier si un ingrédient de la recette contient la requête
    const ingredientMatch = recipe.ingredients.some((ingredient) => {
      return ingredient.ingredient.toLowerCase().includes(search.toLowerCase());
    });
    if (ingredientMatch) {
      return true;
    }
    // Vérifier si la description de la recette contient la requête
    if (recipe.description.toLowerCase().includes(search.toLowerCase())) {
      return true;
    }
    return false;
  });
}

// Fonction pour afficher les recettes correspondantes
function displayMatchingRecipes(search) {
  // Effacer les messages d'erreur précédents
  searchError.textContent = "";

  // Vérifier si la longueur de la requête est suffisante
  if (search.length < 3) {
    // Afficher un message d'erreur
    searchError.style.display = "block";
    searchError.style.color = "#7451eb";
    searchError.textContent = "Veuillez saisir au moins 3 caractères svp.";
    return displayAllRecipes(); // Retourner toutes les recettes si la longueur de la recherche est inférieure à 3
  }

  // Effectuer la recherche
  const matchingRecipes = filterRecipes(search);

  if (matchingRecipes.length === 0) {
    searchError.style.display = "block";
    searchError.style.color = "red";
    searchError.textContent =
      "Désolé, il n'y a pas de recette pour votre recherche. Recommencez svp.";

    // Effacer le contenu du conteneur de cartes
    const cardContainer = document.querySelector(
      ".row.row-cols-1.row-cols-md-3.g-4"
    );
    cardContainer.innerHTML = "";
    updateRecipeCount(matchingRecipes.length);
  } else {
    searchError.style.display = "none";
    // Afficher les recettes correspondantes
    console.log(matchingRecipes);
    // Générer les cartes des recettes correspondantes
    generateRecipeCards(matchingRecipes);
    updateRecipeCount(matchingRecipes.length);
  }
}

// Écouter les changements dans la barre de recherche principale
searchInput.addEventListener("input", (event) => {
  const search = event.target.value.trim();
  displayMatchingRecipes(search);
});

// Afficher toutes les recettes au chargement initial de la page
document.addEventListener("DOMContentLoaded", () => {
  displayAllRecipes();
});
