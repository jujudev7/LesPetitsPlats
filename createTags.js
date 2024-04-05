// Importer les données des recettes depuis le fichier recipes.js
import { recipes } from "./recipes.js";

// Déclaration de selectedTagsContainer en dehors de la fonction DOMContentLoaded
const selectedTagsContainer = document.createElement("div");
// selectedTagsContainer.classList.add("selected-tags");

const labelsearchTagsContainer = document.querySelector(".labelsearch-tags");

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
      console.log("000000000001: ");
      onClickCallback(li); // Utiliser l'élément li cliqué pour créer le tag sélectionné
    });
    ul.appendChild(li);
  });
  return ul;
}

// Fonction pour déplacer le tag sélectionné au-dessus de la liste des li
function moveTagToTop(selectedTag, index) {
  selectedTagsContainer.appendChild(selectedTag); // Déplacer le tag sélectionné à l'intérieur du conteneur

  // Créer une copie de l'élément sélectionné pour l'ajouter à la balise <div class="labelsearch-tags"></div>
  const selectedTagCopy = selectedTag.cloneNode(true);
  selectedTagCopy.classList.add("selected-tag-copy"); // Ajouter une classe spécifique à la copie du tag
  selectedTagCopy.dataset.index = index; // Ajouter l'index comme attribut de données à la copie du tag

  // Supprimer l'icône fa-circle-xmark de la copie du tag
  const circleIcon = selectedTagCopy.querySelector(".fa-solid.fa-circle-xmark");
  if (circleIcon) {
    circleIcon.remove();
  }

  // Créer l'icône de suppression et l'ajouter à la copie du tag
  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-solid", "fa-xmark");
  deleteIcon.setAttribute("aria-label", "Supprimer l'élément sélectionné");

  // Ajouter l'icône de suppression à la copie du tag
  selectedTagCopy.appendChild(deleteIcon);

  // Ajout d'un écouteur d'événement pour le survol de la souris
  deleteIcon.addEventListener("mouseenter", function () {
    // Changer la classe de l'icône lors du survol
    deleteIcon.classList.replace("fa-xmark", "fa-square-xmark");
  });

  // Ajout d'un écouteur d'événement pour lorsque la souris quitte l'icône
  deleteIcon.addEventListener("mouseleave", function () {
    // Revenir à la classe initiale lorsque la souris quitte
    deleteIcon.classList.replace("fa-square-xmark", "fa-xmark");
  });

  // Ajout d'un écouteur d'événement pour le clic sur .fa-square-xmark
  deleteIcon.addEventListener("click", function (event) {
    event.stopPropagation(); // Empêcher la propagation de l'événement de clic au parent
    const li = selectedTag.liElement; // Récupérer la référence à l'élément li
    // Supprimer la classe "selected-tag" de l'élément li
    li.classList.remove("selected-tag");
    // Supprimer la div container-selected-tag
    selectedTag.remove();
    // Supprimer la copie du tag dans labelsearchTagsContainer en fonction de son index
    const index = li.getAttribute("data-index");
    const selectedTagCopy = labelsearchTagsContainer.querySelector(
      `.selected-tag-copy[data-index="${index}"]`
    );
    if (selectedTagCopy) {
      selectedTagCopy.remove();
    }
    // Réinsérer l'élément li à son emplacement initial dans la liste
    const list = document.querySelector(".list-group");
    list.appendChild(li);
  });

  labelsearchTagsContainer.appendChild(selectedTagCopy); // Ajouter la copie du tag à .labelsearch-tags
}

// Fonction pour fermer les accordions au clic
document.addEventListener("click", function (event) {

  // Empêcher la fermeture de l'accordéon lorsque l'on clique sur un tag
  // if (event.target.classList.contains("container-selected-tag") || event.target.tagName === "I") {
  //   event.stopPropagation();
  //   return;
  // }

  const filtersArea = document.querySelector(".filters");
  const accordionButtons = document.querySelectorAll(".accordion-button");
  accordionButtons.forEach((accordionButton) => {
    // Vérifier si l'accordéon est ouvert et si le clic n'est pas sur l'accordéon lui-même
    if (
      accordionButton.classList.contains("collapsed") === false &&
      !filtersArea.contains(event.target)
    ) {
      // Fermer l'accordéon uniquement s'il est déjà ouvert
      accordionButton.click();
    }
  });
});

// // Créer selectedTagsContainer si ce n'est pas déjà fait
const accordionBody = document.querySelector(".accordion-body");
accordionBody.insertBefore(
  selectedTagsContainer,
  accordionBody.firstElementChild
);

// Déclarer des variables globales pour stocker les références aux conteneurs de tags sélectionnés
let ingredientsSelectedTagsContainer;
let appliancesSelectedTagsContainer;
let ustensilsSelectedTagsContainer;

