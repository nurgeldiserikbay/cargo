<template>
  <v-container class="!pt-10">
    <v-row class="mb-10" :justify="'space-between'">
      <v-col class="text-h4 text-center">{{ $t('titles.checkProduct') }}</v-col>
    </v-row>
    <v-form class="max-w-500px m-auto flex flex-col">
      <v-text-field v-bind="trackCode" :label="$t('labels.trackCode')" :error-messages="zodI18n(errors.trackCode)"
        hide-details :clearable="true" :autofocus="true"></v-text-field>
      <v-checkbox v-model="autoFetch" :label="$t('labels.autoFetch')" color="indigo" value="indigo" hide-details
        class="mb-5 self-end"></v-checkbox>
      <v-btn variant="elevated" type="submit" color="secondary" size="x-large" class="m-auto" @click.prevent="submit">
        {{ $t('commands.submit') }}
      </v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

definePageMeta({
  layout: 'admin-layout',
  auth: true,
  accesses: [ROLES.ROLE_MANAGER],
})

const { $api } = useNuxtApp()
const { t: $t } = useI18n()
const { setLoading } = useLoading()
const { setError, setSuccess } = useAllert()

const schema = toTypedSchema(
  z.object({
    trackCode: z.string().min(1).max(500),
  })
)

const { errors, values, handleSubmit, defineComponentBinds, handleReset } = useForm({
  validationSchema: schema,
})

const trackCode = defineComponentBinds('trackCode')
const autoFetch = ref(false)
let timerId: ReturnType<typeof setTimeout> | null = null

watch(() => values.trackCode, () => {
  if (!autoFetch.value) return

  if (timerId) clearTimeout(timerId)

  timerId = setTimeout(() => {
    fetchProduct()
  }, 300)
})

const submit = handleSubmit(async () => {
  if (timerId) clearTimeout(timerId)

  fetchProduct()
}, () => { })

async function fetchProduct() {
  try {
    if (!values.trackCode) return
    setLoading('global', true)
    const { status, error } = await $api.product.updateByTrackCode(values.trackCode)
    if (status.value === 'success') {
      setSuccess({
        title: $t('messages.successProductRegistered')
      })
      handleReset()
    }
    if (status.value === 'error') setError({ title: error.value?.message || '' })
  } catch (error: any) {
    if (error?.response?._data) {
      setError({ title: error.response._data.error || '' })
    }
  }
  finally {
    setLoading('global', false)
  }
}
</script>

<style lang="scss" scoped></style>