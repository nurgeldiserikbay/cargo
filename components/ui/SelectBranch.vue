<template>
  <v-select :model-value="modelValue" :label="$t('labels.selectBranch')" :items="branches" :clearable="true"
    :item-value="'id'" :item-title="'name'" @update:modelValue="$emits('update:modelValue', $event)"></v-select>
</template>

<script lang="ts" setup>
import { useLocationStore } from '~/store/location'

const catalogStore = useLocationStore()

const $props = defineProps<{
  modelValue?: number;
  cityId?: number;
}>()

const $emits = defineEmits(['update:modelValue'])

watch(() => $props.cityId, () => {
  $emits('update:modelValue', undefined)
})

const branches = computed(() => typeof $props.cityId === 'number' ? catalogStore.getCityBranches($props.cityId) : [])
</script>

<style lang="scss" scoped></style>