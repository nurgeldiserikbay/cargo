import { defineStore } from 'pinia'

import type { ICity } from '~/types/location'

export const useLocationStore = defineStore('location', () => {
  const { $api } = useNuxtApp()

  const cities = ref<ICity[]>([])

  const getCityById = computed(() => (id: number) => cities.value.find((c) => c.id === id))

  async function fetchCities() {
    const result = await $api.location.getLocations()

    cities.value = result.data.value || []

    return result
  }

  return {
    cities,
    fetchCities,
    getCityById
  }
})