import { searchRecipes, allRecipes } from './searchRecipes.js';
import { updateInterface } from './uiFunctions.js';

// Fonction principale pour exécuter l'algorithme
export function initializeSearching() {
    // Sélection de l'élément input de recherche principal
    const searchInput = document.getElementById("search-input");
    const recipeCountElement = document.querySelector(".nb-recipes");

    // Afficher le nombre total de recettes au chargement de la page
    recipeCountElement.textContent = `${allRecipes.length} recettes`;

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
          recipeCountElement.textContent = `${recipesFound.length} recettes`;
        } catch (error) {
          console.error("Une erreur est survenue lors de la recherche :", error);
        }
      } else {
        // Si la recherche contient moins de 3 caractères, afficher toutes les recettes
        updateInterface(allRecipes);
        recipeCountElement.textContent = `${allRecipes.length} recettes`;
      }
    });
}

export function initializeSearchingTags() {
  // Sélection des éléments input de recherche pour chaque catégorie
  const searchInputIngredients = document.getElementById(
    "search-input-ingredients"
  );
  const searchInputAppliances = document.getElementById(
    "search-input-appliances"
  );
  const searchInputUstensils = document.getElementById(
    "search-input-ustensils"
  );

  // Ajout d'écouteurs d'événements 'input' pour détecter les changements dans la valeur des inputs de recherche
  searchInputIngredients.addEventListener("input", async function (event) {
    const search = event.target.value.trim();
    const filteredIngredients = searchIngredients(search, ingredientsList);
    // Mettre à jour l'interface avec les ingrédients filtrés
    updateInterface(filteredIngredients);
  });

  searchInputAppliances.addEventListener("input", async function (event) {
    const search = event.target.value.trim();
    const filteredAppliances = searchAppliances(search, appliancesList);
    // Mettre à jour l'interface avec les appareils filtrés
    updateInterface(filteredAppliances);
  });

  searchInputUstensils.addEventListener("input", async function (event) {
    const search = event.target.value.trim();
    const filteredUstensils = searchUstensils(search, ustensilsList);
    // Mettre à jour l'interface avec les ustensiles filtrés
    updateInterface(filteredUstensils);
  });
}
