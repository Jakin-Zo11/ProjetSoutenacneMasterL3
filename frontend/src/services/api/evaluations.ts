import { apiClient } from './client'

export type ApiCriterion = {
	id: number
	name: string
	description: string | null
	max_score: number | string
	coefficient: number | string
	position: number
}

export type ApiGrid = {
	id: number
	name: string
	description: string | null
	is_active: boolean
	criteria: ApiCriterion[]
}

export const evaluationsApi = {
	async listGrids() {
		const response = await apiClient.get<ApiGrid[]>('/evaluation-grids')
		return response.data
	},
	async createGrid(data: { name: string; description?: string; is_active?: boolean }) {
		const response = await apiClient.post<ApiGrid>('/evaluation-grids', data)
		return response.data
	},
	async createCriterion(gridId: number, data: { name: string; description?: string; max_score: number; coefficient: number; position?: number }) {
		const response = await apiClient.post<ApiCriterion>(`/evaluation-grids/${gridId}/criteria`, data)
		return response.data
	},
	async updateCriterion(criterionId: number, data: Partial<Pick<ApiCriterion, 'name' | 'description' | 'max_score' | 'coefficient' | 'position'>>) {
		const response = await apiClient.put<ApiCriterion>(`/evaluation-criteria/${criterionId}`, data)
		return response.data
	},
}
