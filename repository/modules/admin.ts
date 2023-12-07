import type { UseFetchOptions } from 'nuxt/app'
import HttpFactory from '../factory'
import type { IAdminUserCreate, IAdminUser } from '~/types/users'

export class AdminModule extends HttpFactory {
	async createAdmin(userData: IAdminUserCreate) {
		return await this.POST<IAdminUserCreate>('/admin/users', userData)
	}

	async updateAdmin(id: number, userData: IAdminUserCreate) {
		return await this.PUT<IAdminUserCreate>(`/admin/users/${id}`, userData)
	}

	async removeAdmin(id: number) {
		return await this.DELETE(`/admin/users/${id}`)
	}

	async lockAdmin(id: number, userData: IAdminUserCreate) {
		return await this.PUT<IAdminUserCreate>(`/admin/users/${id}`, userData)
	}

	async getAdmins<DataT>(params?: UseFetchOptions<DataT>) {
		return await this.GET<IAdminUser[]>('/api/admin/users', params)
	}
}
