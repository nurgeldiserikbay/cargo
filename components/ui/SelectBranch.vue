<template>
  <v-select :model-value="modelValue" :label="$t('labels.selectBranch')" :items="branches" :clearable="true"
    :item-value="'id'" :item-title="'name'" :no-data-text="$t('messages.noData')" :loading="pending"
    @update:modelValue="$emits('update:modelValue', $event)"></v-select>
</template>

<script lang="ts" setup>
import { useBranchStore } from '~/store/branch'

const branchStore = useBranchStore()

const $props = defineProps<{
  modelValue?: number;
  cityId?: number;
}>()

const $emits = defineEmits(['update:modelValue'])

const branches = computed(() => {
  if (typeof $props.cityId === 'number') return branchStore.branches.filter((b) => b.locationId === $props.cityId)
  return branchStore.branches
})

watch(() => $props.cityId, () => {
  $emits('update:modelValue', undefined)
})

const { pending } = await branchStore.fetchBranches()
</script>

<style lang="scss" scoped></style>