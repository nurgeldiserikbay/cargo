import { defineStore } from 'pinia'

import type { ICity } from '~/types/location'

export const useLocationStore = defineStore('location', () => {
  const { $api } = useNuxtApp()

  const cities = ref<ICity[]>([])

  const getCityBranches = computed(() => (id: number) => {
    return cities.value.find((c) => c.id === id)?.warehouses || []
  })

  async function fetchCities() {
    const result = await $api.location.getLocations()

    cities.value = result.data.value || []

    return result
  }

  return {
    cities,
    fetchCities,
    getCityBranches
  }
})