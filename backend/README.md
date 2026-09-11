# 🎓 Master L3 - Système de Gestion des Soutenances (EMIT)

Ce projet est la partie Backend (API REST Laravel 11) de l'application de gestion des soutenances de l'EMIT.

---

## 📋 Prérequis

- **PHP** 8.2 ou supérieur
- **Composer** 2.x
- **PostgreSQL** 14 ou supérieur
- **Node.js** 18+ (pour les assets frontend si nécessaire)
- **Git**

---

## 🚀 Installation

1. **Cloner le repository**
   ```bash
   git clone <repository-url>
   cd ProjetSoutenacneMasterL3/backend
   ```

2. **Installer les dépendances**
   ```bash
   composer install
   ```

3. **Configurer l'environnement**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Configurer la base de données PostgreSQL**
   
   Éditez le fichier `.env` et configurez les paramètres de connexion :
   ```env
   DB_CONNECTION=pgsql
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_DATABASE=emit_soutenances
   DB_USERNAME=postgres
   DB_PASSWORD=your_password
   ```

5. **Exécuter les migrations et les seeders**
   ```bash
   php artisan migrate --seed
   ```

6. **Démarrer le serveur de développement**
   ```bash
   php artisan serve
   ```

   L'API sera accessible sur `http://localhost:8000`

---

## 🔐 Identifiants de Test

Comptes créés par défaut via les seeders :

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| Admin Scolarité | scolarite@emit.mg | password123 |
| Président Mention | president.ig@emit.mg | password123 |
| Étudiant (test) | etudiant1@test.com | password123 |
| Enseignant (test) | dupont@test.com | password123 |

---

## 📚 API Endpoints v1

### Authentication

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/v1/auth/login` | Connexion utilisateur |
| GET | `/api/v1/auth/me` | Informations utilisateur (authentifié) |
| POST | `/api/v1/auth/logout` | Déconnexion (authentifié) |

### Administration (Protégé par `auth:sanctum` + `role:admin_scolarite`)

#### Salles & Infrastructure
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/v1/admin/rooms` | Liste des salles |
| POST | `/api/v1/admin/rooms` | Créer une salle |
| GET | `/api/v1/admin/rooms/{id}` | Détails d'une salle |
| PUT/PATCH | `/api/v1/admin/rooms/{id}` | Mettre à jour une salle |
| DELETE | `/api/v1/admin/rooms/{id}` | Supprimer une salle |

#### Structure Académique
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET/POST/PUT/DELETE | `/api/v1/admin/formations` | CRUD Formations |
| GET/POST/PUT/DELETE | `/api/v1/admin/promotions` | CRUD Promotions |
| GET/POST/PUT/DELETE | `/api/v1/admin/sessions-soutenance` | CRUD Sessions de Soutenance |

#### Utilisateurs et Acteurs
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET/POST/PUT/DELETE | `/api/v1/admin/users` | CRUD Utilisateurs |
| POST | `/api/v1/admin/users/{user}/roles` | Assigner un rôle |
| GET/POST/PUT/DELETE | `/api/v1/admin/etudiants` | CRUD Étudiants |
| GET/POST/PUT/DELETE | `/api/v1/admin/enseignants` | CRUD Enseignants |

#### Dépôts & Soutenances (Supervision)
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/v1/admin/depots` | Liste des dépôts |
| PATCH | `/api/v1/admin/depots/{depot}/statut` | Valider/Rejeter un dépôt |
| GET | `/api/v1/admin/soutenances` | Liste des soutenances |
| PATCH | `/api/v1/admin/soutenances/{soutenance}/planning` | Mettre à jour le planning |

#### Tableau de Bord & Logs
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/v1/admin/dashboard/stats` | Statistiques du dashboard |
| GET | `/api/v1/admin/logs` | Journal des activités |

#### Procès-Verbal & Évaluations
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/v1/admin/soutenances/{id}/pv` | Générer le PV |
| POST | `/api/v1/admin/soutenances/{id}/cloturer` | Clôturer une soutenance |

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
