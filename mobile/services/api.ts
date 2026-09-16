import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

declare const process: { env: { EXPO_PUBLIC_API_URL?: string } };

// Set EXPO_PUBLIC_API_URL for a physical device or a non-default Laravel host.
const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://10.0.2.2:8000/api';

// Désactiver l'avertissement eslint pour axios
// eslint-disable-next-line import/no-named-as-default-member
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  roles: string[];
}

interface LoginResponse {
  success: boolean;
  token: string;
  user: AuthUser;
  message: string;
}

export async function login(email: string, password: string): Promise<AuthUser> {
  const { data } = await api.post<LoginResponse>('/v1/auth/login', { email, password });
  await SecureStore.setItemAsync('userToken', data.token);
  await SecureStore.setItemAsync('authUser', JSON.stringify(data.user));
  return data.user;
}

export async function logout(): Promise<void> {
  try {
    await api.post('/v1/auth/logout');
  } finally {
    await SecureStore.deleteItemAsync('userToken');
    await SecureStore.deleteItemAsync('authUser');
  }
}

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
