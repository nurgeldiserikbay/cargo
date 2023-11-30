<template>
  <v-container>
    <div>
      <v-data-iterator :items="list" :page="4" :items-per-page="10" :loading="false">
        <template v-slot:default="{ items }">
          <v-list-item v-for="(item, i) in items" :key="i" :title="`Item ${i}`"></v-list-item>
        </template>
      </v-data-iterator>
      <v-pagination :length="4"></v-pagination>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import type { ICity } from '~/types/location'

const { $api } = useNuxtApp()

definePageMeta({
  layout: 'admin-layout',
  auth: true,
  accesses: [ROLES.ROLE_ADMIN],
})

const list = ref<ICity[]>([])

onMounted(() => {})
</script>

<style lang="scss" scoped></style>