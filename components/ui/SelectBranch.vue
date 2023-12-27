<template>
	<v-select
		:model-value="modelValue"
		:label="withLabels ? $t('labels.selectBranch') : ''"
		:items="branches"
		:clearable="true"
		:rules="[(v) => !!v || $t('errors.Required')]"
		:item-value="'id'"
		:item-title="'address'"
		:no-data-text="$t('messages.noData')"
		:loading="pending"
		:errors="errors"
		:variant="withLabels ? 'filled' : 'underlined'"
	>
		<template #append-inner>
			<v-icon icon="mdi mdi-asterisk" size="x-small" color="red"></v-icon>
		</template>
		<template #item="{ item, props }">
			<div v-bind="props" class="w-full border-box py-2 px-3">
				<div class="text-lg">{{ item.raw.address }}</div>
				<div class="text-xs">{{ item.raw.address }}</div>
			</div>
		</template>
	</v-select>
</template>

<script lang="ts" setup>
import { useBranchStore } from '~/store/branch'

const branchStore = useBranchStore()

const $props = withDefaults(
	defineProps<{
		modelValue?: number
		cityId?: number
		errors?: string
		withLabels?: boolean
	}>(),
	{
		modelValue: undefined,
		cityId: undefined,
		errors: '',
		withLabels: true,
	},
)

const $emits = defineEmits(['update:modelValue'])

const branches = computed(() => {
	if (typeof $props.cityId === 'number')
		return branchStore.branches.filter((b) => b.locationId === $props.cityId)
	return branchStore.branches
})

watch(
	() => $props.cityId,
	() => {
		$emits('update:modelValue', undefined)
	},
)

const { pending } = await branchStore.fetchBranches()
</script>

<style lang="scss" scoped></style>
