import { recipes } from "../../data/recipes.js";
import { tagSelection } from "./tagSelection.js";

// Déclaration des listes de filtres
let filteredIngredients = new Set();
let filteredAppliances = new Set();
let filteredUstensils = new Set();

// Sélection de l'élément de la barre de recherche
const searchInput = document.getElementById("principal-search");

// Sélection de l'élément <ul> où les ingrédients seront ajoutés
const ingredientsList = document.querySelector(".list-group-ingredients");

// Sélection de l'élément <ul> où les appareils seront ajoutés
const appliancesList = document.querySelector(".list-group-appliances");

// Sélection de l'élément <ul> où les ustensiles seront ajoutés
const ustensilsList = document.querySelector(".list-group-ustensils");

// Fonction pour ajouter les ingrédients à la liste
function addIngredientsToList() {
  // Réinitialiser la liste des ingrédients
  ingredientsList.innerHTML = "";

  // Compteur pour générer des identifiants uniques
  let idCounter = 1;

  // Parcourir les ingrédients filtrés au lieu de toutes les recettes
  filteredIngredients.forEach((ingredient) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item", "ingredient");
    li.id = idCounter++;

    // Ajouter le nom de l'ingrédient à l'élément <li>
    li.textContent = ingredient;

    // Ajouter l'élément <li> à la liste des ingrédients
    ingredientsList.appendChild(li);
  });
}

// Fonction pour ajouter les appareils à la liste
function addAppliancesToList() {
  // Réinitialiser la liste des appareils
  appliancesList.innerHTML = "";

  // Compteur pour générer des identifiants uniques
  let idCounter = 1;

  // Parcourir les appareils filtrés au lieu de toutes les recettes
  filteredAppliances.forEach((appliance) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item", "appliance");
    li.id = idCounter++;

    // Ajouter le nom de l'appareil à l'élément <li>
    li.textContent = appliance;

    // Ajouter l'élément <li> à la liste des appareils
    appliancesList.appendChild(li);
  });
}

// Fonction pour ajouter les ustensiles à la liste
function addUstensilsToList() {
  // Réinitialiser la liste des ustensiles
  ustensilsList.innerHTML = "";

  // Compteur pour générer des identifiants uniques
  let idCounter = 1;

  // Parcourir les ustensiles filtrés au lieu de toutes les recettes
  filteredUstensils.forEach((ustensil) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item", "ustensil");
    li.id = idCounter++;

    // Ajouter le nom de l'ustensile à l'élément <li>
    li.textContent = ustensil;

    // Ajouter l'élément <li> à la liste des ustensiles
    ustensilsList.appendChild(li);
  });
}

// Créez une fonction pour filtrer les tags en fonction des recettes correspondantes à la recherche principale
function filterTags() {
  filteredIngredients.clear();
  filteredAppliances.clear();
  filteredUstensils.clear();

  recipes.forEach((recipe) => {
    if (isRecipeMatchSearch(recipe)) {
      recipe.ingredients.forEach((ingredient) => {
        const formattedIngredient = formatString(ingredient.ingredient);
        filteredIngredients.add(formattedIngredient);
      });

      const formattedAppliance = formatString(recipe.appliance);
      filteredAppliances.add(formattedAppliance);

      recipe.ustensils.forEach((ustensil) => {
        const formattedUstensil = formatString(ustensil);
        filteredUstensils.add(formattedUstensil);
      });
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
  