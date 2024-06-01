<template>
	<v-container>
		<v-form>
			<v-container>
				<v-row class="text-h6 text-left" :justify="'space-between'">
					<v-col>{{ $t('labels.referrals') }}</v-col>
				</v-row>
				<v-row :align="'stretch'">
					<v-col cols="12" md="4">
						<v-text-field
							v-bind="userId"
							:label="$t('labels.userId')"
							:error-messages="zodI18n(errors.userId)"
						></v-text-field>
					</v-col>
					<v-col cols="12" md="4" class="flex center gap-5">
						<v-btn
							variant="elevated"
							type="submit"
							color="secondary"
							size="x-large"
							@click.prevent="submit"
						>
							{{ $t('commands.view') }}
						</v-btn>
					</v-col>
				</v-row>
			</v-container>
		</v-form>
		<v-divider inset class="my-4 !max-w-full !ms-0"></v-divider>
		<div class="w-full max-h-full">
			<ReferalsItem v-if="getUser" :user="getUser" />
		</div>
	</v-container>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import type { IReferrals } from '~/types/users'

const { $api } = useNuxtApp()
const { t: $t } = useI18n()
const { setLoading } = useLoading()
const { setError } = useAllert()

definePageMeta({
	layout: 'admin-layout',
	auth: true,
	accesses: [ROLES.ROLE_ADMIN],
})

const schema = toTypedSchema(
	z.object({
		userId: z.string().min(1).max(200),
	}),
)

const { errors, values, handleSubmit, defineComponentBinds } = useForm({
	validationSchema: schema,
})

const userId = defineComponentBinds('userId')
const user = ref<IReferrals>()

const getUser = computed<IReferrals | null>(() => {
	return user.value
		? ({
				id: user.value.id,
				firstName: user.value.firstName,
				lastName: user.value.lastName,
			} as IReferrals)
		: null
})

const submit = handleSubmit(
	async () => {
		if (!values.userId) return
		await fetchUser()
	},
	() => {},
)

async function fetchUser() {
	try {
		setLoading('global', true)
		const { data } = await $api.admin.getAdmins({
			query: clearObjFields({
				codeEqual: values.userId,
			}),
		})
		if (data.value?.content?.length) {
			user.value = data.value.content[0]
		}
	} catch (error: any) {
		if (error?.response?._data) {
			setError({ title: error.response._data.error || '' })
		}
	} finally {
		setLoading('global', false)
	}
}
</script>

<style lang="scss" scoped></style>
