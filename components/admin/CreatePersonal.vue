<template>
	<v-form>
		<v-container>
			<v-row class="text-h6 text-left" :justify="'space-between'">
				<v-col>{{ $t('titles.personal') }}</v-col>
			</v-row>
			<v-row :align="'stretch'">
				<v-col cols="12" md="3">
					<v-text-field
						v-bind="firstName"
						:label="$t('labels.firstName')"
						:error-messages="zodI18n(errors.firstName)"
					></v-text-field>
				</v-col>
				<v-col cols="12" md="3">
					<v-text-field
						v-bind="lastName"
						:label="$t('labels.lastName')"
						:error-messages="zodI18n(errors.lastName)"
					></v-text-field>
				</v-col>
				<v-col cols="12" md="3">
					<MaskField
						v-bind="phoneNumber"
						:label="$t('labels.phoneNumber')"
						:error-messages="zodI18n(errors.phoneNumber)"
					>
					</MaskField>
				</v-col>
				<v-col cols="12" md="3">
					<v-text-field
						v-bind="email"
						:label="$t('labels.email')"
						:error-messages="zodI18n(errors.email)"
					></v-text-field>
				</v-col>
				<v-col cols="12" md="4">
					<v-text-field
						v-bind="password"
						:label="$t('labels.password')"
						:error-messages="zodI18n(errors.password)"
					></v-text-field>
				</v-col>
				<v-col cols="12" md="4">
					<SelectCity v-model="city" />
				</v-col>
				<v-col cols="12" md="4">
					<SelectBranch
						v-bind="warehouseId"
						:city-id="city"
						:errors="zodI18n(errors.warehouseId)"
					/>
				</v-col>
				<v-col cols="12" md="4" class="flex center gap-5">
					<v-btn
						variant="elevated"
						type="submit"
						color="secondary"
						size="x-large"
						@click.prevent="submit"
					>
						{{ selectedUser ? $t('commands.update') : $t('commands.submit') }}
					</v-btn>
					<v-btn
						variant="elevated"
						color="error"
						size="x-large"
						@click.prevent="clearForm"
					>
						{{ $t('commands.clear') }}
					</v-btn>
				</v-col>
			</v-row>
		</v-container>
	</v-form>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import validator from 'validator'
import type { IAdminUser } from '~/types/users'

const { $api } = useNuxtApp()
const { t: $t } = useI18n()
const $props = defineProps<{
	selectedUser?: IAdminUser
}>()
const $emits = defineEmits(['clear', 'added'])
const { setLoading } = useLoading()
const { setError, setSuccess } = useAllert()

const schema = toTypedSchema(
	z.object({
		firstName: z.string().min(1).max(200),
		lastName: z.string().min(1).max(200),
		password: z.string().min(4),
		phoneNumber: z
			.string()
			.refine((str) =>
				validator.isMobilePhone(str.replace(/\D/g, ''), 'kk-KZ'),
			),
		warehouseId: z.number(),
		email: z.string().email(),
	}),
)

const {
	errors,
	values,
	handleSubmit,
	defineComponentBinds,
	handleReset,
	setValues,
} = useForm({
	validationSchema: schema,
})

const firstName = defineComponentBinds('firstName')
const lastName = defineComponentBinds('lastName')
const phoneNumber = defineComponentBinds('phoneNumber')
const password = defineComponentBinds('password')
const warehouseId = defineComponentBinds('warehouseId')
const email = defineComponentBinds('email')
const city = ref()

watch(
	() => $props.selectedUser,
	() => {
		if (!$props.selectedUser) return
		setValues($props.selectedUser)
	},
)

const submit = handleSubmit(
	async () => {
		try {
			if (
				!values.firstName ||
				!values.lastName ||
				!values.phoneNumber ||
				!values.password ||
				!values.email ||
				!values.warehouseId
			)
				return
			setLoading('global', true)
			const { status, data, error } = $props.selectedUser
				? await $api.admin.updateAdmin($props.selectedUser.id, {
						firstName: values.firstName,
						lastName: values.lastName,
						phoneNumber: clearToNums(values.phoneNumber || ''),
						password: values.password,
						email: values.email,
						warehouseId: values.warehouseId,
					})
				: await $api.admin.createAdmin({
						firstName: values.firstName,
						lastName: values.lastName,
						phoneNumber: clearToNums(values.phoneNumber || ''),
						password: values.password,
						email: values.email,
						warehouseId: values.warehouseId,
					})

			if (status.value === 'success') {
				$emits('added', data.value)
				setSuccess({
					title: $t('messages.successAdminCreate'),
				})
				handleReset()
			}
			if (status.value === 'error')
				setError({ title: $t(`errors.${error.value?.data || ''}`) })
		} catch (error: any) {
			if (error?.response?._data) {
				setError({ title: error.response._data.error || '' })
			}
		} finally {
			setLoading('global', false)
		}
	},
	() => {},
)

function clearForm() {
	handleReset()
	$emits('clear')
}
</script>

<style lang="scss" scoped></style>
