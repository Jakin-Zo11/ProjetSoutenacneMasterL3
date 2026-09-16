# Architecture technique

Architecture fonctionnelle corrigée

Avec votre nouvelle précision, je modifierais vos modules ainsi.

Ntsoa — Administration & supervision
Administration
│
├── Authentification
├── Utilisateurs
├── Étudiants autorisés à soutenir
├── Enseignants
├── Jurys
├── Formations
├── Promotions
├── Sessions de soutenance
├── Salles
├── Périodes
├── Créneaux
├── États administratifs
├── Tableau de bord
├── Recherche / consultation
├── Gestion des permissions
├── Audit / journalisation
└── Paramètres

Frontière : Ntsoa prépare les ressources nécessaires à la soutenance mais ne réalise pas l'algorithme de planification.

Dannielah — Espace étudiant et dépôts

Frontend mobile — React Native + Expo

Espace étudiant
│
├── Connexion et déconnexion
├── Profil et informations personnelles
├── Dépôt du thème de mémoire
├── Dépôt de la rédaction / du mémoire
├── Dépôt de la description du projet
├── Sélection et envoi des fichiers
├── Affichage de la progression du dépôt
├── Consultation de l'état des dépôts
├── Consultation de la convocation
├── Consultation de la date, de l'heure et de la salle
├── Consultation des membres du jury
├── Consultation du résultat et du PV selon les droits
└── Notifications relatives à la soutenance

Backend Laravel

API étudiant et dépôts
│
├── Authentification et autorisation de l'étudiant
├── Gestion du profil étudiant
├── Création et mise à jour des dépôts
├── Gestion des fichiers déposés
├── Contrôle des formats et des tailles
├── Association des fichiers à l'étudiant et à la session
├── Gestion des états du dépôt
├── Consultation des informations de soutenance
├── Consultation du résultat et du PV selon les droits
├── Notifications de convocation, modification et résultat
└── Protection des données et contrôle d'accès

Frontière : Dannielah gère l'espace étudiant mobile et les API de dépôt. Il n'y
a pas de validation administrative préalable du thème ou du mémoire dans ce
module.
Lauris — Planification & convocations
Planification
│
├── Disponibilités des jurys
├── Disponibilités des salles
├── Créneaux
├── Contraintes
├── Affectation des jurys
├── Affectation des salles
├── Algorithme de planification
├── Détection des conflits
├── Optimisation du planning
├── Replanification
├── Planning final
├── Convocations
└── Notifications

C'est probablement l'un des modules les plus complexes du projet.

Caylah — Configuration & évaluation
Évaluation
│
├── Critères
├── Barèmes
├── Coefficients
├── Grilles
├── Configuration par session
├── Configuration par type de Master
├── Saisie des notes
├── Commentaires
├── Validation des évaluations
└── Calcul préparatoire

Et Jakin récupère ensuite les évaluations validées.

Jakin — Résultats & PV

Ta partie reste :

Résultats & PV
│
├── Récupération des évaluations
├── Vérification des évaluations
├── Contrôle des 3 jurys
├── Calcul des notes finales
├── Calcul moyenne
├── Gestion des coefficients
├── Gestion des mentions
├── Décision finale
├── Validation du résultat
├── Génération PV
├── PV Master professionnel
├── PV Master recherche
├── Numérotation / identification
├── Historique
├── Archivage
├── Téléchargement
└── Impression

Et là, ta partie est maintenant réellement un module métier intéressant, surtout si tu travailles correctement la traçabilité et les règles de calcul.