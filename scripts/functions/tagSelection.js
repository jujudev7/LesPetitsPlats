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

export function tagSelection() {
  // Sélection de l'élément .tags-selected
  const tagsSelected = document.querySelector(".tags-selected");

  const ingredientsTagsSelected = document.querySelector(
    ".ingredients-tags-selected"
  );
  const appliancesTagsSelected = document.querySelector(
    ".appliances-tags-selected"
  );
  const ustensilsTagsSelected = document.querySelector(
    ".ustensils-tags-selected"
  );

  // Fonction pour mettre à jour la visibilité de chaque .tags-selected spécifique
  function updateTagsSelectedVisibility(
    ingredientsTagsSelected,
    appliancesTagsSelected,
    ustensilsTagsSelected
  ) {
    // Vérifier si chaque .tags-selected contient des éléments enfants
    if (ingredientsTagsSelected.children.length > 0) {
      ingredientsTagsSelected.style.display = "block"; // Afficher .ingredients-tags-selected s'il y a des éléments enfants
      ingredientsTagsSelected.style.marginBottom = "15px";
    } else {
      console.log("No ingredients tags selected");
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

  // Appeler la fonction initiale pour mettre à jour la visibilité de chaque .tags-selected spécifique
  updateTagsSelectedVisibility(
    ingredientsTagsSelected,
    appliancesTagsSelected,
    ustensilsTagsSelected
  );

  // Fonction pour gérer le clic sur un élément <li> dans .list-group
  function handleListItemClick(event) {
    const clickedItem = event.target;

    // Trouver l'accordéon parent
    const accordion = clickedItem.closest(".accordion");

    // Récupérer la classe spécifique de la liste en fonction de l'accordéon parent
    let specificClass;
    if (accordion.id === "accordionIngredients") {
      specificClass = "ingredients-tags-selected";
    } else if (accordion.id === "accordionAppliances") {
      specificClass = "appliances-tags-selected";
    } else if (accordion.id === "accordionUstensils") {
      specificClass = "ustensils-tags-selected";
    }

    // Ajouter la copie de l'élément <li> à la liste .tags-selected spécifique
    addTagToSelectedList(clickedItem, specificClass);

    // Supprimer temporairement l'élément <li> de .list-group
    clickedItem.style.display = "none";

    // Appeler la fonction initiale pour mettre à jour la visibilité de chaque .tags-selected spécifique
    updateTagsSelectedVisibility(
      ingredientsTagsSelected,
      appliancesTagsSelected,
      ustensilsTagsSelected
    );
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
      tagsSelected.removeChild(clickedItemCopy);
      // Réafficher l'élément <li> dans .list-group après sa suppression dans .tags-selected
      clickedItem.style.display = "block";

      updateTagsSelectedVisibility(
        ingredientsTagsSelected,
        appliancesTagsSelected,
        ustensilsTagsSelected
      );
    });

    // Ajouter l'icône de suppression à la liste .tags-selected
    clickedItemCopy.appendChild(deleteIcon);

    // Ajouter la copie de l'élément <li>  à la liste .tags-selected
    tagsSelected.appendChild(clickedItemCopy);
  }

  // Sélectionner tous les éléments <li> dans les listes d'ingrédients, d'appareils et d'ustensiles
  const allListItems = document.querySelectorAll(".list-group-item");

  // Ajouter un gestionnaire d'événements clic à chaque élément <li> dans .list-group
  allListItems.forEach((listItem) => {
    listItem.addEventListener("click", handleListItemClick);
  });

  // Sélectionner tous les éléments <li> dans .tags-selected
  const tagsSelectedItems = document.querySelectorAll(
    ".tags-selected .list-group-item"
  );

  // Ajouter un gestionnaire d'événements clic à chaque élément <li> dans .tags-selected
  tagsSelectedItems.forEach((tagItem) => {
    tagItem.addEventListener("click", handleTagClick);
  });
}
