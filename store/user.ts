import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', () => {
  const { $api } = useNuxtApp()

  const userInfo = ref()

  async function fetchUserInfo() {
    const result = await $api.user.getUserPageInfo()

    userInfo.value = result.data.value || undefined

    return result
  }

  return {
    userInfo,
    fetchUserInfo
  }
})
