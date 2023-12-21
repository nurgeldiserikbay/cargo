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

const locationStore = useLocationStore()

withDefaults(
	defineProps<{
		modelValue?: number
		withLabels?: boolean
	}>(),
	{
		modelValue: undefined,
		withLabels: true,
	},
)

const $emits = defineEmits(['update:modelValue'])

const { pending } = await locationStore.fetchCities()
</script>

<style lang="scss" scoped></style>
