document.addEventListener('DOMContentLoaded', function() {
    const boutonSoumettre = document.getElementById('boutonSoumettre');
    const boutonPause = document.getElementById('boutonPause');
    const boutonSauvegarder = document.getElementById('boutonSauvegarder');
    const champReponse = document.getElementById('champReponse');
    const motCacheEl = document.getElementById('motCache');
    const scoreEl = document.getElementById('score');
    const tentativesEl = document.getElementById('tentatives');
    const photoJoueurEl = document.getElementById('photoJoueur');
    const nomJoueurEl = document.getElementById('nomJoueur');

    let joueur = JSON.parse(localStorage.getItem('joueurActuel')) || { nom: '', photo: '', score: 0, tentative: 0, echec: 0 };
    let motActuel = '';
    let mots = ['javascript', 'interface', 'animation', 'challenge', 'solution', 'maladie', 'football', 'immédiatement', 'basketball', 'handball', 'biologie', 'ronaldinho', 'guinée', 'australie', 'afrique', 'continent', 'amerique', 'capitale', 'argent', 'paradis', 'rapidement'];

    photoJoueurEl.src = joueur.photo;
    nomJoueurEl.textContent = joueur.nom;

    function genererMot() {
        motActuel = mots[Math.floor(Math.random() * mots.length)];
        let motCache = motActuel.split('').map((char, index) => (Math.random() < 0.5 ? '_' : char)).join('');
        motCacheEl.textContent = motCache;
    }

    function soumettreReponse() {
        const reponse = champReponse.value.toLowerCase();
        if (reponse === motActuel) {
            joueur.score += calculerPoints();
            joueur.tentative++;
            joueur.echec = 0;
            if (joueur.tentative % 5 === 0) {
                joueur.score += joueur.tentative * 2;
            }
        } else {
            joueur.echec++;
            if (joueur.echec >= 3) {
                joueur.score -= Math.floor(joueur.score / 5);
            }
            if (joueur.echec >= 5) {
                alert('Vous avez perdu le jeu!');
                sauvegarderJoueur();
                reinitialiserJeu();
                return;
            }
        }
        mettreAJourScore();
        genererMot();
        champReponse.value = '';
    }

    function calculerPoints() {
        return joueur.tentative >= 5 ? (joueur.tentative % 5) * 10 : 1;
    }

    function mettreAJourScore() {
        scoreEl.textContent = `Score: ${joueur.score}`;
        tentativesEl.textContent = `Tentatives: ${joueur.tentative}`;
    }

    function pauseJeu() {
        sauvegarderJoueur();
        alert('Jeu en pause. Reprenez plus tard.');
    }

    function sauvegarderJeu() {
        sauvegarderJoueur();
        alert('Partie sauvegardée.');
    }

    function sauvegarderJoueur() {
        let joueurs = JSON.parse(localStorage.getItem('joueurs')) || [];
        const indexJoueur = joueurs.findIndex(j => j.email === joueur.email);
        if (indexJoueur > -1) {
            joueurs[indexJoueur] = joueur;
        } else {
            joueurs.push(joueur);
        }
        localStorage.setItem('joueurs', JSON.stringify(joueurs));
    }

    function reinitialiserJeu() {
        joueur = { nom: '', photo: '', score: 0, tentative: 0, echec: 0 };
        localStorage.removeItem('joueurActuel');
        window.location.href = 'connexion.html';
    }

    boutonSoumettre.addEventListener('click', soumettreReponse);
    boutonPause.addEventListener('click', pauseJeu);
    boutonSauvegarder.addEventListener('click', sauvegarderJeu);

    genererMot();
    mettreAJourScore();
});
