import { defineStore } from 'pinia'
import type { IBranch } from '~/types/branch'

export const useBranchStore = defineStore('branch', () => {
  const { $api } = useNuxtApp()

  const branches = ref<IBranch[]>([])

  const getBranchById = computed(() => (id: number) => branches.value.find((c) => c.id === id))

  async function fetchBranches() {
    const result = await $api.branch.getBranchs()

    branches.value = result.data.value || []

    return result
  }

  return {
    branches,
    fetchBranches,
    getBranchById
  }
})
