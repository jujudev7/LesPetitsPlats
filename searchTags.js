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
//     const filteredIngredients = searchIngredients(search);
//     // Mettre à jour l'interface avec les ingrédients filtrés
//     updateInterface(filteredIngredients);
//   });

//   searchInputAppliances.addEventListener("input", async function (event) {
//     const search = event.target.value.trim();
//     const filteredAppliances = searchAppliances(search);
//     // Mettre à jour l'interface avec les appareils filtrés
//     updateInterface(filteredAppliances);
//   });

//   searchInputUstensils.addEventListener("input", async function (event) {
//     const search = event.target.value.trim();
//     const filteredUstensils = searchUstensils(search);
//     // Mettre à jour l'interface avec les ustensiles filtrés
//     updateInterface(filteredUstensils);
//   });
// }

// // Appel de la fonction principale pour démarrer le processus de recherche
// searchingTags();
