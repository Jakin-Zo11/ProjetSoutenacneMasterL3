# Tests API d'Authentification EMIT

## Configuration

- **URL de base**: `http://localhost:8000/api/v1`
- **Identifiants admin**: `scolarite@emit.mg` / `password123`
- **Identifiants user sans rôle**: `user@emit.mg` / `password123`

## Pré-requis

1. Lancer le serveur Laravel:
```bash
php artisan serve
```

2. Exécuter les seeders pour créer les utilisateurs de test:
```bash
php artisan db:seed --class=RoleSeeder
php artisan db:seed --class=AdminUserSeeder
```

Ou tous les seeders:
```bash
php artisan db:seed
```

## Scénarios de test

### 1. Connexion réussie (POST /auth/login)
**Attendu**: 200 OK avec token Bearer

```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d "{\"email\":\"scolarite@emit.mg\",\"password\":\"password123\"}"
```

### 2. Connexion échouée (mauvais mot de passe)
**Attendu**: 401 Unauthorized

```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d "{\"email\":\"scolarite@emit.mg\",\"password\":\"wrongpassword\"}"
```

### 3. Accès au profil avec token (GET /auth/me)
**Attendu**: 200 OK avec informations utilisateur

```bash
# Remplacer YOUR_TOKEN par le token obtenu au test 1
curl -X GET http://localhost:8000/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Accept: application/json"
```

### 4. Accès admin sans token (GET /admin/formations)
**Attendu**: 401 Unauthenticated

```bash
curl -X GET http://localhost:8000/api/v1/admin/formations \
  -H "Accept: application/json"
```

### 5. Connexion utilisateur sans rôle admin
**Attendu**: 200 OK avec token (mais sans rôle admin)

```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d "{\"email\":\"user@emit.mg\",\"password\":\"password123\"}"
```

### 6. Accès admin avec token sans rôle (GET /admin/formations)
**Attendu**: 403 Forbidden

```bash
# Remplacer USER_TOKEN par le token de l'utilisateur sans rôle
curl -X GET http://localhost:8000/api/v1/admin/formations \
  -H "Authorization: Bearer USER_TOKEN" \
  -H "Accept: application/json"
```

### 7. Accès admin avec token admin_scolarite (GET /admin/formations)
**Attendu**: 200 OK avec liste des formations

```bash
# Remplacer ADMIN_TOKEN par le token de l'admin
curl -X GET http://localhost:8000/api/v1/admin/formations \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Accept: application/json"
```

### 8. Déconnexion (POST /auth/logout)
**Attendu**: 200 OK avec message de succès

```bash
curl -X POST http://localhost:8000/api/v1/auth/logout \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Accept: application/json"
```

### 9. Vérification token révoqué (GET /auth/me)
**Attendu**: 401 Unauthenticated (token révoqué)

```bash
curl -X GET http://localhost:8000/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Accept: application/json"
```

## Scripts automatisés

### PowerShell (Windows)
```powershell
.\test_auth_api.ps1
```

### Bash (Linux/Mac/WSL)
```bash
chmod +x test_auth_api.sh
./test_auth_api.sh
```

## Collection Postman

Vous pouvez importer ces requêtes dans Postman en créant une collection avec les variables d'environnement suivantes:
- `base_url`: `http://localhost:8000/api/v1`
- `admin_email`: `scolarite@emit.mg`
- `admin_password`: `password123`
- `user_email`: `user@emit.mg`
- `user_password`: `password123`
- `token`: (variable vide, sera définie après login)

## Vérification des données de test

Pour vérifier que les utilisateurs et rôles sont correctement créés:

```bash
php artisan tinker
```

Puis exécuter:
```php
// Vérifier les utilisateurs
App\Models\User::all(['id', 'name', 'email'])

// Vérifier les rôles
Spatie\Permission\Models\Role::all()

// Vérifier les rôles d'un utilisateur
$user = App\Models\User::where('email', 'scolarite@emit.mg')->first();
$user->getRoleNames()

// Vérifier les permissions d'un utilisateur
$user->getAllPermissions()
```
