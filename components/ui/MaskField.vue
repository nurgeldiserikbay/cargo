<template>
	<v-text-field
		:model-value="maskInc.masked(input.value)"
		:type="'phone'"
		:maxlength="mask.length"
		:error-messages="errorMessages"
		:placeholder="mask"
		@update:model-value="update"
		@blur="blur"
	>
		<template v-if="required" #append-inner>
			<v-icon icon="mdi mdi-asterisk" size="x-small" color="red"></v-icon>
		</template>
	</v-text-field>
</template>

<script lang="ts" setup>
import { Mask } from 'maska'

const $props = withDefaults(
	defineProps<{
		modelValue?: string
		errorMessages?: string
		mask?: string
		placeholder?: string
		required?: boolean
	}>(),
	{
		modelValue: '',
		mask: '+7 (7##) ### ## ##',
		errorMessages: '',
		placeholder: '',
		required: false,
	},
)

const $emits = defineEmits(['update:modelValue', 'blur'])

const maskInc = new Mask({
	mask: $props.mask,
	eager: true,
})

const input = ref({
	value: '',
})

const maskNums = computed(() => $props.mask.replaceAll(/\D/g, ''))

onMounted(() => {
	if ($props.modelValue) update($props.modelValue)
})

function update(value: string) {
	const trueVal = maskInc.unmasked(value)
	input.value = {
		value: trueVal,
	}
}

function blur() {
	$emits(
		'update:modelValue',
		maskNums.value + maskInc.unmasked(input.value.value),
	)
	$emits('blur')
}
</script>

<style lang="scss" scoped></style>
