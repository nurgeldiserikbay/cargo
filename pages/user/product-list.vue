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
				@click="changeType(place.type)"
			>
				<span class="mr-2 font-500">{{
					place.type ? $t(`places.${place.type}`) : $t(`labels.shop`)
				}}</span>
			</v-btn>
		</div>

		<v-card class="w-full">
			<v-data-iterator :items="productList">
				<template #default="{ items }">
					<template v-for="(item, i) in items" :key="i">
						<v-expansion-panels variant="accordion" class="condensed">
							<v-expansion-panel size="small">
								<template #title>
									<div class="flex gap-x-2">
										<div class="text-md basis-50">
											<span>{{ (curPage - 1) * perPage + i + 1 }})</span>
											{{ item.raw.trackCode }}
										</div>
										<div class="text-xs">{{ item.raw.description }}</div>
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
import type { IProductInfo, IProductInfoSearch } from '~/types/product'

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
		if (currentType.value) opt.locationType = currentType.value as LocationTypes
		const { status, data } = await $api.product.getAllProducts(opt)
		if (status.value === 'success') {
			productList.value = data.value?.content || []
			pagesCount.value = data.value?.totalPages || 0
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
