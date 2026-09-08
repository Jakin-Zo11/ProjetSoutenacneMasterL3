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

Dannielah — Espace étudiant

Elle devient beaucoup plus ciblée :

Espace étudiant
│
├── Authentification
├── Profil
├── Consultation de sa soutenance
├── Consultation de la date
├── Consultation du lieu
├── Consultation des membres du jury
├── Consultation de la convocation
├── Téléchargement de la convocation
└── Notifications

Plus de :

❌ dépôt thème
❌ validation thème
❌ dépôt mémoire
❌ validation mémoire
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