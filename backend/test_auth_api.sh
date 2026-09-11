#!/bin/bash

# Script de test pour l'API d'authentification EMIT
# Ce script teste tous les scénarios d'authentification et d'autorisation

BASE_URL="http://localhost:8000/api/v1"
TOKEN=""
USER_EMAIL="scolarite@emit.mg"
USER_PASSWORD="password123"
USER_NO_ROLE_EMAIL="user@emit.mg"

echo "=========================================="
echo "TESTS API AUTHENTIFICATION EMIT"
echo "=========================================="
echo ""

# ============================================
# TEST 1: Connexion réussie avec identifiants valides
# ============================================
echo "TEST 1: Connexion réussie (POST /auth/login)"
echo "-------------------------------------------"
RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d "{\"email\":\"$USER_EMAIL\",\"password\":\"$USER_PASSWORD\"}")
echo "$RESPONSE" | jq '.'
TOKEN=$(echo "$RESPONSE" | jq -r '.token // empty')
if [ -n "$TOKEN" ] && [ "$TOKEN" != "null" ]; then
    echo "✅ SUCCÈS: Token obtenu: ${TOKEN:0:20}..."
else
    echo "❌ ÉCHEC: Token non obtenu"
fi
echo ""

# ============================================
# TEST 2: Connexion échouée avec mauvais mot de passe
# ============================================
echo "TEST 2: Connexion échouée (mauvais mot de passe)"
echo "-------------------------------------------"
curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d "{\"email\":\"$USER_EMAIL\",\"password\":\"wrongpassword\"}" | jq '.'
echo ""

# ============================================
# TEST 3: Accès au profil avec token valide
# ============================================
echo "TEST 3: Accès au profil (GET /auth/me) avec token"
echo "-------------------------------------------"
if [ -n "$TOKEN" ] && [ "$TOKEN" != "null" ]; then
    curl -s -X GET "$BASE_URL/auth/me" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Accept: application/json" | jq '.'
else
    echo "⚠️  SKIP: Token non disponible (TEST 1 a échoué)"
fi
echo ""

# ============================================
# TEST 4: Accès aux routes admin sans token
# ============================================
echo "TEST 4: Accès admin sans token (GET /admin/formations)"
echo "-------------------------------------------"
curl -s -X GET "$BASE_URL/admin/formations" \
  -H "Accept: application/json" | jq '.'
echo ""

# ============================================
# TEST 5: Connexion utilisateur sans rôle admin
# ============================================
echo "TEST 5: Connexion utilisateur sans rôle admin"
echo "-------------------------------------------"
RESPONSE_NO_ROLE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d "{\"email\":\"$USER_NO_ROLE_EMAIL\",\"password\":\"$USER_PASSWORD\"}")
echo "$RESPONSE_NO_ROLE" | jq '.'
TOKEN_NO_ROLE=$(echo "$RESPONSE_NO_ROLE" | jq -r '.token // empty')
echo ""

# ============================================
# TEST 6: Accès admin avec token sans rôle admin
# ============================================
echo "TEST 6: Accès admin avec token sans rôle (GET /admin/formations)"
echo "-------------------------------------------"
if [ -n "$TOKEN_NO_ROLE" ] && [ "$TOKEN_NO_ROLE" != "null" ]; then
    curl -s -X GET "$BASE_URL/admin/formations" \
      -H "Authorization: Bearer $TOKEN_NO_ROLE" \
      -H "Accept: application/json" | jq '.'
else
    echo "⚠️  SKIP: Token non disponible (TEST 5 a échoué)"
fi
echo ""

# ============================================
# TEST 7: Accès admin avec token admin_scolarite
# ============================================
echo "TEST 7: Accès admin avec rôle admin_scolarite (GET /admin/formations)"
echo "-------------------------------------------"
if [ -n "$TOKEN" ] && [ "$TOKEN" != "null" ]; then
    curl -s -X GET "$BASE_URL/admin/formations" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Accept: application/json" | jq '.'
else
    echo "⚠️  SKIP: Token non disponible (TEST 1 a échoué)"
fi
echo ""

# ============================================
# TEST 8: Déconnexion
# ============================================
echo "TEST 8: Déconnexion (POST /auth/logout)"
echo "-------------------------------------------"
if [ -n "$TOKEN" ] && [ "$TOKEN" != "null" ]; then
    curl -s -X POST "$BASE_URL/auth/logout" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Accept: application/json" | jq '.'
else
    echo "⚠️  SKIP: Token non disponible (TEST 1 a échoué)"
fi
echo ""

# ============================================
# TEST 9: Vérification que le token est révoqué
# ============================================
echo "TEST 9: Vérification token révoqué (GET /auth/me)"
echo "-------------------------------------------"
if [ -n "$TOKEN" ] && [ "$TOKEN" != "null" ]; then
    curl -s -X GET "$BASE_URL/auth/me" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Accept: application/json" | jq '.'
else
    echo "⚠️  SKIP: Token non disponible (TEST 1 a échoué)"
fi
echo ""

echo "=========================================="
echo "FIN DES TESTS"
echo "=========================================="
