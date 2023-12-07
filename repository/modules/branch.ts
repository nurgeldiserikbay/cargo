import HttpFactory from '../factory'
import type { IBranch, IBranchCreate } from '~/types/branch'

export class BranchModule extends HttpFactory {
	async getBranchs() {
		return await this.GET<IBranch[]>('/warehouses')
	}

	async getBranch(id: number) {
		return await this.GET<IBranch>(`/warehouses/${id}`)
	}

	async createBranch(branch: IBranchCreate) {
		return await this.POST<IBranch>('/warehouses', branch)
	}

	async updateBranch(id: number, branch: IBranchCreate) {
		return await this.PUT<IBranch>(`/warehouses/${id}`, branch)
	}

	async removeBranch(id: number) {
		return await this.DELETE(`/warehouses/${id}`)
	}
}
