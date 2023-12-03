<template>
  <v-container class="flex-grow-1 d-flex flex-col justify-center items-center pt-10">
    <v-card class="d-flex flex-col items-center w-full max-w-600px px-5 py-5 pb-6 mb-8 rounded-lg">
      <form @submit.prevent="submit" class="w-full gap-x-3 gap-y-4 justify-center">
        <div class="text-h4 mb-7 text-center">{{ $t('titles.addProduct') }}</div>
        <v-text-field v-bind="trackCode" :label="$t('labels.trackCode')"
          :error-messages="zodI18n(errors.trackCode)"></v-text-field>
        <v-text-field v-bind="description" :label="$t('labels.description')"
          :error-messages="zodI18n(errors.description)"></v-text-field>
        <div class="col-span-2 d-flex justify-center">
          <v-btn class="me-4" variant="elevated" type="submit">
            {{ $t('commands.submit') }}
          </v-btn>
        </div>
      </form>
    </v-card>
    <v-card v-if="getFaq.length" class="d-flex flex-col items-start w-full max-w-980p px-5 py-5 pb-6 mb-12 rounded-lg">
      <div class="text-h3 mb-5 text-left">{{ $t('titles.faq') }}</div>
      <v-expansion-panels>
        <v-expansion-panel v-for="faq in getFaq" :key="faq.id" :title="faq.question" :text="faq.answer">
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

const { $api } = useNuxtApp()
const { t: $t } = useI18n()
const { setLoading } = useLoading()
const { setError, setSuccess } = useAllert()

definePageMeta({
  layout: 'user-layout',
  auth: true,
  accesses: [ROLES.ROLE_USER],
})

const schema = toTypedSchema(
  z.object({
    trackCode: z.string().min(1).max(150),
    description: z.optional(z.string().min(1).max(700)),
  })
)

const { errors, values, handleSubmit, defineComponentBinds, handleReset } = useForm({
  validationSchema: schema,
})

const trackCode = defineComponentBinds('trackCode')
const description = defineComponentBinds('description')

const getFaq = computed(() => CONTENT.faq)

const submit = handleSubmit(async () => {
  try {
    if (!values.trackCode) return
    const { status, error } = await $api.product.addProduct({
      trackCode: values.trackCode,
      description: values.description,
    })
    if (status.value === 'success') {
      setSuccess({
        title: $t('messages.successProductAdd')
      })
      handleReset()
    }
    if (status.value === 'error') setError({ title: error.value?.message || '' })
  } catch (e: any) {
    if (e?.response?._data) {
      setError({ title: e.response._data.error || '' })
    }
  }
  finally {
    setLoading('global', false)
  }
}, () => { })
</script>

<style lang="scss" scoped></style>