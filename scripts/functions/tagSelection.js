import { updateLabelsSearchVisibility } from "./filteredTags.js";

// Fermer les accordéons si l'utilisateur clique en dehors de l'élément accordéon
window.addEventListener("click", function (event) {
  const accordions = document.querySelectorAll(".accordion");

  accordions.forEach((accordion) => {
    const isAccordionExpanded = accordion.querySelector(
      ".accordion-collapse.show"
    );
    if (isAccordionExpanded && !accordion.contains(event.target)) {
      const accordionButton = accordion.querySelector(".accordion-button");
      accordionButton.classList.add("collapsed");
      accordionButton.setAttribute("aria-expanded", "false");
      const collapseElement = accordion.querySelector(".accordion-collapse");
      collapseElement.classList.remove("show");
    }
  });
});

// Sélection des éléments .tags-selected sépcifiques + labelsearch
const ingredientsTagsSelected = document.querySelector(
  ".ingredients-tags-selected"
);
const appliancesTagsSelected = document.querySelector(
  ".appliances-tags-selected"
);
const utensilsTagsSelected = document.querySelector(
  ".utensils-tags-selected"
);

const labelsSearchSelected = document.querySelector(".labels-search-selected");

// Fonction pour mettre à jour la visibilité de chaque .tags-selected spécifique
function updateTagsSelectedVisibility(
  ingredientsTagsSelected,
  appliancesTagsSelected,
  utensilsTagsSelected
) {
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

  if (utensilsTagsSelected.children.length > 0) {
    utensilsTagsSelected.style.display = "block"; // Afficher .utensils-tags-selected s'il y a des éléments enfants
    utensilsTagsSelected.style.marginBottom = "15px";
  } else {
    utensilsTagsSelected.style.display = "none"; // Cacher .utensils-tags-selected s'il n'y a pas d'éléments enfants
    utensilsTagsSelected.style.marginBottom = "0px";
  }

  // Vérifier si .labels-search-selected contient des éléments enfants
  if (labelsSearchSelected.children.length > 0) {
    labelsSearchSelected.style.display = "block"; // Afficher .labels-search-selected s'il y a des éléments enfants
  } else {
    labelsSearchSelected.style.display = "none"; // Cacher .labels-search-selected s'il n'y a pas d'éléments enfants
  }
}

// Appeler la fonction initiale pour mettre à jour la visibilité de chaque .tags-selected spécifique
updateTagsSelectedVisibility(
  ingredientsTagsSelected,
  appliancesTagsSelected,
  utensilsTagsSelected
);

// Fonction pour gérer le clic sur un élément <li> dans .list-group
export function handleListItemClick(event) {
  const clickedItem = event.target;
  // console.log("00000000001: ");

  // Trouver l'accordéon parent
  const accordion = clickedItem.closest(".accordion");

  // Récupérer la classe spécifique de la liste en fonction de l'accordéon parent
  let specificClass;
  if (accordion.id === "accordionIngredients") {
    specificClass = "ingredients-tags-selected";
  } else if (accordion.id === "accordionAppliances") {
    specificClass = "appliances-tags-selected";
  } else if (accordion.id === "accordionUtensils") {
    specificClass = "utensils-tags-selected";
  }

   // Vérifier si l'élément cliqué est déjà dans la liste .tags-selected
   const isAlreadySelected = Array.from(labelsSearchSelected.children).find(
    (item) => item.textContent.trim() === clickedItem.textContent.trim()
  );

  if (!isAlreadySelected) {
    // Ajouter le tag à la liste .tags-selected spécifique
    addTagToSelectedList(clickedItem, specificClass);

    // Ajouter le tag à la liste .labels-search-selected
    addTagToLabelsSearch(clickedItem);

    // Supprimer temporairement l'élément <li> de .list-group
    clickedItem.style.display = "none";

    // Appeler la fonction initiale pour mettre à jour la visibilité de chaque .tags-selected spécifique
    updateTagsSelectedVisibility(
      ingredientsTagsSelected,
      appliancesTagsSelected,
      utensilsTagsSelected
    );
    updateLabelsSearchVisibility();
  }
}

