<template>
	<v-container
		class="product-list flex-grow-1 d-flex flex-col justify-start items-center"
	>
		<div
			class="w-full md:max-w-70vw flex justify-around items-center gap-x-2 mt-15 relative mb-12"
		>
			<v-btn
				v-for="place in CONTENT.places"
				:key="place.id"
				:size="$vuetify.display.mdAndDown ? 'small' : 'default'"
				:active="place.type === currentType"
				:color="
					place.type === currentType ? 'teal-accent-2' : 'light-blue-lighten-2'
				"
				class="relative"
				@click="changeType(place.type)"
			>
				<div
					v-if="productsCount && productsCount[place.type]"
					class="absolute left-0 top-0 z-1 px-2 py-0 rounded-xl text-sm transform -translate-x-1/2 -translate-y-1/2 bg-yellow-200"
				>
					{{
						productsCount[place.type] > 100 ? '+99' : productsCount[place.type]
					}}
				</div>
				<span class="mr-2 font-500">{{
					place.type ? $t(`places.${place.type}`) : $t(`labels.shop`)
				}}</span>
			</v-btn>
		</div>

		<v-card class="w-full">
			<v-data-iterator :items="productList" :items-per-page="perPage">
				<template #default="{ items }">
					<v-expansion-panels variant="accordion" class="condensed">
						<template v-for="(item, i) in items" :key="i">
							<v-expansion-panel size="small">
								<template #title>
									<div class="flex gap-x-2 grow-1">
										<div class="text-md basis-50 grow-1 max-w-[42%]">
											<span>{{ (curPage - 1) * perPage + i + 1 }}</span>
											{{ item.raw.trackCode }}
										</div>
										<div class="text-xs grow-1 max-w-[46%]">
											{{ item.raw.description }}
										</div>
										<v-btn
											v-if="currentType === LOCATION_TYPES.KZ"
											:size="'small'"
											color="secondary"
											class="relative !color-color1"
											@click.stop.prevent="sendToArchive(item.raw.id)"
										>
											{{ $t(`commands.archive`) }}
										</v-btn>
										<v-btn
											v-if="
												currentType === LOCATION_TYPES.NULL ||
												currentType === ''
											"
											:size="'small'"
											color="error"
											class="relative !color-color1"
											@click.stop.prevent="deleteProduct(item.raw.id)"
										>
											{{ $t(`commands.delete`) }}
										</v-btn>
									</div>
								</template>
								<template #text>
									<ProdictHistory :id="item.raw.id"></ProdictHistory>
								</template>
							</v-expansion-panel>
						</template>
					</v-expansion-panels>
				</template>
				<template #no-data>
					<ListEmptyBanner></ListEmptyBanner>
				</template>
			</v-data-iterator>
			<v-pagination
				v-if="pagesCount > 1"
				:model-value="curPage"
				:length="pagesCount"
				class="mt-4 mb-5"
				:size="'x-small'"
				@update:model-value="changePage"
			></v-pagination>
		</v-card>
	</v-container>
</template>

<script lang="ts" setup>
import type { LocationTypes } from '~/types/location'
import type {
	IProductInfo,
	IProductInfoSearch,
	IProductsCount,
} from '~/types/product'

definePageMeta({
	layout: 'user-layout',
	auth: true,
	accesses: [ROLES.ROLE_USER],
})

const localePath = useLocalePath()
const $router = useRouter()
const $route = useRoute()
const { $api } = useNuxtApp()
const { setLoading } = useLoading()

const currentType = computed(() => {
	return String($route.query.type || '')
})
const curPage = computed(() => {
	return Number($route.query.page || 1)
})
const perPage = ref(10)
const productList = ref<IProductInfo[]>([])
const pagesCount = ref(0)
const productsCount = ref<null | IProductsCount>(null)

await fetchList()

watch(
	() => $route.query,
	() => {
		fetchList()
	},
)

async function fetchList() {
	try {
		setLoading('global', true)
		const opt: IProductInfoSearch = {
			paged: true,
			page: curPage.value - 1,
			size: perPage.value,
		}
		if (currentType.value && currentType.value !== LOCATION_TYPES.NULL)
			opt.locationType = currentType.value as LocationTypes
		const { status, data } = await $api.product.getAllProducts(opt)
		if (status.value === 'success') {
			productList.value = data.value?.content || []
			pagesCount.value = data.value?.totalPages || 0
		}

		const { data: d } = await $api.product.getProductsCount()
		if (d) productsCount.value = d.value
	} catch (error: any) {
		throw new Error(error)
	} finally {
		setLoading('global', false)
	}
}

async function sendToArchive(productId: number) {
	try {
		setLoading('global', true)
		const { status } = await $api.product.sendToArchive(productId)
		if (status.value === 'success') {
			fetchList()
		}
	} catch (error: any) {
		throw new Error(error)
	} finally {
		setLoading('global', false)
	}
}

async function deleteProduct(productId: number) {
	try {
		setLoading('global', true)
		const { status } = await $api.product.deleteProduct(productId)
		if (status.value === 'success') {
			fetchList()
		}
	} catch (error: any) {
		throw new Error(error)
	} finally {
		setLoading('global', false)
	}
}

function changeType(type?: string) {
	$router.push({
		path: localePath($route.path),
		query: { type: type || '' },
	})
}

function changePage(page: number) {
	$router.push({
		path: localePath($route.path),
		query: { type: currentType.value || '', page },
	})
}
</script>

<style lang="scss" scoped>
:deep(.v-expansion-panel-title) {
	padding: 6px 10px;
	min-height: 32px;
}

:deep(.v-expansion-panel-text__wrapper) {
	padding: 0 !important;
}

:deep(
		.v-expansion-panel--active
			> .v-expansion-panel-title:not(.v-expansion-panel-title--static)
	) {
	min-height: 32px;
}
</style>
