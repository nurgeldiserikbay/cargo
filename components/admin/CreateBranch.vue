<template>
	<v-form>
		<v-container>
			<v-row class="text-h6 text-left" :justify="'space-between'">
				<v-col>{{ $t('titles.branches') }}</v-col>
			</v-row>
			<v-row :align="'stretch'">
				<v-col cols="12" md="4" order="1">
					<v-text-field
						v-bind="name"
						:label="$t('labels.branchName')"
						:error-messages="zodI18n(errors.name)"
						hide-details
					></v-text-field>
				</v-col>
				<v-col cols="12" md="4" order="2">
					<SelectCity
						v-bind="locationId"
						:label="$t('labels.city')"
						:error-messages="zodI18n(errors.locationId)"
					/>
				</v-col>
				<v-col
					cols="12"
					md="4"
					order="4"
					order-md="3"
					class="flex justify-end gap-5"
				>
					<v-btn
						variant="elevated"
						type="submit"
						color="secondary"
						size="x-large"
						@click.prevent="submit"
					>
						{{ selectedBranch ? $t('commands.update') : $t('commands.submit') }}
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
				<v-col cols="12" md="8" order="3" order-md="4">
					<v-textarea
						v-bind="address"
						:rows="1"
						:label="$t('labels.branchAddress')"
						:error-messages="zodI18n(errors.name)"
					></v-textarea>
				</v-col>
			</v-row>
		</v-container>
	</v-form>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import type { IBranch } from '~/types/branch'

const { $api } = useNuxtApp()
const { t: $t } = useI18n()
const $props = defineProps<{
	selectedBranch?: IBranch
}>()
const $emits = defineEmits(['clear', 'added'])
const { setLoading } = useLoading()
const { setError, setSuccess } = useAllert()

const schema = toTypedSchema(
	z.object({
		name: z.string().min(1).max(500),
		address: z.string().min(1).max(500),
		locationId: z.number(),
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

const name = defineComponentBinds('name')
const address = defineComponentBinds('address')
const locationId = defineComponentBinds('locationId')

watch(
	() => $props.selectedBranch,
	() => {
		if (!$props.selectedBranch) return
		setValues($props.selectedBranch)
	},
)

const submit = handleSubmit(
	async () => {
		try {
			if (!values.name || !values.address || !values.locationId) return
			setLoading('global', true)
			const { status, data, error } = $props.selectedBranch
				? await $api.branch.updateBranch($props.selectedBranch.id, {
						name: values.name,
						address: values.address,
						locationId: values.locationId,
				  })
				: await $api.branch.createBranch({
						name: values.name,
						address: values.address,
						locationId: values.locationId,
				  })
			if (status.value === 'success') {
				$emits('added', data.value)
				setSuccess({
					title: $t('messages.successBranchCreate'),
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
