document.addEventListener('DOMContentLoaded', function() {
    const formConnexion = document.getElementById('formConnexion');
    const afficherMotdepasse = document.getElementById('afficherMotdepasse');

    formConnexion.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('emailConnexion').value;
        const motdepasse = document.getElementById('motdepasseConnexion').value;
        let joueurs = JSON.parse(localStorage.getItem('joueurs')) || [];
        let joueur = joueurs.find(j => j.email === email && j.motdepasse === motdepasse);
        if (joueur) {
            localStorage.setItem('joueurActuel', JSON.stringify(joueur));
            window.location.href = 'jeu.html';
        } else {
            alert('Email ou mot de passe incorrect.');
        }
    });

    afficherMotdepasse.addEventListener('change', function() {
        const motdepasseInput = document.getElementById('motdepasseConnexion');
        motdepasseInput.type = this.checked ? 'text' : 'password';
    });
});
