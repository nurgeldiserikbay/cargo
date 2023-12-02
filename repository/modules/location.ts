import type { ICity, ICityCreate } from '~/types/location'
import type { IBranch } from '~/types/branch'

import HttpFactory from '../factory'

export class LocationModule extends HttpFactory {
  async getLocations() {
    return await this.GET<ICity[]>('/locations')
  }

  async getLocation(id: number) {
    return await this.GET<ICity>(`/locations/${id}`)
  }

  async createLocation(location: ICityCreate) {
    return await this.POST<ICity>('/locations', location)
  }

  async updateLocation(id: number, location: ICityCreate) {
    return await this.PUT(`/locations/${id}`, location)
  }

  async removeLocation(id: number) {
    return await this.DELETE(`/locations/${id}`)
  }

  async putBranchToLocation(id: number, branch: IBranch) {
    return await this.PUT<ICity>(`/locations/${id}/warehouses`, branch)
  }
}