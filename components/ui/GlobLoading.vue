<template>
  <div v-show="getLoading('global')" class="fixed top-0 left-0 z-110 w-full h-full flex justify-center items-center bg-dark-200/20" @click.stop="">
    <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
  </div>
</template>

<script lang="ts" setup>
const { getLoading } = useLoading()
</script>

<style lang="scss" scoped></style>