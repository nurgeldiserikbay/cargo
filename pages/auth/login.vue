<template>
  <v-container>
    <div class="flex-grow-1 d-flex flex-col justify-center items-center pt-6">
      <v-card class="d-flex flex-col items-center w-full max-w-400px px-5 py-5 pb-6 mb-12 rounded-lg">
        <div class="text-2xl mb-4 capitalize lg:(text-3xl)">{{ $t('pages.login') }}</div>
        <form @submit.prevent="submit" class="w-full grid gap-x-3 gap-y-4">
          <MaskField v-bind="phoneNumber" :label="$t('labels.phoneNumber')" :error-messages="zodI18n(errors.phoneNumber)">
          </MaskField>
          <v-text-field v-bind="password" :label="$t('labels.password')"
            :error-messages="zodI18n(errors.password)"></v-text-field>
          <div class="d-flex justify-center">
            <v-btn variant="elevated" type="submit">
              {{ $t('pages.login') }}
            </v-btn>
          </div>
        </form>
        <NuxtLinkLocale :to="'/auth/register'" class="mt-8 no-underline text-color1">{{ $t('pages.register') }}
        </NuxtLinkLocale>
      </v-card>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import validator from 'validator'

const { setError } = useAllert()
const localePath = useLocalePath()
const { setLoading } = useLoading()
const { t: $t } = useI18n()

definePageMeta({
  auth: false,
  unauthenticatedOnly: true,
  layout: 'auth-layout',
})

const schema = toTypedSchema(
  z.object({
    phoneNumber: z.string().refine((v) => validator.isMobilePhone(v)),
    password: z.string().min(4),
  })
)

const { errors, handleSubmit, defineComponentBinds } = useForm({
  validationSchema: schema,
})

const phoneNumber = defineComponentBinds('phoneNumber')
const password = defineComponentBinds('password')

const { status, signIn } = useAuth()

const submit = handleSubmit(async (values) => {
  try {
    setLoading('global', true)
    await signIn(values, { callbackUrl: localePath('/') })
    if (status.value === 'unauthenticated') setError({ title: status.value || '' })
  } catch (e: any) {
    setError({ title: $t('messages.loginError') })
  }
  finally {
    setLoading('global', false)
  }
}, (err) => {
  console.log('errr', err)
})
</script>

<style lang="scss" scoped></style>