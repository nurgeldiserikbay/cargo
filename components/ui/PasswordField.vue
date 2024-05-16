<template>
	<v-text-field
		:type="view ? 'text' : 'password'"
		:model-value="input.value"
		:label="label"
		:error-messages="errorMessages"
		@update:model-value="update"
		@blur="onBlur"
	>
		<template #append-inner>
			<v-icon
				v-if="required"
				icon="mdi mdi-asterisk"
				size="x-small"
				color="red"
			></v-icon>
			<v-icon
				v-if="!view"
				icon="mdi mdi-eye-off-outline"
				size="small"
				@click="view = true"
			></v-icon>
			<v-icon
				v-else
				icon="mdi mdi-eye-outline"
				size="small"
				@click="view = false"
			></v-icon>
		</template>
	</v-text-field>
</template>

<script lang="ts" setup>
import { VTextField } from 'vuetify/lib/components/index.mjs'

withDefaults(
	defineProps<{
		modelValue?: string
		errorMessages?: string
		label?: string
		required?: boolean
	}>(),
	{
		modelValue: '',
		errorMessages: '',
		label: '',
		required: false,
	},
)

const $emits = defineEmits(['update:modelValue', 'onBlur'])

const input = ref({
	value: '',
})
const view = ref(false)

function update(value: string) {
	input.value = {
		value,
	}
}

function onBlur() {
	$emits('update:modelValue', input.value.value)
	$emits('onBlur')
}
</script>

<style lang="scss" scoped></style>