document.addEventListener("DOMContentLoaded", function () {
  // Créer des conteneurs spécifiques pour chaque catégorie
  ingredientsSelectedTagsContainer = document.createElement("div");
  ingredientsSelectedTagsContainer.classList.add(
    "selected-tags",
    "ingredients-selected-tags"
  ); // Ajouter la classe spécifique pour les ingrédients

  appliancesSelectedTagsContainer = document.createElement("div");
  appliancesSelectedTagsContainer.classList.add(
    "selected-tags",
    "appliances-selected-tags"
  ); // Ajouter la classe spécifique pour les appareils

  ustensilsSelectedTagsContainer = document.createElement("div");
  ustensilsSelectedTagsContainer.classList.add(
    "selected-tags",
    "ustensils-selected-tags"
  ); // Ajouter la classe spécifique pour les ustensiles

  // Ajouter les conteneurs spécifiques à leurs accords respectifs
  const ingredientsAccordionBody = document.getElementById(
    "collapseIngredients"
  );
  ingredientsAccordionBody
    .querySelector(".accordion-body")
    .appendChild(ingredientsSelectedTagsContainer);

  const appliancesAccordionBody = document.getElementById("collapseAppliances");
  appliancesAccordionBody
    .querySelector(".accordion-body")
    .appendChild(appliancesSelectedTagsContainer);

  const ustensilsAccordionBody = document.getElementById("collapseUstensils");
  ustensilsAccordionBody
    .querySelector(".accordion-body")
    .appendChild(ustensilsSelectedTagsContainer);

  // Récupérer tous les éléments li de la liste et leur attacher un événement de clic
  const listItems = document.querySelectorAll(".list-group-item");
  listItems.forEach((item) => {
    if (!item.classList.contains("selected-tag")) {
      item.addEventListener("click", function () {
        selectListItem(item);
      });
    }
  });

  // Créer la liste des ingrédients
  const ingredientsList = recipes.reduce((acc, recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      if (!acc.includes(ingredient.ingredient)) {
        acc.push(ingredient.ingredient);
      }
    });
    return acc;
  }, []);
  const ingredientsListElement = createList(ingredientsList, selectListItem);
  ingredientsListElement.querySelectorAll("li").forEach(li => {
    li.setAttribute("data-category", "ingredient");
  });
  ingredientsAccordionBody
    .querySelector(".accordion-body")
    .appendChild(ingredientsListElement);

  // Créer la liste des appareils
  const appliancesList = recipes.reduce((acc, recipe) => {
    if (!acc.includes(recipe.appliance)) {
      acc.push(recipe.appliance);
    }
    return acc;
  }, []);
  const appliancesListElement = createList(appliancesList, selectListItem);
  appliancesListElement.querySelectorAll("li").forEach(li => {
    li.setAttribute("data-category", "appliance");
  });
  appliancesAccordionBody
    .querySelector(".accordion-body")
    .appendChild(appliancesListElement);

  // Créer la liste des ustensiles
  const ustensilsList = recipes.reduce((acc, recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      if (!acc.includes(ustensil)) {
        acc.push(ustensil);
      }
    });
    return acc;
  }, []);
  const ustensilsListElement = createList(ustensilsList, selectListItem);
  ustensilsListElement.querySelectorAll("li").forEach(li => {
    li.setAttribute("data-category", "ustensil");
  });
  ustensilsAccordionBody
    .querySelector(".accordion-body")
    .appendChild(ustensilsListElement);

  // Récupérer les tags déjà sélectionnés et les ajouter en haut de la liste
  const selectedTags = document.querySelectorAll(".selected-tag");
  selectedTags.forEach((tag) => {
    const category = tag.getAttribute("data-category");
    switch (category) {
      case "ingredient":
        ingredientsSelectedTagsContainer.appendChild(tag);
        break;
      case "appliance":
        appliancesSelectedTagsContainer.appendChild(tag);
        break;
      case "ustensil":
        ustensilsSelectedTagsContainer.appendChild(tag);
        break;
      default:
        // Cas par défaut, ajout à selectedTagsContainer
        selectedTagsContainer.appendChild(tag);
        break;
    }

    // Créer une copie de l'élément sélectionné pour l'ajouter à la balise <div class="labelsearch-tags"></div>
    const tagCopy = tag.cloneNode(true);
    labelsearchTagsContainer.appendChild(tagCopy);
  });

  // Appel de la fonction selectListItem pour les éléments déjà présents
  selectedTags.forEach((tag) => {
    selectListItem(tag);
  });
});

export const selectListItem = function (li) {
  const containerSelectedTag = document.createElement("div");
  containerSelectedTag.classList.add("container-selected-tag");

  containerSelectedTag.appendChild(li); // Ajouter le tag sélectionné à containerSelectedTag

  // Stocker une référence à l'élément li en tant que propriété de containerSelectedTag
  containerSelectedTag.liElement = li;
  const category = li.getAttribute("data-category");

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
      // Supprimer la copie du tag dans labelsearchTagsContainer en fonction de son index
      const index = li.getAttribute("data-index");
      const selectedTagCopy = labelsearchTagsContainer.querySelector(
        `.selected-tag-copy[data-index="${index}"]`
      );
      if (selectedTagCopy) {
        selectedTagCopy.remove();
      }
      // Réinsérer l'élément li à son emplacement initial dans la liste
      const list = document.querySelector(".list-group");
      list.appendChild(li);
    });

    // Ajouter l'icône et l'élément li au container-selected-tag
    containerSelectedTag.appendChild(li);
    containerSelectedTag.appendChild(icon);

    // Déplacer le tag sélectionné vers le bon conteneur en fonction de la catégorie
    switch (category) {
      case "ingredient":
        ingredientsSelectedTagsContainer.appendChild(containerSelectedTag);
        break;
      case "appliance":
        appliancesSelectedTagsContainer.appendChild(containerSelectedTag);
        break;
      case "ustensil":
        ustensilsSelectedTagsContainer.appendChild(containerSelectedTag);
        break;
      default:
        selectedTagsContainer.appendChild(containerSelectedTag);
        break;
    }

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

    // Déplacer le tag sélectionné à l'intérieur de <div class="labelsearch-tags"></div>
    moveTagToTop(containerSelectedTag, li.getAttribute("data-index"));
  }
};
