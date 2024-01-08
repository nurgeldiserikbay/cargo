<template>
	<v-container
		class="settings flex-grow-1 d-flex flex-col justify-start items-center pt-10"
	>
		<v-card
			class="w-full min-h-[50vh] border-box px-5 py-6 relative !overflow-visible"
		>
			<v-row class="mb-4">
				<v-col class="!p-1">
					<div class="text-h4">
						{{ edit ? $t('pages.settingsChange') : $t('pages.settings') }}
					</div>
				</v-col>
				<v-col
					v-if="!edit"
					cols="12"
					md="3"
					class="flex justify-end items-center"
				>
					<v-btn :color="'yellow'" @click="edit = true">
						<span class="mr-2">{{ $t('commands.change') }}</span>
						<v-icon
							:icon="`mdi mdi-pencil-box-multiple-outline`"
							size="x-large"
						></v-icon>
					</v-btn>
				</v-col>
			</v-row>
			<v-row :class="{ 'border-b border-color-color2': !edit }">
				<v-col cols="12" md="3" class="!p-1 font-600">
					{{ $t('labels.firstName') }}:
				</v-col>
				<v-col class="!p-1">
					<template v-if="edit">
						<v-text-field
							v-bind="firstName"
							variant="underlined"
							:error-messages="zodI18n(errors.firstName)"
						>
							<template #append-inner>
								<v-icon
									icon="mdi mdi-asterisk"
									size="x-small"
									color="red"
								></v-icon>
							</template>
						</v-text-field>
					</template>
					<template v-else>
						<div>{{ user?.firstName }}</div>
					</template>
				</v-col>
			</v-row>
			<v-row :class="{ 'border-b border-color-color2': !edit }">
				<v-col cols="12" md="3" class="!p-1 font-600">
					{{ $t('labels.lastName') }}:
				</v-col>
				<v-col class="!p-1">
					<template v-if="edit">
						<v-text-field
							v-bind="lastName"
							variant="underlined"
							:error-messages="zodI18n(errors.lastName)"
						>
							<template #append-inner>
								<v-icon
									icon="mdi mdi-asterisk"
									size="x-small"
									color="red"
								></v-icon>
							</template>
						</v-text-field>
					</template>
					<template v-else>
						<div>{{ user?.lastName }}</div>
					</template>
				</v-col>
			</v-row>
			<v-row :class="{ 'border-b border-color-color2': !edit }">
				<v-col cols="12" md="3" class="!p-1 font-600">
					{{ $t('labels.email') }}:
				</v-col>
				<v-col class="!p-1">
					<template v-if="edit">
						<v-text-field
							v-bind="email"
							variant="underlined"
							:error-messages="zodI18n(errors.email)"
						></v-text-field>
					</template>
					<template v-else>
						<div>{{ user?.email }}</div>
					</template>
				</v-col>
			</v-row>
			<v-row :class="{ 'border-b border-color-color2': !edit }">
				<v-col cols="12" md="3" class="!p-1 font-600">
					{{ $t('labels.phoneNumber') }}:
				</v-col>
				<v-col class="!p-1">
					<template v-if="edit">
						<MaskField
							v-bind="phoneNumber"
							:required="true"
							:with-labels="false"
							:error-messages="zodI18n(errors.phoneNumber)"
						/>
					</template>
					<template v-else>
						<div>{{ user?.phoneNumber }}</div>
					</template>
				</v-col>
			</v-row>
			<v-row v-if="Number.isFinite(user?.warehouseId)">
				<v-col cols="12" md="3" class="!p-1 font-600">
					{{ $t('labels.branch') }}:
				</v-col>
				<v-col class="!p-1">
					<template v-if="edit">
						<div class="flex justify-between gap-8">
							<SelectBranch
								v-bind="warehouseId"
								:city-id="city"
								:errors="zodI18n(errors.warehouseId)"
								:with-labels="false"
								class="max-w-1/2"
							/>
							<SelectCity
								v-model="city"
								class="max-w-1/2"
								:with-labels="false"
								:location-filter="LOCATION_TYPES.KZ"
							/>
						</div>
					</template>
					<template v-else>
						<div>
							{{ getBranch(user?.warehouseId)?.name }}
						</div>
						<div class="text-sm">
							{{ getBranch(user?.warehouseId)?.address }}
						</div>
					</template>
				</v-col>
			</v-row>
			<v-row v-if="edit">
				<v-col class="flex justify-center gap-5">
					<v-btn :color="'red'" @click="edit = false">
						<span class="mr-2">{{ $t('commands.cancel') }}</span>
						<v-icon :icon="`mdi mdi-cancel`" size="x-large"></v-icon>
					</v-btn>
					<v-btn
						class="me-4"
						variant="elevated"
						type="submit"
						color="green-accent-2"
						:disabled="false"
						@click.prevent="onSubmit"
					>
						{{ $t('commands.save') }}
					</v-btn>
				</v-col>
			</v-row>
			<v-row class="mt-5 mb-3">
				<v-col cols="12" md="4">
					<v-btn @click.stop="togglePS">
						<span class="mr-2">{{ $t('labels.changePassword') }}</span>
					</v-btn>
				</v-col>
			</v-row>
			<v-row v-if="passwordChange" class="items-center">
				<v-col cols="12" md="3">
					<v-text-field
						v-bind="password"
						type="password"
						:label="$t('labels.password')"
						variant="underlined"
						:error-messages="zodI18n(errors.password)"
					>
					</v-text-field>
				</v-col>
				<v-col cols="12" md="3">
					<v-text-field
						v-bind="confirmPassword"
						type="password"
						:label="$t('labels.confirmPassword')"
						variant="underlined"
						:error-messages="zodI18n(errors.confirmPassword)"
					>
					</v-text-field>
				</v-col>
				<v-col cols="12" md="3" class="flex gap-3">
					<v-btn
						:color="'primary'"
						class="mb-3"
						:disabled="!password"
						@click="onSubmit"
					>
						<span class="mr-2">{{ $t('commands.update') }}</span>
					</v-btn>
					<v-btn
						class="mb-3"
						variant="elevated"
						@click="passwordChange = false"
					>
						{{ $t('commands.cancel') }}
					</v-btn>
				</v-col>
			</v-row>
		</v-card>
	</v-container>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

