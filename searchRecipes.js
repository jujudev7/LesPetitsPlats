// Importer les données de recettes depuis le fichier JavaScript
import { recipes } from "./recipes.js";
// Importer la fonction createRecipeCard depuis le fichier JavaScript recipeCard.js
import { createRecipeCard } from "./createRecipeCard.js";

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
  //   const resultsContainer = document.querySelector(".results");
  const cardsContainer = document.querySelector(".grid-cards");

  // Supprimer les résultats précédents
  cardsContainer.innerHTML = "";

  if (recipes.length === 0) {
    error.textContent = "0 résultat";
  } else {
    error.textContent = "";
    recipes.forEach((recipe) => {
      // Utiliser la fonction createRecipeCard pour générer la carte de recette
      const recipeCard = createRecipeCard(recipe);
      // Ajouter la carte de recette à l'interface utilisateur
      cardsContainer.appendChild(recipeCard);
    });
  }
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
    } else {
      // Afficher un message d'erreur indiquant qu'il faut saisir au moins 3 caractères
      const error = document.querySelector(".error");
      error.textContent =
        "Veuillez saisir au moins 3 caractères pour commencer la recherche.";
    }
  });
}

// Appel de la fonction principale pour démarrer le processus de recherche
searching();
