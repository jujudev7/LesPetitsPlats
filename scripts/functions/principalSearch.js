import { recipes } from "../../data/recipes.js";
import { generateRecipeCards } from "../factory/cardFactory.js";

// Sélectionner les éléments HTML pertinents
const searchInput = document.getElementById("principal-search");
const searchError = document.querySelector(".error");
const errorText = document.querySelector(".error-text");
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
  const selectedButtons = document.querySelectorAll(
    ".labels-search-selected button"
  );

  // Parcourir tous les boutons contenant des tags sélectionnés
  selectedButtons.forEach((button) => {
    // Récupérer tous les li enfants du bouton
    const liElements = button.querySelectorAll("li");

    // Vérifier si tous les li sont vides
    const allLiEmpty = Array.from(liElements).every(
      (li) => li.textContent.trim() === ""
    );

    if (allLiEmpty) {
      // Si tous les li sont vides, supprimer le bouton
      button.remove();
    } else {
      // Sinon, vérifier si au moins un tag est pertinent
      const hasMatchingTag = Array.from(liElements).some((li) => {
        const tagName = li.textContent.trim().toLowerCase();
        return filteredRecipes.some((recipe) => {
          return (
            recipe.ingredients.some(
              (ingredient) => ingredient.ingredient.toLowerCase() === tagName
            ) ||
            recipe.appliance.toLowerCase() === tagName ||
            recipe.utensils.some((utensil) => utensil.toLowerCase() === tagName)
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
        recipe.ingredients.some(
          (ingredient) => ingredient.ingredient.toLowerCase() === tagName
        ) ||
        recipe.appliance.toLowerCase() === tagName ||
        recipe.utensils.some((utensil) => utensil.toLowerCase() === tagName)
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

// Écouter les changements dans la barre de recherche principale
searchInput.addEventListener("input", (event) => {
  const search = event.target.value.trim();
  displayMatchingRecipes(search);
});

// Sélectionner tous les tags dans la liste .labels-search-selected
const selectedTags = document.querySelectorAll(
  ".labels-search-selected button"
);

// Ajouter un gestionnaire d'événements clic à chaque tag
selectedTags.forEach((tag) => {
  tag.addEventListener("click", function (event) {
    // Extraire le texte du tag cliqué
    const tagName = event.target.textContent.trim().toLowerCase();

    // Filtrer les recettes en fonction du tag sélectionné
    const filteredRecipes = recipes.filter((recipe) => {
      return (
        recipe.ingredients.some(
          (ingredient) => ingredient.ingredient.toLowerCase() === tagName
        ) ||
        recipe.appliance.toLowerCase() === tagName ||
        recipe.utensils.some((utensil) => utensil.toLowerCase() === tagName)
      );
    });

    // Afficher les recettes correspondantes
    generateRecipeCards(filteredRecipes);
    updateRecipeCount(filteredRecipes.length);
  });
});

// Fonction pour mettre à jour les tags sélectionnés en fonction des résultats de la recherche principale
function updateSelectedTagsOnSearch(filteredRecipes) {
  // Récupérer tous les boutons contenant des tags sélectionnés actuellement
  const selectedButtons = document.querySelectorAll(
    ".labels-search-selected button"
  );

  // Créer un ensemble pour stocker les tags pertinents
  const relevantTags = new Set();

  // Parcourir tous les boutons contenant des tags sélectionnés
  selectedButtons.forEach((button) => {
    // Récupérer tous les li enfants du bouton
    const liElements = button.querySelectorAll("li");

    // Récupérer les tags sélectionnés pour ce bouton
    const selectedTags = Array.from(liElements).map((li) =>
      li.textContent.trim().toLowerCase()
    );

    // Vérifier si au moins un tag sélectionné apparaît dans au moins une recette
    const atLeastOneTagMatch = selectedTags.some((tagName) =>
      filteredRecipes.some(
        (recipe) =>
          recipe.ingredients.some(
            (ingredient) => ingredient.ingredient.toLowerCase() === tagName
          ) ||
          recipe.appliance.toLowerCase() === tagName ||
          recipe.utensils.some((utensil) => utensil.toLowerCase() === tagName)
      )
    );

    // Si au moins un tag sélectionné apparaît dans au moins une recette, conserver les tags
    if (atLeastOneTagMatch) {
      selectedTags.forEach((tag) => relevantTags.add(tag));
    }
  });

  // Supprimer les tags qui ne sont plus pertinents
  selectedButtons.forEach((button) => {
    // Récupérer tous les li enfants du bouton
    const liElements = button.querySelectorAll("li");

    // Récupérer les tags sélectionnés pour ce bouton
    const selectedTags = Array.from(liElements).map((li) =>
      li.textContent.trim().toLowerCase()
    );

    // Si un tag n'est pas pertinent, le supprimer
    selectedTags.forEach((tag) => {
      if (!relevantTags.has(tag)) {
        button.remove();
      }
    });
  });
}

// Déclarer une variable globale pour suivre l'état de l'affichage du message d'erreur
let errorMessageDisplayed = false;

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
  let matchingRecipes = filterRecipes(search);

  // Mettre à jour les tags sélectionnés en fonction des recettes filtrées
  updateSelectedTagsOnSearch(matchingRecipes);

  // Si des tags sont sélectionnés, filtrer les recettes en conséquence
  const selectedTags = document.querySelectorAll(
    ".labels-search-selected button"
  );
  selectedTags.forEach((tag) => {
    const tagName = tag.textContent.trim().toLowerCase();

    matchingRecipes = matchingRecipes.filter((recipe) => {
      return (
        recipe.ingredients.some(
          (ingredient) => ingredient.ingredient.toLowerCase() === tagName
        ) ||
        recipe.appliance.toLowerCase() === tagName ||
        recipe.utensils.some((utensil) => utensil.toLowerCase() === tagName)
      );
    });
  });

  // Mettre à jour les tags sélectionnés en fonction des recettes filtrées
  updateSelectedTags(matchingRecipes);

  if (matchingRecipes.length === 0) {
    // Vérifier si le message d'erreur n'a pas déjà été affiché
    searchError.style.display = "block";
    searchError.style.color = "red";
    searchError.textContent =
      "Désolé, il n'y a pas de recette pour votre recherche. Recommencez svp.";
    if (!errorMessageDisplayed) {
      errorText.style.display = "block";
      errorText.innerHTML = `Aucune recette ne contient « <strong><span style="color: red;">${search}</span></strong> ». Vous pouvez chercher «
    tarte aux pommes », « poisson », etc.`;
      const cards = document.querySelector(".cards");

      cards.appendChild(errorText);
      // Mettre à jour la variable pour indiquer que le message d'erreur est affiché
      errorMessageDisplayed = true;
    }

    // Effacer le contenu du conteneur de cartes
    const cardContainer = document.querySelector(
      ".row.row-cols-1.row-cols-md-3.g-4"
    );
    cardContainer.innerHTML = "";
    updateRecipeCount(matchingRecipes.length);
  } else {
    searchError.style.display = "none";
    errorText.style.display = "none";

    // Réinitialiser la variable pour indiquer que le message d'erreur n'est plus affiché
    errorMessageDisplayed = false;

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
