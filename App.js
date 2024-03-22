document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const clearSearchIcon = document.querySelector('.clear-search-icon');
  
    // Fonction pour afficher/cacher l'icône de suppression en fonction du contenu de l'input
    function toggleClearIcon() {
      clearSearchIcon.style.display = searchInput.value ? 'inline-block' : 'none';
    }
  
    // Ajoutez un gestionnaire d'événement pour l'événement keyup dans l'input
    searchInput.addEventListener('input', toggleClearIcon); // Utilisation de l'événement 'input'
  
    // Ajoutez un gestionnaire d'événement pour l'événement de clic sur l'icône de suppression
    clearSearchIcon.addEventListener('click', function() {
      searchInput.value = ''; // Effacez le contenu de l'input
      toggleClearIcon(); // Réaffichez/cachez l'icône de suppression
    });
  
    // Afficher/cacher l'icône de suppression au chargement de la page
    toggleClearIcon();
  });
  