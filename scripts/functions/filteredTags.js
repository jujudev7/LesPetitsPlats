import { recipes } from "../../data/recipes.js";
import { tagSelection } from "./tagSelection.js";

// Sélection de l'élément de la barre de recherche
const searchInput = document.getElementById("principal-search");

// Sélection de l'élément <ul> où les ingrédients seront ajoutés
const ingredientsList = document.querySelector(".list-group-ingredients");

// Sélection de l'élément <ul> où les appareils seront ajoutés
const appliancesList = document.querySelector(".list-group-appliances");

// Sélection de l'élément <ul> où les ustensiles seront ajoutés
const ustensilsList = document.querySelector(".list-group-ustensils");

// Déclaration des ensembles filtrés pour les ingrédients, les appareils et les ustensiles
let filteredIngredients = new Set();
let filteredAppliances = new Set();
let filteredUstensils = new Set();

// Déclaration des tableaux pour stocker les éléments avec leurs identifiants
let ingredientsElements = [];
let appliancesElements = [];
let ustensilsElements = [];

// Déclaration d'un objet pour stocker les identifiants initiaux des tags
let tagIds = {};

// Fonction pour ajouter les ingrédients à la liste
function addIngredientsToList() {
  // Effacer la liste actuelle des ingrédients
  ingredientsList.innerHTML = "";

  // Ajouter chaque ingrédient à la liste
  ingredientsElements.forEach((element) => {
    // Récupérer l'identifiant initial à partir de l'objet tagIds
    const id = tagIds[element.textContent];
    if (id !== undefined) {
      element.id = id;
      ingredientsList.appendChild(element);
    }
  });
}

// Fonction pour ajouter les appareils à la liste
function addAppliancesToList() {
  // Effacer la liste actuelle des appareils
  appliancesList.innerHTML = "";

  // Ajouter chaque appareil à la liste
  appliancesElements.forEach((element) => {
    // Récupérer l'identifiant initial à partir de l'objet tagIds
    const id = tagIds[element.textContent];
    if (id !== undefined) {
      element.id = id;
      appliancesList.appendChild(element);
    }
  });
}

// Fonction pour ajouter les ustensiles à la liste
function addUstensilsToList() {
  // Effacer la liste actuelle des ustensiles
  ustensilsList.innerHTML = "";

  // Ajouter chaque ustensile à la liste
  ustensilsElements.forEach((element) => {
    // Récupérer l'identifiant initial à partir de l'objet tagIds
    const id = tagIds[element.textContent];
    if (id !== undefined) {
      element.id = id;
      ustensilsList.appendChild(element);
    }
  });
}

// Fonction pour formater une chaîne de caractères
function formatString(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Créez une fonction pour vérifier si une recette correspond à la recherche principale
function isRecipeMatchSearch(recipe) {
  const search = searchInput.value.trim().toLowerCase();
  return (
    recipe.name.toLowerCase().includes(search) ||
    recipe.ingredients.some((ingredient) =>
      ingredient.ingredient.toLowerCase().includes(search)
    ) ||
    recipe.description.toLowerCase().includes(search)
  );
}
// Créez une fonction pour filtrer les tags en fonction des recettes correspondantes à la recherche principale
function filterTags() {
  // Réinitialiser les ensembles filtrés
  filteredIngredients.clear();
  filteredAppliances.clear();
  filteredUstensils.clear();

  // Réinitialiser complètement les tableaux d'éléments
  ingredientsElements = [];
  appliancesElements = [];
  ustensilsElements = [];

  recipes.forEach((recipe) => {
    if (isRecipeMatchSearch(recipe)) {
      recipe.ingredients.forEach((ingredient) => {
        const formattedIngredient = formatString(ingredient.ingredient);
        if (!filteredIngredients.has(formattedIngredient)) {
          filteredIngredients.add(formattedIngredient);
          const li = createListItem(formattedIngredient, "ingredient");
          const id =
            tagIds[formattedIngredient] || Object.keys(tagIds).length + 1;
          li.id = id;
          ingredientsElements.push(li);
          // Stocker l'identifiant initial dans l'objet tagIds s'il n'existe pas encore
          if (!tagIds[formattedIngredient]) {
            tagIds[formattedIngredient] = id;
          }
        }
      });

      const formattedAppliance = formatString(recipe.appliance);
      if (!filteredAppliances.has(formattedAppliance)) {
        filteredAppliances.add(formattedAppliance);
        const li = createListItem(formattedAppliance, "appliance");
        const id = tagIds[formattedAppliance] || Object.keys(tagIds).length + 1;
        li.id = id;
        appliancesElements.push(li);
        // Stocker l'identifiant initial dans l'objet tagIds s'il n'existe pas encore
        if (!tagIds[formattedAppliance]) {
          tagIds[formattedAppliance] = id;
        }
      }

      recipe.ustensils.forEach((ustensil) => {
        const formattedUstensil = formatString(ustensil);
        if (!filteredUstensils.has(formattedUstensil)) {
          filteredUstensils.add(formattedUstensil);
          const li = createListItem(formattedUstensil, "ustensil");
          const id =
            tagIds[formattedUstensil] || Object.keys(tagIds).length + 1;
          li.id = id;
          ustensilsElements.push(li);
          // Stocker l'identifiant initial dans l'objet tagIds s'il n'existe pas encore
          if (!tagIds[formattedUstensil]) {
            tagIds[formattedUstensil] = id;
          }
        }
      });
    }
  });

  // Mettre à jour les listes d'ingrédients, d'appareils et d'ustensiles
  addIngredientsToList();
  addAppliancesToList();
  addUstensilsToList();
  tagSelection(); // Appel de la fonction tagSelection après chaque filtrage
}

// Fonction pour créer un élément de liste
function createListItem(text, className) {
  const li = document.createElement("li");
  li.classList.add("list-group-item", className);
  li.textContent = text;
  return li;
}

// Appelez la fonction pour filtrer les tags après chaque recherche principale
searchInput.addEventListener("input", () => {
  filterTags();
  addIngredientsToList();
  addAppliancesToList();
  addUstensilsToList();
  tagSelection(); // Appel de la fonction tagSelection après chaque filtrage
});

// Appelez la fonction initiale pour afficher les tags et la sélection des tags
filterTags();
addIngredientsToList();
addAppliancesToList();
addUstensilsToList();
tagSelection(); // Appel initial de la fonction tagSelection
