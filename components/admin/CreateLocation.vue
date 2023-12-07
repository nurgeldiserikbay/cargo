<template>
	<v-form>
		<v-container>
			<v-row class="text-h6 text-left" :justify="'space-between'">
				<v-col>{{ $t('titles.locations') }}</v-col>
			</v-row>
			<v-row :align="'stretch'">
				<v-col cols="12" md="4">
					<v-text-field
						v-bind="name"
						:label="$t('labels.cityName')"
						:error-messages="zodI18n(errors.name)"
						hide-details
					></v-text-field>
				</v-col>

				<v-col cols="12" md="4">
					<v-select
						v-bind="type"
						:label="$t('labels.cityType')"
						:items="getCityTypes"
						:error-messages="zodI18n(errors.type)"
					></v-select>
				</v-col>

				<v-col cols="12" md="4" class="flex center gap-5">
					<v-btn
						variant="elevated"
						type="submit"
						color="secondary"
						size="x-large"
						@click.prevent="submit"
					>
						{{
							selectedLocation ? $t('commands.update') : $t('commands.submit')
						}}
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
import type { ICity } from '~/types/location'

const { $api } = useNuxtApp()
const { t: $t } = useI18n()
const $props = defineProps<{
	selectedLocation?: ICity
}>()
const $emits = defineEmits(['clear', 'added'])
const { setLoading } = useLoading()
const { setError, setSuccess } = useAllert()

const schema = toTypedSchema(
	z.object({
		name: z.string().min(1).max(500),
		type: z.enum([
			LOCATION_TYPES.BORDER,
			LOCATION_TYPES.CHINA,
			LOCATION_TYPES.KZ,
		]),
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
const type = defineComponentBinds('type')
const getCityTypes = computed(() => Object.values(LOCATION_TYPES))

watch(
	() => $props.selectedLocation,
	() => {
		if (!$props.selectedLocation) return
		setValues($props.selectedLocation)
	},
)

const submit = handleSubmit(
	async () => {
		try {
			if (!values.name || !values.type) return
			setLoading('global', true)
			const { status, data, error } = $props.selectedLocation
				? await $api.location.updateLocation($props.selectedLocation.id, {
						name: values.name,
						type: values.type,
				  })
				: await $api.location.createLocation({
						name: values.name,
						type: values.type,
				  })

			if (status.value === 'success') {
				$emits('added', data.value)
				setSuccess({
					title: $t('messages.successLocationCreate'),
				})
				handleReset()
			}
			if (status.value === 'error')
				setError({ title: error.value?.message || '' })
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
