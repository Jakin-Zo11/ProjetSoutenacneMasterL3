import { apiClient } from './client'

export type AuthUser = { id: number; name: string; email: string; role: string }

export const authApi = {
	async login(email: string, password: string) {
		const response = await apiClient.post<{ token: string; user: AuthUser }>('/login', { email, password })
		localStorage.setItem('auth_token', response.data.token)
		return response.data.user
	},
	async logout() {
		try {
			await apiClient.post('/logout')
		} finally {
			localStorage.removeItem('auth_token')
		}
	},
}
