<template>
  <div class="theme-color">
    <h1>Color mode: {{ $colorMode.value }}</h1>
    <select v-model="$colorMode.preference">
      <option value="df">df</option>
      <option value="fv">fv</option>
      <option value="ad">ad</option>
      <option value="qwe">qwe</option>
    </select>
  </div>
</template>

<script lang="ts" setup>
const colorMode = useColorMode()
</script>

<style lang="scss" scoped></style>