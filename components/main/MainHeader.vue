<template>
  <div class="w-full shadow-lg relative z-120 bg-white">
    <v-container class="d-flex flex-row-reverse justify-between items-center py-0">
      <div class="d-flex items-center gap-4">
        <LangSwitcher></LangSwitcher>
        <UserMenu v-if="!isAuth"></UserMenu>
      </div>
      <UserNavigation v-if="!isAuth"></UserNavigation>
      <MainLogo class="my-2"></MainLogo>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  isAuth?: boolean;
}>(), { isAuth: false })
</script>

<style lang="scss" scoped></style>