// Fonction pour rechercher dans la liste des ingrédients
export function searchIngredients(search, ingredientsList) {
    // Filtrer la liste des ingrédients en fonction de la recherche de l'utilisateur
    const filteredIngredients = ingredientsList.filter((ingredient) =>
      ingredient.toLowerCase().includes(search.toLowerCase())
    );
    return filteredIngredients;
}

// Fonction pour rechercher dans la liste des appareils
export function searchAppliances(search, appliancesList) {
    // Filtrer la liste des appareils en fonction de la recherche de l'utilisateur
    const filteredAppliances = appliancesList.filter((appliance) =>
      appliance.toLowerCase().includes(search.toLowerCase())
    );
    return filteredAppliances;
}

// Fonction pour rechercher dans la liste des ustensiles
export function searchUstensils(search, ustensilsList) {
    // Filtrer la liste des ustensiles en fonction de la recherche de l'utilisateur
    const filteredUstensils = ustensilsList.filter((ustensil) =>
      ustensil.toLowerCase().includes(search.toLowerCase())
    );
    return filteredUstensils;
}