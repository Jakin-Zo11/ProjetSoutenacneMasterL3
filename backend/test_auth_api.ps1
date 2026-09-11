# Script de test PowerShell pour l'API d'authentification EMIT
# Ce script teste tous les scénarios d'authentification et d'autorisation

$BASE_URL = "http://localhost:8000/api/v1"
$TOKEN = ""
$USER_EMAIL = "scolarite@emit.mg"
$USER_PASSWORD = "password123"
$USER_NO_ROLE_EMAIL = "user@emit.mg"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "TESTS API AUTHENTIFICATION EMIT" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# ============================================
# TEST 1: Connexion réussie avec identifiants valides
# ============================================
Write-Host "TEST 1: Connexion réussie (POST /auth/login)" -ForegroundColor Yellow
Write-Host "-------------------------------------------" -ForegroundColor Gray

$body = @{
    email = $USER_EMAIL
    password = $USER_PASSWORD
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$BASE_URL/auth/login" -Method Post -Body $body -ContentType "application/json" -ErrorAction Stop
    $response | ConvertTo-Json -Depth 10
    $TOKEN = $response.token
    if ($TOKEN) {
        Write-Host "✅ SUCCÈS: Token obtenu: $($TOKEN.Substring(0, [Math]::Min(20, $TOKEN.Length)))..." -ForegroundColor Green
    } else {
        Write-Host "❌ ÉCHEC: Token non obtenu" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Erreur: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# ============================================
# TEST 2: Connexion échouée avec mauvais mot de passe
# ============================================
Write-Host "TEST 2: Connexion échouée (mauvais mot de passe)" -ForegroundColor Yellow
Write-Host "-------------------------------------------" -ForegroundColor Gray

$body = @{
    email = $USER_EMAIL
    password = "wrongpassword"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$BASE_URL/auth/login" -Method Post -Body $body -ContentType "application/json" -ErrorAction Stop
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
    Write-Host "Message: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# ============================================
# TEST 3: Accès au profil avec token valide
# ============================================
Write-Host "TEST 3: Accès au profil (GET /auth/me) avec token" -ForegroundColor Yellow
Write-Host "-------------------------------------------" -ForegroundColor Gray

if ($TOKEN) {
    try {
        $headers = @{
            Authorization = "Bearer $TOKEN"
        }
        $response = Invoke-RestMethod -Uri "$BASE_URL/auth/me" -Method Get -Headers $headers -ContentType "application/json" -ErrorAction Stop
        $response | ConvertTo-Json -Depth 10
    } catch {
        Write-Host "❌ Erreur: $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host "⚠️  SKIP: Token non disponible (TEST 1 a échoué)" -ForegroundColor Yellow
}
Write-Host ""

# ============================================
# TEST 4: Accès aux routes admin sans token
# ============================================
Write-Host "TEST 4: Accès admin sans token (GET /admin/formations)" -ForegroundColor Yellow
Write-Host "-------------------------------------------" -ForegroundColor Gray

try {
    $response = Invoke-RestMethod -Uri "$BASE_URL/admin/formations" -Method Get -ContentType "application/json" -ErrorAction Stop
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
    Write-Host "Message: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# ============================================
# TEST 5: Connexion utilisateur sans rôle admin
# ============================================
Write-Host "TEST 5: Connexion utilisateur sans rôle admin" -ForegroundColor Yellow
Write-Host "-------------------------------------------" -ForegroundColor Gray

$body = @{
    email = $USER_NO_ROLE_EMAIL
    password = $USER_PASSWORD
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$BASE_URL/auth/login" -Method Post -Body $body -ContentType "application/json" -ErrorAction Stop
    $response | ConvertTo-Json -Depth 10
    $TOKEN_NO_ROLE = $response.token
} catch {
    Write-Host "❌ Erreur: $($_.Exception.Message)" -ForegroundColor Red
    $TOKEN_NO_ROLE = $null
}
Write-Host ""

# ============================================
# TEST 6: Accès admin avec token sans rôle admin
# ============================================
Write-Host "TEST 6: Accès admin avec token sans rôle (GET /admin/formations)" -ForegroundColor Yellow
Write-Host "-------------------------------------------" -ForegroundColor Gray

if ($TOKEN_NO_ROLE) {
    try {
        $headers = @{
            Authorization = "Bearer $TOKEN_NO_ROLE"
        }
        $response = Invoke-RestMethod -Uri "$BASE_URL/admin/formations" -Method Get -Headers $headers -ContentType "application/json" -ErrorAction Stop
        $response | ConvertTo-Json -Depth 10
    } catch {
        Write-Host "Status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
        Write-Host "Message: $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host "⚠️  SKIP: Token non disponible (TEST 5 a échoué)" -ForegroundColor Yellow
}
Write-Host ""

# ============================================
# TEST 7: Accès admin avec token admin_scolarite
# ============================================
Write-Host "TEST 7: Accès admin avec rôle admin_scolarite (GET /admin/formations)" -ForegroundColor Yellow
Write-Host "-------------------------------------------" -ForegroundColor Gray

if ($TOKEN) {
    try {
        $headers = @{
            Authorization = "Bearer $TOKEN"
        }
        $response = Invoke-RestMethod -Uri "$BASE_URL/admin/formations" -Method Get -Headers $headers -ContentType "application/json" -ErrorAction Stop
        $response | ConvertTo-Json -Depth 10
    } catch {
        Write-Host "❌ Erreur: $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host "⚠️  SKIP: Token non disponible (TEST 1 a échoué)" -ForegroundColor Yellow
}
Write-Host ""

# ============================================
# TEST 8: Déconnexion
# ============================================
Write-Host "TEST 8: Déconnexion (POST /auth/logout)" -ForegroundColor Yellow
Write-Host "-------------------------------------------" -ForegroundColor Gray

if ($TOKEN) {
    try {
        $headers = @{
            Authorization = "Bearer $TOKEN"
        }
        $response = Invoke-RestMethod -Uri "$BASE_URL/auth/logout" -Method Post -Headers $headers -ContentType "application/json" -ErrorAction Stop
        $response | ConvertTo-Json -Depth 10
    } catch {
        Write-Host "❌ Erreur: $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host "⚠️  SKIP: Token non disponible (TEST 1 a échoué)" -ForegroundColor Yellow
}
Write-Host ""

# ============================================
# TEST 9: Vérification que le token est révoqué
# ============================================
Write-Host "TEST 9: Vérification token révoqué (GET /auth/me)" -ForegroundColor Yellow
Write-Host "-------------------------------------------" -ForegroundColor Gray

if ($TOKEN) {
    try {
        $headers = @{
            Authorization = "Bearer $TOKEN"
        }
        $response = Invoke-RestMethod -Uri "$BASE_URL/auth/me" -Method Get -Headers $headers -ContentType "application/json" -ErrorAction Stop
        $response | ConvertTo-Json -Depth 10
    } catch {
        Write-Host "Status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
        Write-Host "Message: $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host "⚠️  SKIP: Token non disponible (TEST 1 a échoué)" -ForegroundColor Yellow
}
Write-Host ""

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "FIN DES TESTS" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
