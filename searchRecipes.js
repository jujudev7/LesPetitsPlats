// Importer les données de recettes depuis le fichier recipes.js
import { recipes } from "./recipes.js";
// Importer la fonction createRecipeCard depuis le fichier recipeCard.js
import { createRecipeCard } from "./createRecipeCard.js";
// Importer les fonctions nécessaires depuis le fichier createTags.js
import { selectListItem } from "./createTags.js";
import { createList } from "./createTags.js";

// Fonction pour rechercher les recettes correspondant à la recherche de l'utilisateur
function searchRecipes(search) {
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

// Fonction pour actualiser l'interface du site avec les recettes trouvées
function updateInterface(recipes) {
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
function updateFilters(recipes) {
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
  updateList("collapseUtensils", ustensilsList, selectListItem);
}

// Fonction pour récupérer les ingrédients uniques des recettes restantes
function getUniqueIngredients(recipes) {
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
function getUniqueAppliances(recipes) {
  const appliances = new Set();
  recipes.forEach((recipe) => {
    appliances.add(recipe.appliance);
  });
  const uniqueAppliances = Array.from(appliances);
  console.log("Appareils uniques :", uniqueAppliances); // Ajout du console.log pour afficher les appareils uniques
  return uniqueAppliances;
}

// Fonction pour récupérer les ustensiles uniques des recettes restantes
function getUniqueUstensils(recipes) {
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


// Fonction pour supprimer les anciennes listes des filtres de recherche
function removeOldLists() {
  // Supprimer les anciennes listes des filtres de recherche
  const lists = document.querySelectorAll(".accordion-body ul");
  lists.forEach(list => {
    list.innerHTML = "";
  });
}

// Fonction pour mettre à jour une liste des filtres de recherche avec de nouveaux éléments
function updateList(id, items, onClickCallback) {
  const accordionBody = document.getElementById(id);
  const listElement = createList(items, onClickCallback);
  accordionBody.querySelector(".accordion-body").appendChild(listElement);
}

// Fonction principale pour exécuter l'algorithme
function searching() {
  // Sélection de l'élément input de recherche principal
  const searchInput = document.getElementById("search-input");

  // Ajout d'un écouteur d'événement 'input' pour détecter les changements dans la valeur de l'input
  searchInput.addEventListener("input", async function (event) {
    // Récupération de la valeur saisie par l'utilisateur
    const search = event.target.value.trim();

    // Utiliser la valeur de "search" pour effectuer une recherche
    console.log("Recherche de l'utilisateur :", search);

    // Si la recherche contient au moins 3 caractères
    if (search.length >= 3) {
      try {
        const recipesFound = await searchRecipes(search);
        updateInterface(recipesFound);
      } catch (error) {
        console.error("Une erreur est survenue lors de la recherche :", error);
      }
    } else if (search.length == 1 || search.length == 2) {
      // Afficher un message d'erreur indiquant qu'il faut saisir au moins 3 caractères
      const error = document.querySelector(".error");
      error.style.display = "block";
      error.textContent =
        "Veuillez saisir au moins 3 caractères pour commencer la recherche.";
    } else {
      // Afficher un message d'erreur indiquant qu'il faut saisir au moins 3 caractères
      const error = document.querySelector(".error");
      error.style.display = "none";
    }
  });
}

// Appel de la fonction principale pour démarrer le processus de recherche
searching();
