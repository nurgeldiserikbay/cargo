<template>
  <v-text-field :modelValue="maskFunc.masked(modelValue || '')" :error-messages="errorMessages" label="Phone Number" :placeholder="mask"
    @update:model-value="update" @onBlur="$emits('blur')">
  </v-text-field>
</template>

<script lang="ts" setup>
import { Mask } from 'maska'

const $props = withDefaults(defineProps<{
  modelValue?: string,
  errorMessages?: string,
  mask?: string
}>(), {
  mask: '# (###) ### ## ##'
})

const $emits = defineEmits(['update:modelValue', 'blur'])

const maskFunc = new Mask({ mask: $props.mask, eager: true })

function update(value: string) {
  $emits('update:modelValue', maskFunc.unmasked(value))
}
</script>

<style lang="scss" scoped></style>