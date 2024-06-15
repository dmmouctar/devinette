document.addEventListener('DOMContentLoaded', function() {
    const tableJoueursBody = document.querySelector('#tableJoueurs tbody');
    
    function chargerListeJoueurs() {
        tableJoueursBody.innerHTML = '';
        let joueurs = JSON.parse(localStorage.getItem('joueurs')) || [];
        // Triez les joueurs par score décroissant
        joueurs.sort((a, b) => b.score - a.score);
        joueurs.forEach(j => {
            let ligne = document.createElement('tr');
            ligne.innerHTML = `
                <td>${j.nom}</td>
                <td>${j.prenom}</td>
                <td><img src="${j.photo}" alt="Photo de ${j.nom}" class="player-photo"></td>
                <td>${j.score}</td> <!-- Ajoutez cette cellule pour afficher le score -->
            `;
            tableJoueursBody.appendChild(ligne);
        });
    }

    chargerListeJoueurs();
});
