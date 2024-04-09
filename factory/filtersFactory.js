import { recipes } from "../data/recipes.js";

//////////////////
// INGREDIENTS //
////////////////

// Sélection de l'élément <ul> où les ingrédients seront ajoutés
const ingredientsList = document.querySelector(".list-group-ingredients");

// Fonction pour ajouter les ingrédients à la liste
function addIngredientsToList() {
  // Réinitialiser la liste des ingrédients
  ingredientsList.innerHTML = "";

  // Stocker les noms des ingrédients uniques
  const uniqueIngredients = new Set();

  // Compteur pour générer des identifiants uniques
  let idCounter = 1;

  // Parcourir toutes les recettes
  recipes.forEach((recipe) => {
    // Parcourir tous les ingrédients de chaque recette
    recipe.ingredients.forEach((ingredient) => {
      // Mettre la première lettre en majuscule et le reste en minuscules
      const formattedIngredient =
        ingredient.ingredient.charAt(0).toUpperCase() +
        ingredient.ingredient.slice(1).toLowerCase();

      // Vérifier si l'ingrédient n'a pas déjà été ajouté à la liste
      if (!uniqueIngredients.has(formattedIngredient)) {
        // Ajouter l'ingrédient à l'ensemble des ingrédients uniques
        uniqueIngredients.add(formattedIngredient);

        // Créer un nouvel élément <li> pour chaque ingrédient
        const li = document.createElement("li");
        li.classList.add("list-group-item", "ingredient");
        li.id = idCounter;

        // Incrémenter le compteur d'identifiants
        idCounter++;

        // Ajouter le nom de l'ingrédient à l'élément <li>
        li.textContent = formattedIngredient;

        // Ajouter l'élément <li> à la liste des ingrédients
        ingredientsList.appendChild(li);
      }
    });
  });
}

// Appeler la fonction pour ajouter les ingrédients à la liste
addIngredientsToList();

/////////////////
// APPLIANCES //
///////////////

// Sélection de l'élément <ul> où les appareils seront ajoutés
const appliancesList = document.querySelector(".list-group-appliances");

// Fonction pour ajouter les appareils à la liste
function addAppliancesToList() {
  // Réinitialiser la liste des appareils
  appliancesList.innerHTML = "";

  // Stocker les noms des appareils uniques
  const uniqueAppliances = new Set();

  // Compteur pour générer des identifiants uniques
  let idCounter = 1;

  // Parcourir toutes les recettes
  recipes.forEach((recipe) => {
    // Récupérer l'appareil de la recette en cours
    const appliance = recipe.appliance;

    // Mettre la première lettre en majuscule et le reste en minuscules
    const formattedAppliance =
      appliance.charAt(0).toUpperCase() + appliance.slice(1).toLowerCase();

    // Vérifier si l'appareil n'a pas déjà été ajouté à la liste
    if (!uniqueAppliances.has(formattedAppliance)) {
      // Ajouter l'appareil à l'ensemble des appareils uniques
      uniqueAppliances.add(formattedAppliance);

      // Créer un nouvel élément <li> pour chaque appareil
      const li = document.createElement("li");
      li.classList.add("list-group-item", "appliance");
      li.id = idCounter;

      // Incrémenter le compteur d'identifiants
      idCounter++;

      // Ajouter le nom de l'appareil à l'élément <li>
      li.textContent = formattedAppliance;

      // Ajouter l'élément <li> à la liste des appareils
      appliancesList.appendChild(li);
    }
  });
}

// Appeler la fonction pour ajouter les appareils à la liste
addAppliancesToList();

////////////////
// USTENSILS //
//////////////

// Sélection de l'élément <ul> où les ustensiles seront ajoutés
const ustensilsList = document.querySelector(".list-group-ustensils");

// Fonction pour ajouter les ustensiles à la liste
function addUstensilsToList() {
  // Réinitialiser la liste des ustensiles
  ustensilsList.innerHTML = "";

  // Stocker les noms des ustensiles uniques
  const uniqueUstensils = new Set();

  // Compteur pour générer des identifiants uniques
  let idCounter = 1;

  // Parcourir toutes les recettes
  recipes.forEach((recipe) => {
    // Parcourir tous les ustensiles de chaque recette
    recipe.ustensils.forEach((ustensil) => {
      // Mettre la première lettre en majuscule et le reste en minuscules
      const formattedUstensil =
        ustensil.charAt(0).toUpperCase() + ustensil.slice(1).toLowerCase();

      // Vérifier si l'ustensile n'a pas déjà été ajouté à la liste
      if (!uniqueUstensils.has(formattedUstensil)) {
        // Ajouter l'ustensile à l'ensemble des ustensiles uniques
        uniqueUstensils.add(formattedUstensil);

        // Créer un nouvel élément <li> pour chaque ustensile
        const li = document.createElement("li");
        li.classList.add("list-group-item", "ustensil");
        li.id = idCounter;

        // Incrémenter le compteur d'identifiants
        idCounter++;

        // Ajouter le nom de l'ustensile à l'élément <li>
        li.textContent = formattedUstensil;

        // Ajouter l'élément <li> à la liste des ustensiles
        ustensilsList.appendChild(li);
      }
    });
  });
}

// Appeler la fonction pour ajouter les ustensiles à la liste
addUstensilsToList();

// Fermer les accordéons si l'utilisateur clique en dehors de l'élément accordéon
window.addEventListener("click", function(event) {
    const accordions = document.querySelectorAll(".accordion");

    accordions.forEach(accordion => {
        const isAccordionExpanded = accordion.querySelector(".accordion-collapse.show");
        if (isAccordionExpanded && !accordion.contains(event.target)) {
            const accordionButton = accordion.querySelector(".accordion-button");
            accordionButton.classList.add("collapsed");
            accordionButton.setAttribute("aria-expanded", "false");
            const collapseElement = accordion.querySelector(".accordion-collapse");
            collapseElement.classList.remove("show");
        }
    });
});

