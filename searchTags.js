// Fonction pour rechercher dans la liste des ingrédients
function searchIngredients(search, ingredientsList) {
    // Filtrer la liste des ingrédients en fonction de la recherche de l'utilisateur
    const filteredIngredients = ingredientsList.filter((ingredient) =>
      ingredient.toLowerCase().includes(search.toLowerCase())
    );
    return filteredIngredients;
  }
  
  // Fonction pour rechercher dans la liste des appareils
  function searchAppliances(search, appliancesList) {
    // Filtrer la liste des appareils en fonction de la recherche de l'utilisateur
    const filteredAppliances = appliancesList.filter((appliance) =>
      appliance.toLowerCase().includes(search.toLowerCase())
    );
    return filteredAppliances;
  }
  
  // Fonction pour rechercher dans la liste des ustensiles
  function searchUstensils(search, ustensilsList) {
    // Filtrer la liste des ustensiles en fonction de la recherche de l'utilisateur
    const filteredUstensils = ustensilsList.filter((ustensil) =>
      ustensil.toLowerCase().includes(search.toLowerCase())
    );
    return filteredUstensils;
  }
  
  // Fonction principale pour exécuter l'algorithme de recherche
  function searchingTags() {
    // Sélection des éléments input de recherche pour chaque catégorie
    const searchInputIngredients = document.getElementById("search-input-ingredients");
    const searchInputAppliances = document.getElementById("search-input-appliances");
    const searchInputUstensils = document.getElementById("search-input-ustensils");
  
    // Ajout d'écouteurs d'événements 'input' pour détecter les changements dans la valeur des inputs de recherche
    searchInputIngredients.addEventListener("input", async function (event) {
      const search = event.target.value.trim();
      const filteredIngredients = searchIngredients(search);
      // Mettre à jour l'interface avec les ingrédients filtrés
      updateInterface(filteredIngredients);
    });
  
    searchInputAppliances.addEventListener("input", async function (event) {
      const search = event.target.value.trim();
      const filteredAppliances = searchAppliances(search);
      // Mettre à jour l'interface avec les appareils filtrés
      updateInterface(filteredAppliances);
    });
  
    searchInputUstensils.addEventListener("input", async function (event) {
      const search = event.target.value.trim();
      const filteredUstensils = searchUstensils(search);
      // Mettre à jour l'interface avec les ustensiles filtrés
      updateInterface(filteredUstensils);
    });
  }
  
  // Appel de la fonction principale pour démarrer le processus de recherche
  searchingTags();
  