// Importer les données de recettes depuis le fichier recipes.js
import { recipes } from "./recipes.js";
import { initializeSearching } from "./eventInitialization.js";

// Référence à toutes les recettes
export const allRecipes = recipes;

// Fonction pour rechercher les recettes correspondant à la recherche de l'utilisateur
export function searchRecipes(search) {
  // Convertir la recherche en minuscules pour une correspondance insensible à la casse
  const searchLowercase = search.toLowerCase();

  // Filtrer les recettes en fonction de la recherche
  return recipes.filter((recipe) => {
    // Vérifier si le nom de la recette correspond à la recherche
    if (recipe.name.toLowerCase().includes(searchLowercase)) {
      return true;
    }
    // Vérifier si un ingrédient de la recette correspond à la recherche
    for (const ingredient of recipe.ingredients) {
      if (ingredient.ingredient.toLowerCase().includes(searchLowercase)) {
        return true;
      }
    }
    // Vérifier si la description de la recette correspond à la recherche
    if (recipe.description.toLowerCase().includes(searchLowercase)) {
      return true;
    }
    // Aucune correspondance trouvée pour cette recette
    return false;
  });
}

// Fonction pour récupérer les ingrédients uniques des recettes restantes
export function getUniqueIngredients(recipes) {
  const ingredients = new Set();
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      ingredients.add(ingredient.ingredient);
    });
  });
  const uniqueIngredients = Array.from(ingredients);
  console.log("Ingrédients uniques :", uniqueIngredients); // Ajout du console.log pour afficher les ingrédients uniques
  return uniqueIngredients;
}

// Fonction pour récupérer les appareils uniques des recettes restantes
export function getUniqueAppliances(recipes) {
  const appliances = new Set();
  recipes.forEach((recipe) => {
    appliances.add(recipe.appliance);
  });
  const uniqueAppliances = Array.from(appliances);
  console.log("Appareils uniques :", uniqueAppliances); // Ajout du console.log pour afficher les appareils uniques
  return uniqueAppliances;
}

// Fonction pour récupérer les ustensiles uniques des recettes restantes
export function getUniqueUstensils(recipes) {
  const ustensils = new Set();
  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      ustensils.add(ustensil);
    });
  });
  const uniqueUstensils = Array.from(ustensils);
  console.log("Ustensiles uniques :", uniqueUstensils); // Ajout du console.log pour afficher les ustensiles uniques
  return uniqueUstensils;
}

initializeSearching();
