import HttpFactory from '../factory'
import type { ICity, ICityCreate, LocationTypes } from '~/types/location'
import type { IBranch } from '~/types/branch'

export class LocationModule extends HttpFactory {
	async getLocations(locationType?: LocationTypes) {
		return await this.GET<ICity[]>('/locations', {
			locationType,
		})
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
