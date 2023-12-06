<template>
  <v-select :model-value="modelValue" :label="$t('labels.selectBranch')" :items="branches" :clearable="true"
    :rules="[(v) => !!v || $t('errors.Required')]" :item-value="'id'" :item-title="'address'"
    :no-data-text="$t('messages.noData')" :loading="pending" :errors="errors"
    @update:modelValue="$emits('update:modelValue', $event)">
    <template #append-inner>
      <v-icon icon="mdi mdi-asterisk" size="x-small" color="red"></v-icon>
    </template>
  </v-select>
</template>

<script lang="ts" setup>
import { useBranchStore } from '~/store/branch'

const branchStore = useBranchStore()

const $props = defineProps<{
  modelValue?: number;
  cityId?: number;
  errors?: string;
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