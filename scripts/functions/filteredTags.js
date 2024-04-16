import { recipes } from "../../data/recipes.js";
import { handleListItemClick } from "./tagSelection.js";

// Sélection des éléments .tags-selected sépcifiques + labelsearch
const ingredientsTagsSelected = document.querySelector(
  ".ingredients-tags-selected"
);
const appliancesTagsSelected = document.querySelector(
  ".appliances-tags-selected"
);
const ustensilsTagsSelected = document.querySelector(
  ".ustensils-tags-selected"
);

const labelsSearchSelected = document.querySelector(".labels-search-selected");

// Fonction pour mettre à jour la visibilité de chaque .tags-selected spécifique
function updateTagsSelectedVisibility() {
  // Vérifier si chaque .tags-selected contient des éléments enfants
  if (ingredientsTagsSelected.children.length > 0) {
    ingredientsTagsSelected.style.display = "block"; // Afficher .ingredients-tags-selected s'il y a des éléments enfants
    ingredientsTagsSelected.style.marginBottom = "15px";
  } else {
    // console.log("No ingredients tags selected");
    ingredientsTagsSelected.style.display = "none"; // Cacher .ingredients-tags-selected s'il n'y a pas d'éléments enfants
    ingredientsTagsSelected.style.marginBottom = "0px";
  }

  if (appliancesTagsSelected.children.length > 0) {
    appliancesTagsSelected.style.display = "block"; // Afficher .appliances-tags-selected s'il y a des éléments enfants
    appliancesTagsSelected.style.marginBottom = "15px";
  } else {
    appliancesTagsSelected.style.display = "none"; // Cacher .appliances-tags-selected s'il n'y a pas d'éléments enfants
    appliancesTagsSelected.style.marginBottom = "0px";
  }

  if (ustensilsTagsSelected.children.length > 0) {
    ustensilsTagsSelected.style.display = "block"; // Afficher .ustensils-tags-selected s'il y a des éléments enfants
    ustensilsTagsSelected.style.marginBottom = "15px";
  } else {
    ustensilsTagsSelected.style.display = "none"; // Cacher .ustensils-tags-selected s'il n'y a pas d'éléments enfants
    ustensilsTagsSelected.style.marginBottom = "0px";
  }
}

// Déclaration et initialisation de labelSearchVisibilityState
let labelSearchVisibilityState = true;

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

// Créer une fonction pour vérifier si une recette correspond à la recherche principale
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
// Créer une fonction pour filtrer les tags en fonction des recettes correspondantes à la recherche principale
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
}

// Fonction pour créer un élément de liste avec un gestionnaire d'événements clic attaché
function createListItem(text, className) {
  const li = document.createElement("li");
  li.classList.add("list-group-item", className);
  li.textContent = text;

  // Ajouter un gestionnaire d'événements clic
  li.addEventListener("click", function (event) {
    handleListItemClick(event); // Appeler la fonction de gestion du clic
  });

  return li;
}

// Appeler la fonction pour filtrer les tags après chaque recherche principale
searchInput.addEventListener("input", () => {
  filterTags();
  addIngredientsToList();
  addAppliancesToList();
  addUstensilsToList();
});

// Sélection des éléments des champs de recherche spécifiques à chaque accordion
const ingredientsSearchInput = document.getElementById("ingredients-search");
const appliancesSearchInput = document.getElementById("appliances-search");
const ustensilsSearchInput = document.getElementById("ustensils-search");

const labelSearch = document.querySelector(".labels-search-selected");

// Fonction pour restaurer l'état de visibilité de labelSearch
function restoreLabelsSearchVisibility() {
  // const labelSearch = document.querySelector(".labels-search-selected");
  if (labelSearchVisibilityState) {
    labelSearch.style.display = "block";
  } else {
    labelSearch.style.display = "none";
  }
}

// Fonction pour mettre à jour la visibilité de .labels-search-selected en fonction du nombre d'éléments enfants
export function updateLabelsSearchVisibility() {
  const labelSearch = document.querySelector(".labels-search-selected");
  const ingredientsTagsSelected = document.querySelector(
    ".ingredients-tags-selected"
  );
  const appliancesTagsSelected = document.querySelector(
    ".appliances-tags-selected"
  );
  const ustensilsTagsSelected = document.querySelector(
    ".ustensils-tags-selected"
  );

  const hasIngredientsSelection = ingredientsTagsSelected.children.length > 0;
  const hasAppliancesSelection = appliancesTagsSelected.children.length > 0;
  const hasUstensilsSelection = ustensilsTagsSelected.children.length > 0;

  // Vérifier si des éléments ont été sélectionnés dans les listes spécifiques
  const hasSelection =
    hasIngredientsSelection || hasAppliancesSelection || hasUstensilsSelection;

  // Vérifier si des tags sont déjà sélectionnés dans .labels-search-selected
  const hasLabelsSearchSelection = labelSearch.children.length > 0;

  console.log(labelSearch.children.length);

  // Afficher ou masquer .labels-search-selected en fonction de la sélection
  if (hasSelection || hasLabelsSearchSelection) {
    labelSearch.style.cssText = "display: block !important"; // Afficher labelsSearchSelected s'il y a des éléments enfants
  } else {
    labelSearch.style.cssText = "display: none !important"; // Cacher labelsSearchSelected s'il n'y a pas d'éléments enfants
  }
}

