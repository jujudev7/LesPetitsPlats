// Fonction pour générer les cartes à partir des données de recettes
export function generateRecipeCards(recipes) {
  if (!recipes) {
    console.error("Les données des recettes sont indisponibles.");
    return;
  }

  // Sélection de l'élément parent où ajouter les cartes
  const cardContainer = document.querySelector(
    ".row.row-cols-1.row-cols-md-3.g-4"
  );

  // Effacer le contenu existant du conteneur
  cardContainer.innerHTML = "";

  // Parcourir toutes les recettes
  recipes.forEach((recipe) => {
    // Destructurer les propriétés de chaque recette
    const { id, image, name, ingredients, time, description } = recipe;

    // Limiter la description à 206 caractères
    const truncatedDescription =
      description.length > 206
        ? description.substring(0, 206) + "..."
        : description;

    // Créer un élément div pour la carte
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("col");

    // Construire le contenu de la carte en utilisant les données de la recette actuelle
    cardDiv.innerHTML = `
      <article class="card" id=${id}>
      <img src="../../assets/images/recipes/${image}" class="card-img-top" alt="${name}">
      <div class="cookingTimeContainer">
        <span class="time-badge">${time}min</span>
      </div>
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <h6 class="card-heading">RECETTE</h6>
        <p class="card-description">${truncatedDescription}</p>
        <h6 class="card-heading">INGRÉDIENTS</h6>
        <div class="container">
          <div class="row">
            ${ingredients
              .map(
                (ingredient) => `
                <div class="col-6 p-0 mb-4 d-flex flex-column">
                  <span class="card-ingredient">${ingredient.ingredient}</span>
                  <span class="card-quantity">${
                    ingredient.quantity ? ingredient.quantity : ""
                  }${ingredient.unit ? " " + ingredient.unit : ""}</span>
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

  // Sélectionner l'élément titre de la carte avec id égal à 9
  const titleCardId9 = document.querySelector(".card[id='9'] .card-title");

  // Vérifier si l'élément a été trouvé
  if (titleCardId9) {
    titleCardId9.style.fontSize = "17.8px";
  } else {
    console.log("Aucune carte avec id égal à 9 n'a été trouvée.");
  }

  // Sélectionner l'élément description de la carte avec id égal à 9
  const descriptionCardId14 = document.querySelector(
    ".card[id='14'] .card-description"
  );

  // Vérifier si l'élément a été trouvé
  if (descriptionCardId14) {
    // Limiter la description à 135 caractères
    descriptionCardId14.textContent =
      descriptionCardId14.textContent.length > 135
        ? descriptionCardId14.textContent.substring(0, 135) + "..."
        : descriptionCardId14.textContent;
  } else {
    console.log("Aucune carte avec id égal à 14 n'a été trouvée.");
  }
}