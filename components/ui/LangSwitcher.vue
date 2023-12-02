<template>
  <v-menu :offset="10">
    <template v-slot:activator="{ props }">
      <v-btn :color="color" v-bind="props" :icon="true" :rounded="'true'" :size="'small'" :shadow="false">
        <v-icon icon="mdi mdi-translate"></v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item v-for="item in getLocales" :key="item.code" :value="item.code" :active="locale === item.code">
        <v-list-item-title>
          <NuxtLink :to="switchLocalePath(item.code)" class="text-(color1) hover:(text-(color1)) no-underline">{{
            item.name
          }}</NuxtLink>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts" setup>
import type { LocaleObject } from '@nuxtjs/i18n/dist/runtime/composables'

defineProps<{
  color?: string;
}>()

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const getLocales = computed<LocaleObject[]>(() => (locales.value as LocaleObject[]))
</script>

<style lang="scss" scoped></style>