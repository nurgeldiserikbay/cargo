<template>
  <v-container>
    <div class="flex-grow-1 d-flex flex-col justify-center items-center pt-6">
      <v-card class="d-flex flex-col items-center w-full max-w-600px px-5 py-5 pb-6 mb-12 rounded-lg">
        <div class="text-2xl mb-4 capitalize lg:(text-3xl)">{{ $t('pages.register') }}</div>
        <form @submit.prevent="submit" class="w-full grid gap-x-2 gap-y-2 md:(grid-cols-2)">
          <v-text-field v-bind="firstName" :label="$t('labels.firstName')"
            :error-messages="zodI18n(errors.firstName)"></v-text-field>
          <v-text-field v-bind="lastName" :label="$t('labels.lastName')"
            :error-messages="zodI18n(errors.lastName)"></v-text-field>
          <v-text-field v-bind="email" :label="$t('labels.email')" :error-messages="zodI18n(errors.email)"></v-text-field>
          <MaskField v-bind="phoneNumber" :label="$t('labels.phoneNumber')" :error-messages="zodI18n(errors.phoneNumber)">
          </MaskField>
          <v-text-field v-bind="password" :label="$t('labels.password')"
            :error-messages="zodI18n(errors.password)"></v-text-field>
          <v-text-field v-bind="confirmPassword" :label="$t('labels.confirmPassword')"
            :error-messages="zodI18n(errors.confirmPassword)"></v-text-field>
          <SelectCity v-model="city" />
          <SelectBranch v-bind="warehouseId" :cityId="city" />
          <div class="d-flex justify-center md:(col-span-2)">
            <v-btn class="me-4" variant="elevated" type="submit" :disabled="false">
              {{ $t('commands.submit') }}
            </v-btn>
          </div>
        </form>
        <NuxtLinkLocale :to="'/auth/login'" class="mt-8 no-underline text-color1">{{ $t('pages.login') }}</NuxtLinkLocale>
      </v-card>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import validator from 'validator'

import type { IUserCreate } from '~/types/users'

const { $api } = useNuxtApp()
const { t: $t } = useI18n()
const localePath = useLocalePath()
const router = useRouter()
const { setLoading } = useLoading()
const { setError, setSuccess } = useAllert()

definePageMeta({
  auth: false,
  unauthenticatedOnly: true,
  layout: 'auth-layout',
})

const schema = toTypedSchema(
  z.object({
    firstName: z.string().min(1).max(200),
    lastName: z.string().min(1).max(200),
    email: z.optional(z.string().email()),
    password: z.string().min(4),
    confirmPassword: z.string().min(4),
    phoneNumber: z.string().refine((v) => validator.isMobilePhone(v)),
    warehouseId: z.number(),
  }).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match"
      });
    }
  })
)

const { errors, values, handleSubmit, defineComponentBinds } = useForm({
  validationSchema: schema,
})

const firstName = defineComponentBinds('firstName')
const lastName = defineComponentBinds('lastName')
const email = defineComponentBinds('email')
const phoneNumber = defineComponentBinds('phoneNumber')
const password = defineComponentBinds('password')
const confirmPassword = defineComponentBinds('confirmPassword')
const warehouseId = defineComponentBinds('warehouseId')
const city = ref()

const submit = handleSubmit(async () => {
  try {
    setLoading('global', true)
    const subData = rmObjFields(values, ['confirmPassword'])
    const { status, error } = await $api.auth.register(subData as IUserCreate)
    if (status.value === 'success') {
      router.push(localePath('/auth/login'))
      setSuccess({
        title: $t('messages.successRegister')
      })
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