// Fonction pour filtrer les tags spécifiques à chaque accordion en fonction de la recherche
function filterTagsByAccordion(
  searchInput,
  filteredSet,
  elementsArray,
  elementType
) {
  restoreLabelsSearchVisibility(); // Restaure l'état de visibilité de labelSearch

  // Réinitialiser les ensembles filtrés et les tableaux d'éléments
  filteredSet.clear();
  elementsArray.length = 0;

  const search = searchInput.value.trim().toLowerCase();

  // Réinitialiser les éléments de recherche sélectionnés si l'élément de recherche principal est vide
  if (search === "") {
    labelSearch.classList.remove("labels-search-selected");
    labelSearch.innerHTML = "";
  }

  recipes.forEach((recipe) => {
    if (isRecipeMatchSearch(recipe)) {
      if (elementType === "ingredient") {
        recipe.ingredients.forEach((ingredient) => {
          const formattedIngredient = formatString(
            ingredient.ingredient
          ).toLowerCase();
          if (
            formattedIngredient.includes(search) &&
            !filteredSet.has(formattedIngredient)
          ) {
            filteredSet.add(formattedIngredient);
            const li = createListItem(ingredient.ingredient, elementType);
            const id =
              tagIds[formattedIngredient] || Object.keys(tagIds).length + 1;
            li.id = id;
            elementsArray.push(li);
            if (!tagIds[formattedIngredient]) {
              tagIds[formattedIngredient] = id;
            }
          }
        });
      } else if (elementType === "appliance") {
        const formattedAppliance = formatString(recipe.appliance).toLowerCase();
        if (
          formattedAppliance.includes(search) &&
          !filteredSet.has(formattedAppliance)
        ) {
          filteredSet.add(formattedAppliance);
          const li = createListItem(recipe.appliance, elementType);
          const id =
            tagIds[formattedAppliance] || Object.keys(tagIds).length + 1;
          li.id = id;
          elementsArray.push(li);
          if (!tagIds[formattedAppliance]) {
            tagIds[formattedAppliance] = id;
          }
        }
      } else if (elementType === "ustensil") {
        recipe.ustensils.forEach((ustensil) => {
          const formattedUstensil = formatString(ustensil).toLowerCase();
          if (
            formattedUstensil.includes(search) &&
            !filteredSet.has(formattedUstensil)
          ) {
            filteredSet.add(formattedUstensil);
            const li = createListItem(ustensil, elementType);
            const id =
              tagIds[formattedUstensil] || Object.keys(tagIds).length + 1;
            li.id = id;
            elementsArray.push(li);
            if (!tagIds[formattedUstensil]) {
              tagIds[formattedUstensil] = id;
            }
          }
        });
      }
    }
  });

  // Mettre à jour la liste correspondante avec les éléments filtrés
  if (elementType === "ingredient") {
    addIngredientsToList();
  } else if (elementType === "appliance") {
    addAppliancesToList();
  } else if (elementType === "ustensil") {
    addUstensilsToList();
  }

  // Si des tags sont déjà sélectionnés, maintenir la classe et le contenu de labelSearch
  if (labelSearch.innerHTML.trim() !== "") {
    labelSearch.classList.add("labels-search-selected");
  }

  // Mettre à jour la visibilité de .labels-search-selected après le filtrage
  updateLabelsSearchVisibility();
}

// Ajouter des écouteurs d'événements pour chaque champ de recherche d'accordion
ingredientsSearchInput.addEventListener("input", () => {
  filterTagsByAccordion(
    ingredientsSearchInput,
    filteredIngredients,
    ingredientsElements,
    "ingredient"
  );
  updateLabelsSearchVisibility(); // Ajout de l'appel à updateLabelsSearchVisibility()
});

appliancesSearchInput.addEventListener("input", () => {
  filterTagsByAccordion(
    appliancesSearchInput,
    filteredAppliances,
    appliancesElements,
    "appliance"
  );
  updateLabelsSearchVisibility(); // Ajout de l'appel à updateLabelsSearchVisibility()
});

ustensilsSearchInput.addEventListener("input", () => {
  filterTagsByAccordion(
    ustensilsSearchInput,
    filteredUstensils,
    ustensilsElements,
    "ustensil"
  );
  updateLabelsSearchVisibility(); // Ajout de l'appel à updateLabelsSearchVisibility()
});

// Appeler la fonction initiale pour afficher les tags et la sélection des tags
filterTags();
addIngredientsToList();
addAppliancesToList();
addUstensilsToList();
