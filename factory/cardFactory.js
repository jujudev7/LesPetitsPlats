// Importer les données des recettes depuis le fichier recipes.js
import { recipes } from "../data/recipes.js";

// Fonction pour générer les cartes à partir des données de recettes
function generateRecipeCards(recipes) {
  if (!recipes) {
    console.error("Les données des recettes sont indisponibles.");
    return;
  }

  // Sélectionnez l'élément parent où vous souhaitez ajouter les cartes
  const cardContainer = document.querySelector(
    ".row.row-cols-1.row-cols-md-3.g-4"
  );

  // Parcourir toutes les recettes
  recipes.forEach((recipe) => {
    // Destructurer les propriétés de chaque recette
    const {
      id,
      image,
      name,
      ingredients,
      time,
      description,
    } = recipe;

    // Créer un élément div pour la carte
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("col");

    // Construire le contenu de la carte en utilisant les données de la recette actuelle
    cardDiv.innerHTML = `
      <article class="card" data-id=${id}>
      <img src="../../assets/images/recipes/${image}" class="card-img-top" alt="${name}">
      <div class="cookingTimeContainer">
        <span class="time-badge">${time}min</span>
      </div>
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <h6 class="card-heading">RECETTE</h6>
        <p class="card-text">${description}</p>
        <h6 class="card-heading">INGRÉDIENTS</h6>
        <div class="container">
          <div class="row">
            ${ingredients
              .map(
                (ingredient) => `
                <div class="col-6 p-0 mb-4 d-flex flex-column">
                  <span class="card-ingredient">${ingredient.ingredient}</span>
                  <span class="card-quantity">${ingredient.quantity ? ingredient.quantity : ""}${ingredient.unit ? " " + ingredient.unit : ""}</span>
                </div>
              `
              )
              .join("")}
          </div>
        </div>
      </div>
      </article>
    `;

    // Ajouter la carte au conteneur parent
    cardContainer.appendChild(cardDiv);
  });
}

// Appeler la fonction generateRecipeCards pour générer les cartes avec les données des recettes
generateRecipeCards(recipes);

