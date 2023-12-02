<template>
  <v-select :model-value="modelValue" :label="$t('labels.selectCity')" :items="locationStore.cities" :clearable="true"
    :item-value="'id'" :no-data-text="$t('messages.noData')" :item-title="'name'" :loading="pending"
    @update:modelValue="$emits('update:modelValue', $event)"></v-select>
</template>

<script lang="ts" setup>
import { useLocationStore } from '~/store/location'

const locationStore = useLocationStore()

defineProps<{
  modelValue?: number;
}>()

const $emits = defineEmits(['update:modelValue'])

const { pending } = await locationStore.fetchCities()
</script>

<style lang="scss" scoped></style>