import { recipes } from "../../data/recipes.js";
import { generateRecipeCards } from "../factory/cardFactory.js";

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

// Fonction pour mettre à jour les tags sélectionnés en fonction des résultats de la recherche principale
function updateSelectedTags(filteredRecipes) {
  // Récupérer tous les boutons contenant des tags sélectionnés actuellement
  const selectedButtons = document.querySelectorAll(".labels-search-selected button");

  // Parcourir tous les boutons contenant des tags sélectionnés
  selectedButtons.forEach((button) => {
    // Récupérer tous les li enfants du bouton
    const liElements = button.querySelectorAll("li");

    // Vérifier si tous les li sont vides
    const allLiEmpty = Array.from(liElements).every(li => li.textContent.trim() === '');

    if (allLiEmpty) {
      // Si tous les li sont vides, supprimer le bouton
      button.remove();
    } else {
      // Sinon, vérifier si au moins un tag est pertinent
      const hasMatchingTag = Array.from(liElements).some(li => {
        const tagName = li.textContent.trim().toLowerCase();
        return filteredRecipes.some(recipe => {
          return (
            recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === tagName) ||
            recipe.appliance.toLowerCase() === tagName ||
            recipe.ustensils.some(ustensil => ustensil.toLowerCase() === tagName)
          );
        });
      });

      // Si aucun tag n'est pertinent, supprimer le bouton
      if (!hasMatchingTag) {
        button.remove();
      }
    }
  });

  // Récupérer tous les tags non sélectionnés
  const allTags = document.querySelectorAll(".list-group-item");

  // Parcourir tous les tags non sélectionnés
  allTags.forEach((tag) => {
    const tagName = tag.textContent.trim().toLowerCase();

    // Vérifier si le tag est présent dans les recettes filtrées
    const isTagInFilteredRecipes = filteredRecipes.some((recipe) => {
      return (
        recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase() === tagName) ||
        recipe.appliance.toLowerCase() === tagName ||
        recipe.ustensils.some((ustensil) => ustensil.toLowerCase() === tagName)
      );
    });

    if (isTagInFilteredRecipes) {
      // Si le tag est pertinent, rendre le tag visible
      tag.style.display = "block";
    } else {
      // Sinon, cacher le tag
      tag.style.display = "none";
    }
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

    // Mettre à jour les tags sélectionnés en fonction des recettes filtrées
    updateSelectedTags(matchingRecipes);
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
