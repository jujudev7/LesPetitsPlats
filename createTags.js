// Importer les données des recettes depuis le fichier recipes.js
import { recipes } from "./recipes.js";

// Déclaration de selectedTagsContainer en dehors de la fonction DOMContentLoaded
const selectedTagsContainer = document.createElement("div");
selectedTagsContainer.classList.add("selected-tags");

export const selectListItem = function (li) {
  const containerSelectedTag = document.createElement("div");
  containerSelectedTag.classList.add("container-selected-tag");
  // Vérifier si l'élément est déjà sélectionné
  if (!li.classList.contains("selected-tag")) {
    // Ajouter la classe "selected-tag" à l'élément li
    li.classList.add("selected-tag");

    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-circle-xmark");
    icon.setAttribute("aria-label", "Supprimer l'élément sélectionné");
    icon.style.visibility = "hidden";

    // Ajouter l'événement de clic à l'icône pour supprimer l'élément sélectionné
    icon.addEventListener("click", function (event) {
      event.stopPropagation(); // Empêcher la propagation de l'événement de clic au parent
      // Supprimer la classe "selected-tag" de l'élément li
      li.classList.remove("selected-tag");
      // Supprimer la div container-selected-tag
      containerSelectedTag.remove();
      // Réinsérer l'élément li à son emplacement initial dans la liste
      const list = document.querySelector(".list-group");
      list.appendChild(li);
    });

    // Ajouter l'icône et l'élément li au container-selected-tag
    containerSelectedTag.appendChild(li);
    containerSelectedTag.appendChild(icon);

    // Ajouter le container-selected-tag au conteneur de tags sélectionnés
    selectedTagsContainer.appendChild(containerSelectedTag);

    // Ajouter l'événement de survol pour afficher l'icône
    containerSelectedTag.addEventListener("mouseover", function () {
      // Rendre l'icône visible lorsque survolé
      icon.style.visibility = "visible";
    });

    // Ajouter l'événement pour masquer l'icône lorsque le survol se termine
    containerSelectedTag.addEventListener("mouseout", function () {
      // Rendre l'icône invisible lorsque le survol se termine
      icon.style.visibility = "hidden";
    });
  }
};

export function createList(items, onClickCallback) {
  const ul = document.createElement("ul");
  ul.classList.add("list-group");
  items.forEach((item, index) => {
    // Convertir le premier caractère en majuscule
    const capitalizedItem = item.charAt(0).toUpperCase() + item.slice(1);
    // Ajouter l'index comme identifiant unique
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.textContent = capitalizedItem;
    li.setAttribute("data-index", index); // Ajouter l'index comme attribut
    li.addEventListener("click", function () {
      onClickCallback(li); // Utiliser l'élément li cliqué pour créer le tag sélectionné
    });
    ul.appendChild(li);
  });
  return ul;
}

document.addEventListener("DOMContentLoaded", function () {
  // Créer selectedTagsContainer si ce n'est pas déjà fait
  const accordionBody = document.querySelector(".accordion-body");
  accordionBody.insertBefore(
    selectedTagsContainer,
    accordionBody.firstElementChild
  );

  // Récupérer tous les éléments li de la liste et leur attacher un événement de clic
  const listItems = document.querySelectorAll(".list-group-item");
  listItems.forEach((item) => {
    if (!item.classList.contains("selected-tag")) {
      item.addEventListener("click", function () {
        selectListItem(item);
      });
    }
  });

  const ingredientsAccordionBody = document.getElementById(
    "collapseIngredients"
  );
  const appliancesAccordionBody = document.getElementById("collapseAppliances");
  const ustensilsAccordionBody = document.getElementById("collapseUtensils");

  const ingredientsList = recipes.reduce((acc, recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      if (!acc.includes(ingredient.ingredient)) {
        acc.push(ingredient.ingredient);
      }
    });
    return acc;
  }, []);
  const ingredientsListElement = createList(ingredientsList, selectListItem);
  ingredientsAccordionBody
    .querySelector(".accordion-body")
    .appendChild(ingredientsListElement);

  const appliancesList = recipes.reduce((acc, recipe) => {
    if (!acc.includes(recipe.appliance)) {
      acc.push(recipe.appliance);
    }
    return acc;
  }, []);
  const appliancesListElement = createList(appliancesList, selectListItem);
  appliancesAccordionBody
    .querySelector(".accordion-body")
    .appendChild(appliancesListElement);

  const ustensilsList = recipes.reduce((acc, recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      if (!acc.includes(ustensil)) {
        acc.push(ustensil);
      }
    });
    return acc;
  }, []);
  const ustensilsListElement = createList(ustensilsList, selectListItem);
  ustensilsAccordionBody
    .querySelector(".accordion-body")
    .appendChild(ustensilsListElement);

  // Fonction pour déplacer le tag sélectionné au-dessus de la liste des li
  function moveTagToTop(selectedTag) {
    selectedTagsContainer.appendChild(selectedTag); // Déplacer le tag sélectionné à l'intérieur du conteneur
  }

  // Fonction pour gérer le clic sur un tag sélectionné
  const handleTagClick = function (selectedTag) {
    moveTagToTop(selectedTag);
  };

  // Récupérer les tags déjà sélectionnés et les ajouter en haut de la liste
  const selectedTags = document.querySelectorAll(".selected-tag");
  selectedTags.forEach((tag) => {
    selectedTagsContainer.appendChild(tag);
  });
});
