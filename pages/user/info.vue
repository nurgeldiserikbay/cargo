<template>
  <v-container class="flex-grow-1 d-flex flex-col justify-start items-center pt-10">
    <v-card class="w-full max-w-[450px] min-h-[50vh] max-h-[600px] border-box px-5 py-6 relative !overflow-visible">
      <v-btn color="yellow" :size="'small'" :icon="true" :rounted="true" class="!absolute -top-3 -right-3" @click="copyText">
        <v-icon :icon="`mdi mdi-pencil-box-multiple-outline`" size="x-large"></v-icon>
      </v-btn>
      <div v-html="userInfo" class="whitespace-pre-wrap"></div>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { useUserStore } from '~/store/user'

const { userInfo, fetchUserInfo } = useUserStore()
const { setLoading } = useLoading()
const { setError } = useAllert()

definePageMeta({
  layout: 'user-layout',
  auth: true,
  accesses: [ROLES.ROLE_USER],
})

onMounted(async () => {
  try {
    setLoading('global', true)
    const { status, error } = await fetchUserInfo()
    if (status.value === 'error') setError({ title: error.value?.message || '' })
  } catch (e: any) {
    if (e?.response?._data) {
      setError({ title: e.response._data.error || '' })
    }
  } finally {
    setLoading('global', false)
  }
})

function copyText() {
  navigator.clipboard.writeText(userInfo)
}
</script>

<style lang="scss" scoped></style>