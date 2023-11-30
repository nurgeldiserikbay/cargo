import type { IBranch } from '~/types/branch'

import HttpFactory from '../factory'

export class BranchModule extends HttpFactory {
  async getBranchs() {
    return await this.GET<IBranch[]>('/warehouses')
  }

  async getBranch(id: number) {
    return await this.GET<IBranch>(`/warehouses/${id}`)
  }

  async createBranch(branch: IBranch) {
    return await this.POST<IBranch>('/warehouses', branch)
  }
}