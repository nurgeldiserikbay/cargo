<template>
	<v-container class="!pt-10">
		<v-row class="mb-10" :justify="'space-between'">
			<v-col class="text-h4 text-center"
				>{{ $t('titles.checkProduct') }}
				<span v-if="user?.warehouseId"
					>({{ getBranchName(user?.warehouseId) }})</span
				></v-col
			>
		</v-row>
		<v-form class="max-w-500px m-auto flex flex-col">
			<v-text-field
				v-bind="trackCode"
				:label="$t('labels.trackCode')"
				:error-messages="zodI18n(errors.trackCode)"
				hide-details
				:clearable="true"
				:autofocus="true"
				type="textarea"
			></v-text-field>
			<v-checkbox
				v-model="autoFetch"
				:label="$t('labels.autoFetch')"
				color="indigo"
				value="indigo"
				hide-details
				class="mb-5 self-end"
			></v-checkbox>
			<v-row>
				<v-btn
					variant="elevated"
					type="submit"
					color="secondary"
					size="x-large"
					class="m-auto"
					@click.prevent="getProduct"
				>
					{{ $t('labels.search') }}
				</v-btn>
				<v-btn
					variant="elevated"
					type="submit"
					color="primary"
					size="x-large"
					class="m-auto"
					@click.prevent="submit"
				>
					{{ $t('commands.submit') }}
				</v-btn>
			</v-row>
			<v-card v-if="searchedValue" class="mt-8 px-4 py-2">
				<v-row>
					<v-col class="border-r-(1 solid #000) border-b-(1 solid #000)">{{
						$t('labels.description')
					}}</v-col>
					<v-col class="border-b-(1 solid #000)">{{
						`${searchedValue.productDescription}`
					}}</v-col>
				</v-row>
				<v-row>
					<v-col class="border-r-(1 solid #000) border-b-(1 solid #000)">{{
						$t('labels.city')
					}}</v-col>
					<v-col class="border-b-(1 solid #000)">{{
						searchedValue.locationName
					}}</v-col>
				</v-row>
				<v-row>
					<v-col class="border-r-(1 solid #000) border-b-(1 solid #000)">{{
						$t('labels.branch')
					}}</v-col>
					<v-col class="border-b-(1 solid #000)">{{
						searchedValue.warehouseName
					}}</v-col>
				</v-row>
				<v-row>
					<v-col class="border-r-(1 solid #000) border-b-(1 solid #000)">{{
						$t('labels.fullName')
					}}</v-col>
					<v-col class="border-b-(1 solid #000)">{{
						`${searchedValue.lastName} ${searchedValue.firstName}`
					}}</v-col>
				</v-row>
				<v-row>
					<v-col class="border-r-(1 solid #000) border-b-(1 solid #000)">{{
						$t('labels.phoneNumber')
					}}</v-col>
					<v-col class="border-b-(1 solid #000)">{{
						searchedValue.phoneNumber
					}}</v-col>
				</v-row>
			</v-card>
		</v-form>
	</v-container>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

import { useBranchStore } from '~/store/branch'
import type { IProductOwner } from '~/types/product'

definePageMeta({
	layout: 'admin-layout',
	auth: true,
	accesses: [ROLES.ROLE_ADMIN, ROLES.ROLE_MANAGER],
})

const branchStore = useBranchStore()
const { $api } = useNuxtApp()
const { t: $t } = useI18n()
const { setLoading } = useLoading()
const { setError, setSuccess } = useAllert()
const { data: user } = useAuth()
const getBranch = computed(() => (id: number) => branchStore.getBranchById(id))
const getBranchName = computed(
	() => (id: number) => getBranch.value(id)?.address || '',
)

const schema = toTypedSchema(
	z.object({
		trackCode: z.string().min(1).max(500),
	}),
)

const { errors, values, handleSubmit, defineComponentBinds, handleReset } =
	useForm({
		validationSchema: schema,
	})

const trackCode = defineComponentBinds('trackCode')
const autoFetch = ref(false)
const searchedValue = ref<IProductOwner | null>(null)
let timerId: ReturnType<typeof setTimeout> | null = null

watch(
	() => values.trackCode,
	() => {
		if (!autoFetch.value) return

		if (timerId) clearTimeout(timerId)

		timerId = setTimeout(() => {
			fetchProduct()
		}, 300)
	},
)

onMounted(async () => {
	await branchStore.fetchBranches()
})

const submit = handleSubmit(
	() => {
		if (timerId) clearTimeout(timerId)

		fetchProduct()
	},
	() => {},
)

function parseCodes(trackCodes: string) {
	return trackCodes.split(' ')
}

async function getProduct() {
	try {
		if (!values.trackCode) return
		setLoading('global', true)

		const { status, error, data } = await $api.product.getProductOwnerById(
			values.trackCode,
		)
		if (status.value === 'success') {
			searchedValue.value = data.value
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
}

async function fetchProduct() {
	try {
		if (!values.trackCode) return
		setLoading('global', true)

		const trackCodes = parseCodes(values.trackCode)
		const { status, error } = await $api.product.updateByTrackCodes(trackCodes)
		if (status.value === 'success') {
			setSuccess({
				title: $t('messages.successProductRegistered'),
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
}
</script>

<style lang="scss" scoped></style>