// Fonction pour ajouter un tag à la liste .tags-selected spécifique
function addTagToSelectedList(clickedItem, specificClass) {
  const clickedItemCopy = clickedItem.cloneNode(true);
  const tagsSelected = document.querySelector(`.${specificClass}`);

  // Créer l'icône de suppression
  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add(
    "fa-solid",
    "fa-circle-xmark",
    "delete-tag-selected-icon"
  );
  deleteIcon.style.display = "none"; // Initialement caché

  // Ajouter un gestionnaire d'événements clic pour supprimer le tag lorsqu'il est cliqué
  deleteIcon.addEventListener("click", function (event) {
    event.stopPropagation(); // Empêcher la propagation de l'événement clic

    // Supprimer le tag de .tags-selected
    tagsSelected.removeChild(clickedItemCopy);

    // Trouver le tag correspondant dans .labels-search-selected et le supprimer
    const labelSearchItems = document.querySelectorAll(
      ".labels-search-selected .list-group-item"
    );
    labelSearchItems.forEach((item) => {
      if (item.textContent === clickedItem.textContent) {
        item.closest(".labelsearch-selected").remove();
      }
    });

    // Réafficher l'élément <li> dans .list-group après sa suppression dans .tags-selected
    clickedItem.style.display = "block";

    updateTagsSelectedVisibility(
      ingredientsTagsSelected,
      appliancesTagsSelected,
      utensilsTagsSelected
    );

    // updateTagsLabelsVisibility();
    updateLabelsSearchVisibility();
  });

  // Ajouter l'icône de suppression à la liste .tags-selected
  clickedItemCopy.appendChild(deleteIcon);

  // Ajouter la copie de l'élément <li>  à la liste .tags-selected
  tagsSelected.appendChild(clickedItemCopy);

  // Mettre à jour la visibilité des labels
  updateLabelsSearchVisibility();
}

// Fonction pour ajouter un tag à une liste spécifiée avec un bouton
function addTagToLabelsSearch(clickedItem) {
  const labelSearch = document.querySelector(".labels-search-selected");
  const clickedItemCopy = clickedItem.cloneNode(true);

  // Créer le bouton
  const button = document.createElement("button");
  button.type = "button";
  button.classList.add("btn", "labelsearch-selected");

  // Créer l'icône de suppression
  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-solid", "fa-xmark", "delete-labelsearch-icon");
  deleteIcon.setAttribute("aria-hidden", "true");
  deleteIcon.setAttribute("aria-label", "Supprimer l'élément");

  // Ajouter un gestionnaire d'événements clic pour supprimer le tag lorsqu'il est cliqué
  deleteIcon.addEventListener("click", function (event) {
    event.stopPropagation(); // Empêcher la propagation de l'événement clic

    // Supprimer le tag de .labels-search-selected
    labelSearch.removeChild(button);

    // Trouver le tag correspondant dans .tags-selected et le supprimer
    const tagsSelectedItems = document.querySelectorAll(
      ".tags-selected .list-group-item"
    );
    tagsSelectedItems.forEach((item) => {
      if (item.textContent === clickedItem.textContent) {
        item.closest(".tags-selected").removeChild(item);
      }
    });

    // Réafficher l'élément <li> dans .list-group après sa suppression dans .tags-selected
    clickedItem.style.display = "block";

    // Mettre à jour la visibilité des listes
    updateTagsSelectedVisibility(
      ingredientsTagsSelected,
      appliancesTagsSelected,
      utensilsTagsSelected
    );

    // updateTagsLabelsVisibility();
    updateLabelsSearchVisibility();
  });

  // Ajouter le texte du tag et l'icône de suppression au bouton
  button.appendChild(clickedItemCopy);
  button.appendChild(deleteIcon);

  // Ajouter le bouton à la liste spécifiée
  labelSearch.appendChild(button);

  updateLabelsSearchVisibility();
}

// Sélectionner tous les éléments <li> dans les listes d'ingrédients, d'appareils et d'ustensiles
const allListItems = document.querySelectorAll(".list-group-item");

// Ajouter un gestionnaire d'événements clic à chaque élément <li> dans .list-group
allListItems.forEach((listItem) => {
  listItem.addEventListener("click", handleListItemClick);
});

// Appeler la fonction pour mettre à jour la visibilité des labels après l'initialisation des variables
updateLabelsSearchVisibility();
