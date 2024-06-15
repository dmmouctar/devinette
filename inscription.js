document.addEventListener('DOMContentLoaded', function() {
    const formInscription = document.getElementById('formInscription');
    const afficherMotdepasseInscription = document.getElementById('afficherMotdepasseInscription');

    formInscription.addEventListener('submit', function(event) {
        event.preventDefault();
        const prenom = document.getElementById('prenomInscription').value;
        const nom = document.getElementById('nomInscription').value;
        const email = document.getElementById('emailInscription').value;
        const motdepasse = document.getElementById('motdepasseInscription').value;
        const photo = document.getElementById('photoInscription').files[0];
        if (prenom && nom && email && motdepasse && photo) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const joueur = {
                    prenom: prenom,
                    nom: nom,
                    email: email,
                    motdepasse: motdepasse,
                    photo: e.target.result,
                    score: 0,
                    tentative: 0,
                    echec: 0
                };
                let joueurs = JSON.parse(localStorage.getItem('joueurs')) || [];
                joueurs.push(joueur);
                localStorage.setItem('joueurs', JSON.stringify(joueurs));
                localStorage.setItem('joueurActuel', JSON.stringify(joueur));
                window.location.href = 'jeu.html';
            };
            reader.readAsDataURL(photo);
        } else {
            alert('Veuillez remplir tous les champs.');
        }
    });

    afficherMotdepasseInscription.addEventListener('change', function() {
        const motdepasseInput = document.getElementById('motdepasseInscription');
        motdepasseInput.type = this.checked ? 'text' : 'password';
    });
});
