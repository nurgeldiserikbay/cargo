<template>
	<v-container
		class="product-list flex-grow-1 d-flex flex-col justify-start items-center"
	>
		<v-card class="w-full">
			<div class="text-h4 ml-4 mb-5 mt-6">
				{{ $t('pages.archive') }}
			</div>
			<v-data-iterator :items="productList" :items-per-page="perPage">
				<template #default="{ items }">
					<template v-for="(item, i) in items" :key="i">
						<v-expansion-panels variant="accordion" class="condensed">
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
											:size="'small'"
											color="secondary"
											class="relative !color-color1"
											@click.stop.prevent="sendFromArchive(item.raw.id)"
										>
											{{ $t(`commands.backArchive`) }}
										</v-btn>
									</div>
								</template>
								<template #text>
									<ProdictHistory :id="item.raw.id"></ProdictHistory>
								</template>
							</v-expansion-panel>
						</v-expansion-panels>
					</template>
				</template>
				<template #no-data>
					<ListEmptyBanner class="mt-5 mb-10"></ListEmptyBanner>
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
			state: 'ARCHIVED',
		}

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

async function sendFromArchive(productId: number) {
	try {
		setLoading('global', true)
		const { status } = await $api.product.sendFromArchive(productId)
		if (status.value === 'success') {
			fetchList()
		}
	} catch (error: any) {
		throw new Error(error)
	} finally {
		setLoading('global', false)
	}
}

function changePage(page: number) {
	$router.push({
		path: localePath($route.path),
		query: { page },
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
