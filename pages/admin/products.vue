<template>
	<v-container>
		<v-row class="text-h6 text-left" :justify="'space-between'">
			<v-col>{{ $t('titles.products') }}</v-col>
		</v-row>
		<v-row class="filters" :justify="'space-between'">
			<v-col cols="12" md="4">
				<v-select
					:value="search.locationType"
					:label="$t('labels.cityType')"
					:items="getCityTypes"
					:item-value="'id'"
					:item-title="'label'"
					@update:model-value="search.locationType = $event"
				></v-select>
			</v-col>
		</v-row>
		<v-table density="comfortable" :hover="true" class="table w-full mt-2">
			<thead class="w-full">
				<tr class="w-full">
					<th
						class="border-r-(1 black solid) px-2 py-1 border-b-(1 black solid)"
					>
						№
					</th>
					<th
						class="border-r-(1 black solid) px-2 py-1 border-b-(1 black solid)"
					>
						{{ $t('labels.user') }}
					</th>
					<th
						class="border-r-(1 black solid) px-2 py-1 border-b-(1 black solid)"
					>
						{{ $t('labels.email') }}
					</th>
					<th
						class="border-r-(1 black solid) px-2 py-1 border-b-(1 black solid)"
					>
						{{ $t('labels.phoneNumber') }}
					</th>
					<th
						class="border-r-(1 black solid) px-2 py-1 border-b-(1 black solid)"
					>
						{{ $t('labels.branch') }}
					</th>
				</tr>
			</thead>
			<tbody class="w-full">
				<tr
					v-for="(item, itemInd) in list"
					:key="item.id"
					class="w-full"
					:class="{ 'bg-gray-300': itemInd % 2 === 0 }"
				>
					<td class="border-r-(1 black solid) px-2 py-1">{{ item.id }}</td>
					<td class="border-r-(1 black solid) px-2 py-1">
						{{ `${item.lastName} ${item.firstName}` }}
					</td>
					<td class="border-r-(1 black solid) px-2 py-1">{{ item.email }}</td>
					<td class="border-r-(1 black solid) px-2 py-1">
						{{ item.phoneNumber }}
					</td>
					<td class="border-r-(1 black solid) px-2 py-1">
						<div>
							{{
								`${getCityName(item.warehouseId)} - ${getBranchName(
									item.warehouseId,
								)}`
							}}
						</div>
						<div>{{ getBranch(item.warehouseId)?.description }}</div>
					</td>
				</tr>
			</tbody>
		</v-table>
		<v-divider inset class="my-4 !max-w-full !ms-0"></v-divider>
		<v-pagination
			v-if="pagesCount > 1"
			:model-value="curPage"
			:length="pagesCount"
			:size="'x-small'"
			@update:model-value="changePage($event)"
		></v-pagination>
	</v-container>
</template>

<script lang="ts" setup>
import { useBranchStore } from '~/store/branch'
import { useLocationStore } from '~/store/location'

import type { IProductInfoSearch } from '~/types/product'
import type { IAdminUser } from '~/types/users'

const locationStore = useLocationStore()
const branchStore = useBranchStore()

const { $api } = useNuxtApp()
const { t: $t } = useI18n()
const { setLoading } = useLoading()
const { setError } = useAllert()

definePageMeta({
	layout: 'admin-layout',
	auth: true,
	accesses: [ROLES.ROLE_ADMIN, ROLES.ROLE_MANAGER],
})

const $route = useRoute()
const $router = useRouter()
const localePath = useLocalePath()
const perPage = ref(10)
const totalCount = ref(0)
const curPage = computed(() => {
	return Number($route.query.page) || 1
})
const list = ref<IAdminUser[]>([])
const search = reactive({
	locationType: null,
})
let fetchId: ReturnType<typeof setTimeout> | null = null
const pagesCount = computed(() => Math.ceil(totalCount.value / perPage.value))
const getBranch = computed(() => (id: number) => branchStore.getBranchById(id))
const getBranchName = computed(
	() => (id: number) => getBranch.value(id)?.address || '',
)
const getCityName = computed(() => (id: number) => {
	const locationId = getBranch.value(id)?.locationId

	if (locationId === undefined) return ''
	return locationStore.getCityById(locationId)?.name || '' || ''
})
const getCityTypes = computed(() =>
	Object.values(LOCATION_TYPES)
		.filter((t) => t !== 'NULL')
		.map((v) => {
			return {
				id: v,
				label: $t('places.' + v),
			}
		}),
)

watch(
	() => curPage.value,
	() => {
		fetchProducts()
	},
)

watch(
	() => search,
	() => {
		if (fetchId) {
			clearTimeout(fetchId)
			fetchId = null
		}
		fetchId = setTimeout(() => {
			fetchProducts()
		}, 500)
	},
	{ deep: true },
)

await fetchProducts()

onMounted(async () => {
	await branchStore.fetchBranches()
	await locationStore.fetchCities()
})

async function fetchProducts() {
	try {
		setLoading('global', true)
		const opt: IProductInfoSearch = clearObjFields({
			paged: true,
			page: curPage.value - 1,
			size: perPage.value,
			locationType: search.locationType,
		})
		const { status, data } = await $api.product.getAllProducts(opt)
		if (status.value === 'success') {
			list.value = data.value?.content || []
			totalCount.value = data.value?.totalElements || 0
		}
	} catch (error: any) {
		if (error?.response?._data) {
			setError({ title: error.response._data.error || '' })
		}
	} finally {
		setLoading('global', false)
	}
}

function changePage(num: number) {
	$router.push({
		path: localePath($route.path),
		query: { page: num },
	})
}
</script>

<style lang="scss" scoped></style>
