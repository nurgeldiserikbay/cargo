<template>
	<v-select
		:model-value="modelValue"
		:label="withLabels ? $t('labels.selectCity') : ''"
		:items="locationStore.cities"
		:rules="[(v) => !!v || $t('errors.Required')]"
		:clearable="true"
		:item-value="'id'"
		:no-data-text="$t('messages.noData')"
		:item-title="'name'"
		:loading="pending"
		:variant="withLabels ? 'filled' : 'underlined'"
		@update:model-value="$emits('update:modelValue', $event)"
	>
		<template #append-inner>
			<v-icon icon="mdi mdi-asterisk" size="x-small" color="red"></v-icon>
		</template>
	</v-select>
</template>

<script lang="ts" setup>
import { useLocationStore } from '~/store/location'
import type { LocationTypes } from '~/types/location'

const locationStore = useLocationStore()

const $props = withDefaults(
	defineProps<{
		modelValue?: number
		withLabels?: boolean
		locationFilter?: LocationTypes
	}>(),
	{
		modelValue: undefined,
		withLabels: true,
		locationFilter: undefined,
	},
)

const $emits = defineEmits(['update:modelValue'])

const { pending } = await locationStore.fetchCities($props.locationFilter)
</script>

<style lang="scss" scoped></style>
