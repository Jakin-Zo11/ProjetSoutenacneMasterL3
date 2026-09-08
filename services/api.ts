import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// L'URL de votre API Laravel (Modifiez 127.0.0.1 par l'IP de votre machine si vous testez sur un vrai téléphone)
const API_URL = 'http://127.0.0.1:8000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Intercepteur pour ajouter le token de Sanctum à chaque requête
api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
