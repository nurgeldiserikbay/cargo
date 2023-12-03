<template>
  <div class="flex flex-col justify-start items-center pt-10">
    <div class="flex flex-col items-center rounded-xl bg-slate-50 border-box w-[90%] max-w-[450px] px-4 py-5 pb-10 text-center">
      <div v-if="error?.status || error?.statusCode" class="mb-10 text-7xl">{{ error?.status || error?.statusCode }}</div>
      <v-icon v-else icon="mdi mdi-alert-circle-outline" color="error" size="80" class="mb-8"></v-icon>
      <p class="text-lg mb-8">{{ error?.message || $t('messages.someUnexceptableError') }}</p>
      <v-btn color="red" @click="recoverFromError">
        {{ $t('commands.goBack') }}
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ErrorT } from '~/types/common'

defineProps<{
  error?: ErrorT
}>()

const $emits = defineEmits(['clear'])

const recoverFromError = () => {
 $emits('clear')
}
</script>

<style lang="scss" scoped></style>