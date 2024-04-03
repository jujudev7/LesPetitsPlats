// Importer les données des recettes depuis le fichier recipes.js
import { recipes } from "./recipes.js";
import {
  searchIngredients,
  searchAppliances,
  searchUstensils,
} from "./searchFunctions.js";

// Déclaration de selectedTagsContainer en dehors de la fonction DOMContentLoaded
const selectedTagsContainer = document.createElement("div");
selectedTagsContainer.classList.add("selected-tags");

const labelsearchTagsContainer = document.querySelector(".labelsearch-tags");

export const selectListItem = function (li) {
  const containerSelectedTag = document.createElement("div");
  containerSelectedTag.classList.add("container-selected-tag");

  // Stocker une référence à l'élément li en tant que propriété de containerSelectedTag
  containerSelectedTag.liElement = li;
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

    // Déplacer le tag sélectionné à l'intérieur de <div class="labelsearch-tags"></div>
    moveTagToTop(containerSelectedTag, li.getAttribute("data-index"));
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

document.addEventListener("click", function (event) {
  const filtersArea = document.querySelector(".filters");
  const accordionButtons = document.querySelectorAll(".accordion-button");
  accordionButtons.forEach(accordionButton => {
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

  // Fonction pour gérer le clic sur un tag sélectionné
  const handleTagClick = function (selectedTag) {
    moveTagToTop(selectedTag);
  };

  // Récupérer les tags déjà sélectionnés et les ajouter en haut de la liste
  const selectedTags = document.querySelectorAll(".selected-tag");
  selectedTags.forEach((tag) => {
    selectedTagsContainer.appendChild(tag);

    // Créer une copie de l'élément sélectionné pour l'ajouter à la balise <div class="labelsearch-tags"></div>
    const tagCopy = tag.cloneNode(true);
    labelsearchTagsContainer.appendChild(tagCopy);
  });
});

// // Fonction principale pour exécuter l'algorithme de recherche
// function searchingTags() {
//   // Sélection des éléments input de recherche pour chaque catégorie
//   const searchInputIngredients = document.getElementById(
//     "search-input-ingredients"
//   );
//   const searchInputAppliances = document.getElementById(
//     "search-input-appliances"
//   );
//   const searchInputUstensils = document.getElementById(
//     "search-input-ustensils"
//   );

//   // Ajout d'écouteurs d'événements 'input' pour détecter les changements dans la valeur des inputs de recherche
//   searchInputIngredients.addEventListener("input", async function (event) {
//     const search = event.target.value.trim();
//     const filteredIngredients = searchIngredients(search, ingredientsList);
//     // Mettre à jour l'interface avec les ingrédients filtrés
//     updateInterface(filteredIngredients);
//   });

//   searchInputAppliances.addEventListener("input", async function (event) {
//     const search = event.target.value.trim();
//     const filteredAppliances = searchAppliances(search, appliancesList);
//     // Mettre à jour l'interface avec les appareils filtrés
//     updateInterface(filteredAppliances);
//   });

//   searchInputUstensils.addEventListener("input", async function (event) {
//     const search = event.target.value.trim();
//     const filteredUstensils = searchUstensils(search, ustensilsList);
//     // Mettre à jour l'interface avec les ustensiles filtrés
//     updateInterface(filteredUstensils);
//   });
// }

// // Appel de la fonction principale pour démarrer le processus de recherche
// searchingTags();
