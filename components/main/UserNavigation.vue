<template>
  <nav class="self-stretch">
    <ul class="h-full hidden list-none md:(flex)">
      <li v-for="link in CONTENT.links" :key="link.to">
        <NuxtLinkLocale :to="link.to"
          class="flex justify-center py-2 px-5 items-center text-center no-underline h-full box-border text-(md color1) transition-(all 300) border-b-(2 solid transparent) hover:(border-b-dark-500)">
          {{ $t(link.text) }}</NuxtLinkLocale>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>