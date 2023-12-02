<template>
  <div class="flex flex-col justify-start items-center text-center">
    <div v-if="error && error.statusCode" class="text-h5 mb-10">{{ error.statusCode }}</div>
    <p class="text-lg">{{ $t('messages.someUnexceptableError') }}</p>
    <v-btn>
      {{ $t('commands.goBack') }}
    </v-btn>
  </div>
</template>

<script lang="ts" setup>
import type { ErrorT } from '~/types/common'

defineProps<{
  error?: ErrorT
}>()
</script>

<style lang="scss" scoped></style>