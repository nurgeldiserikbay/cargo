<template>
	<v-text-field
		ref="textField"
		:model-value="input.value"
		:type="'phone'"
		:maxlength="mask.length"
		:error-messages="errorMessages"
		:placeholder="mask"
		:variant="withLabels ? 'filled' : 'underlined'"
		@update:model-value="update"
		@blur="onBlur"
	>
		<template v-if="required" #append-inner>
			<v-icon icon="mdi mdi-asterisk" size="x-small" color="red"></v-icon>
		</template>
	</v-text-field>
</template>

<script lang="ts" setup>
// @ts-ignore
import IMask from 'imask'
import { VTextField } from 'vuetify/lib/components/index.mjs'

const maskOptions = {
	mask: '0 (000) 000 00 00',
}

const $props = withDefaults(
	defineProps<{
		modelValue?: string
		errorMessages?: string
		mask?: string
		placeholder?: string
		required?: boolean
		withLabels?: boolean
	}>(),
	{
		modelValue: '',
		mask: '+7 (###) ### ## ##',
		errorMessages: '',
		placeholder: '',
		required: false,
		withLabels: true,
	},
)

const $emits = defineEmits(['update:modelValue', 'onBlur'])

const input = ref({
	value: '',
})
const textField = ref<VTextField | null>(null)

onMounted(() => {
	if ($props.modelValue) update($props.modelValue)

	if (textField.value?.$el) {
		const input = textField.value?.$el?.querySelector('input')
		if (input) IMask(input, maskOptions)
	}
})

function update(value: string) {
	const trueVal = value
	input.value = {
		value: trueVal,
	}
}

function onBlur() {
	$emits('update:modelValue', input.value.value)
	$emits('onBlur')
}
</script>

<style lang="scss" scoped></style>
