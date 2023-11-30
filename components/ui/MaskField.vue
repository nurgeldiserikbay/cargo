<template>
  <v-text-field :modelValue="mask.masked(modelValue || '')" :error-messages="errorMessages" label="Phone Number"
    v-maska="{ mask: '7 (7##) ### ## ##' }" @update:model-value="update" @onBlur="$emits('blur')">
  </v-text-field>
</template>

<script lang="ts" setup>
import { Mask } from 'maska'

const $props = withDefaults(defineProps<{
  modelValue?: string,
  errorMessages?: string,
  mask?: string
}>(), {
  mask: '+7(###)-###-##-##'
})

const $emits = defineEmits(['update:modelValue', 'blur'])

const mask = new Mask({ mask: $props.modelValue, eager: true })

function update(value: string) {
  $emits('update:modelValue', mask.unmasked(value))
}
</script>

<style lang="scss" scoped></style>