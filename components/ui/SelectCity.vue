<template>
  <v-select :model-value="modelValue" :label="$t('labels.selectCity')" :items="catalogStore.cities" :clearable="true"
    :item-value="'id'" :item-title="'name'" :loading="pending"
    @update:modelValue="$emits('update:modelValue', $event)"></v-select>
</template>

<script lang="ts" setup>
import { useLocationStore } from '~/store/location'

const catalogStore = useLocationStore()

defineProps<{
  modelValue?: number;
}>()

const $emits = defineEmits(['update:modelValue'])

const { pending } = await catalogStore.fetchCities()
</script>

<style lang="scss" scoped></style>