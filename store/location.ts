import { defineStore } from 'pinia'

import type { ICity, LocationTypes } from '~/types/location'

export const useLocationStore = defineStore('location', () => {
	const { $api } = useNuxtApp()

	const cities = ref<ICity[]>([])

	const getCityById = computed(
		() => (id: number) => cities.value.find((c) => c.id === id),
	)

	async function fetchCities(locationType?: LocationTypes) {
		const result = await $api.location.getLocations(locationType)

		cities.value = result.data.value || []

		return result
	}

	return {
		cities,
		fetchCities,
		getCityById,
	}
})
