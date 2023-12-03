<template>
  <v-bottom-navigation class="!bg-blue relative z-120">
    <v-btn v-for="link in CONTENT.links" :key="link.to" value="recent" @click="goToPage(link.to)">
      <v-icon :icon="`mdi mdi-${link.icon}`"></v-icon>
      <v-tooltip activator="parent" location="top">{{ $t(link.text) }}</v-tooltip>
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts" setup>
const localePath = useLocalePath()
const $router = useRouter()

function goToPage(path: string) {
  $router.push(localePath(path))
}
</script>

<style lang="scss" scoped></style>