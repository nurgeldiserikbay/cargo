<template>
  <v-container class="flex-grow-1 d-flex flex-col justify-start items-center">
    <v-tabs v-model="currentType" align-tabs="center" class="mt-12 mb-6">
      <v-tab v-for="place in CONTENT.places" :key="place.id" :value="place">
        <div class="flex flex-col items-center gap-3">
          <v-icon v-if="place.icon" :icon="`mdi mdi-${place.icon}`"></v-icon>
          <component v-if="!place.icon && place.iconPath" :is="`svgo-${place.iconPath}`"></component>
          <span>{{ $t(`places.${place.type}`) }}</span>
        </div>
      </v-tab>
    </v-tabs>

    <v-data-iterator :items="getList" :page="page">
      <template v-slot:default="{ items }">
        <template v-for="(item, i) in items" :key="i">
          <v-expansion-panels class="mb-4">
            <v-expansion-panel>
              <template #title>
                <div>
                  {{ item.raw.trackCode }}
                </div>
              </template>
              <template #text>
                <div>
                  {{ item.raw.description }}
                </div>
              </template>
            </v-expansion-panel>
          </v-expansion-panels>
        </template>
      </template>
    </v-data-iterator>
    <v-pagination :length="4"></v-pagination>
  </v-container>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'user-layout',
  auth: true,
  accesses: [ROLES.ROLE_USER],
})

const currentType = ref(CONTENT.places[0])

const page = ref(1)
const getList = ref([
  {
    id: 0,
    trackCode: 'trackCode',
    description: 'description',
  },
  {
    id: 1,
    trackCode: 'trackCode',
    description: 'description',
  },
  {
    id: 2,
    trackCode: 'trackCode',
    description: 'description',
  },
  {
    id: 3,
    trackCode: 'trackCode',
    description: 'description',
  },
  {
    id: 4,
    trackCode: 'trackCode',
    description: 'description',
  },
  {
    id: 5,
    trackCode: 'trackCode',
    description: 'description',
  },
  {
    id: 6,
    trackCode: 'trackCode',
    description: 'description',
  },
  {
    id: 7,
    trackCode: 'trackCode',
    description: 'description',
  },
  {
    id: 8,
    trackCode: 'trackCode',
    description: 'description',
  },
  {
    id: 9,
    trackCode: 'trackCode',
    description: 'description',
  },
])

</script>

<style lang="scss" scoped></style>