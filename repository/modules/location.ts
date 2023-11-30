import type { ICity } from '~/types/location'
import type { IBranch } from '~/types/branch'

import HttpFactory from '../factory'

export class LocationModule extends HttpFactory {
  async getLocations() {
    return await this.GET<ICity[]>('/locations')
  }

  async getLocation(id: number) {
    return await this.GET<ICity>(`/locations/${id}`)
  }

  async createLocation(location: ICity) {
    return await this.POST<ICity>('/locations', location)
  }

  async putBranchToLocation(id: number, branch: IBranch) {
    return await this.PUT<ICity>(`/locations/${id}/warehouses`, branch)
  }
}