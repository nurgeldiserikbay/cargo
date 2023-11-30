<template>
  <div class="auth-layout min-h-full d-flex flex-col">
    <MainHeader :is-auth="true" />
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.auth-layout {
  background: url('~/assets/img/bg-1.webp') no-repeat center;
  background-size: cover;
  background-color: rgba(#000, 0.3);
  background-blend-mode: darken;
}
</style>