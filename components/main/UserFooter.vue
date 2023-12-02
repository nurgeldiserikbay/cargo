<template>
  <v-bottom-navigation class="!bg-blue relative z-120">
    <v-btn v-for="link in CONTENT.links" :key="link.to" value="recent" :href="localePath(link.to)">
      <v-icon :icon="`mdi mdi-${link.icon}`"></v-icon>

      <span>{{ $t(link.text) }}</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts" setup>
const localePath = useLocalePath()
</script>

<style lang="scss" scoped></style>