import type { IUserCreate } from '~/types/users'

import { useBranchStore } from '~/store/branch'

definePageMeta({
	layout: 'user-layout',
	auth: true,
	accesses: [ROLES.ROLE_USER],
})

const { $api } = useNuxtApp()
const { t: $t } = useI18n()
const { setLoading } = useLoading()
const { setError, setSuccess } = useAllert()
const branchStore = useBranchStore()
const { data: user, getSession } = useAuth()

const edit = ref(false)
const passwordChange = ref(false)
const schema = toTypedSchema(
	z.object({
		firstName: z.string().min(1).max(200),
		lastName: z.string().min(1).max(200),
		email: z.string().email(),
		password: z.string().min(4).optional(),
		confirmPassword: z.string().min(4).optional(),
		phoneNumber: z.string(),
		warehouseId: z.number(),
	}),
)

watch([edit, passwordChange], () => {
	setValues({
		firstName: user.value?.firstName || '',
		lastName: user.value?.lastName || '',
		email: user.value?.email || '',
		phoneNumber: user.value?.phoneNumber || '',
		warehouseId: Number(user.value?.warehouseId),
	})
	values.password = ''
	values.confirmPassword = ''
})

const { errors, values, handleSubmit, defineComponentBinds, setValues } =
	useForm({
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

function onSubmit() {
	submit()
}

const submit = handleSubmit(
	async () => {
		try {
			setLoading('global', true)
			const subData = rmObjFields(
				{
					...values,
					phoneNumber: clearToNums(values.phoneNumber || ''),
				},
				['confirmPassword'],
			)
			const { status, error } = await $api.user.updateUser(
				subData as IUserCreate,
			)
			if (status.value === 'success') {
				edit.value = false
				await getSession()
				setSuccess({
					title: $t('messages.successUpdateData'),
				})
			}
			if (status.value === 'error') {
				setError({ title: $t(`errors.${error.value?.data || ''}`) })
			}
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

const getBranch = computed(() => (id?: number) => branchStore.getBranchById(id))

await branchStore.fetchBranches()

function togglePS() {
	passwordChange.value = !passwordChange.value
}
</script>

<style lang="scss" scoped>
.settings :deep(.v-field__input) {
	padding-top: 3px !important;
}
</style>
