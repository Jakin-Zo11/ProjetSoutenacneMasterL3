# 🎓 Master L3 - Système de Gestion des Soutenances (EMIT)

Ce projet est la partie Backend (API REST API Laravel 9) de l'application de gestion des soutenances de l'EMIT.

---

## 🏗️ Architecture du Projet (`app/Modules/`)

Chaque développeur est responsable de son propre module situé dans le dossier `app/Modules/`. 
**Règle d'or : Ne modifiez pas le code situé dans le module d'un autre membre sans concertation.**

### 👥 Répartition des Modules et Responsabilités

| Membre | Module (`app/Modules/`) | Responsabilités principales |
| :--- | :--- | :--- |
| **Ntsoa** *(Lead Admin)* | `Administration` | • Auth admin, rôles & permissions (Spatie)<br>• Gestion des étudiants, enseignants, formations, promotions & salles<br>• Dashboard admin, traçabilité & logs |
| **Dannielah** | `Student` | • Espace personnel étudiant & profil<br>• Soumission des thèmes de mémoire & dépôts des fichiers<br>• Consultation convocations, résultats & notifications |
| **Lauris** | `Planning` | • Gestion des disponibilités (salles & jurys)<br>• Détection des conflits horaires/salles<br>• Affectation jurys, gestion des absences & remplacements<br>• Génération/envoi des convocations |
| **Caylah** | `Evaluation` | • Critères d'évaluation, barèmes, coefficients & pondérations<br>• Grille d'évaluation interactive pour le jury<br>• Saisie, calcul des moyennes pondérées & verrouillage des notes |
| **Jakin** | `Results` | • Consolidation des notes & calcul de la décision finale / mentions<br>• Génération automatique du Procès-Verbal (PV)<br>• Suivi des signatures, archivage numérique & exports PDF |

---

## 🛠️ Instructions pour l'Équipe (Git Workflow)

1. **Avant de coder (Chaque début de journée) :**
   ```bash
   git pull origin main
   ```
