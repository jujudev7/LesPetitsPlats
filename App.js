document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("search-input");
    const clearSearchIcon = document.querySelector(".clear-search-icon");
  
    // Fonction pour afficher/cacher l'icône de suppression en fonction du contenu de l'input
    function toggleClearIcon() {
      clearSearchIcon.style.display = searchInput.value ? "inline-block" : "none";
    }
  
    // Ajoutez un gestionnaire d'événement pour l'événement keyup dans l'input
    searchInput.addEventListener("input", toggleClearIcon); // Utilisation de l'événement 'input'
  
    // Ajoutez un gestionnaire d'événement pour l'événement de clic sur l'icône de suppression
    clearSearchIcon.addEventListener("click", function() {
      searchInput.value = ""; // Effacez le contenu de l'input
      toggleClearIcon(); // Réaffichez/cachez l'icône de suppression
    });
  
    // Afficher/cacher l'icône de suppression au chargement de la page
    toggleClearIcon();

    const searchInputIngredients = document.getElementById("search-input-ingredients");
    const clearSearchIconIngredients = document.querySelector(".clear-search-icon-ingredients");

    // Fonction pour afficher/cacher l'icône de suppression en fonction du contenu de l'input
    function toggleClearIconIngredients() {
      clearSearchIconIngredients.style.display = searchInputIngredients.value ? "inline-block" : "none";
    }
  
    // Ajoutez un gestionnaire d'événement pour l'événement keyup dans l'input
    searchInputIngredients.addEventListener("input", toggleClearIconIngredients); // Utilisation de l'événement "input"
  
    // Ajoutez un gestionnaire d'événement pour l'événement de clic sur l'icône de suppression
    clearSearchIconIngredients.addEventListener("click", function() {
      searchInputIngredients.value = ""; // Effacez le contenu de l'input
      toggleClearIconIngredients(); // Réaffichez/cachez l'icône de suppression
    });
  
    // Afficher/cacher l'icône de suppression au chargement de la page
    toggleClearIconIngredients();


    const searchInputAppliances = document.getElementById("search-input-appliances");
    const clearSearchIconAppliances= document.querySelector(".clear-search-icon-appliances");

    // Fonction pour afficher/cacher l'icône de suppression en fonction du contenu de l'input
    function toggleClearIconAppliances() {
      clearSearchIconAppliances.style.display = searchInputAppliances.value ? "inline-block" : "none";
    }
  
    // Ajoutez un gestionnaire d'événement pour l'événement keyup dans l'input
    searchInputAppliances.addEventListener("input", toggleClearIconAppliances); // Utilisation de l'événement "input"
  
    // Ajoutez un gestionnaire d'événement pour l'événement de clic sur l'icône de suppression
    clearSearchIconAppliances.addEventListener("click", function() {
      searchInputAppliances.value = ""; // Effacez le contenu de l'input
      toggleClearIconAppliances(); // Réaffichez/cachez l'icône de suppression
    });
  
    // Afficher/cacher l'icône de suppression au chargement de la page
    toggleClearIconAppliances();


    const searchInputUstensils = document.getElementById("search-input-ustensils");
    const clearSearchIconUstensils = document.querySelector(".clear-search-icon-ustensils");

    // Fonction pour afficher/cacher l'icône de suppression en fonction du contenu de l'input
    function toggleClearIconUstensils() {
      clearSearchIconUstensils.style.display = searchInputUstensils.value ? "inline-block" : "none";
    }
  
    // Ajoutez un gestionnaire d'événement pour l'événement keyup dans l'input
    searchInputUstensils.addEventListener("input", toggleClearIconUstensils); // Utilisation de l'événement "input"
  
    // Ajoutez un gestionnaire d'événement pour l'événement de clic sur l'icône de suppression
    clearSearchIconUstensils.addEventListener("click", function() {
      searchInputUstensils.value = ""; // Effacez le contenu de l'input
      toggleClearIconUstensils(); // Réaffichez/cachez l'icône de suppression
    });
  
    // Afficher/cacher l'icône de suppression au chargement de la page
    toggleClearIconUstensils();
  });
  