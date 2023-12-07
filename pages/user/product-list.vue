<template>
	<v-container class="flex-grow-1 d-flex flex-col justify-start items-center">
		<div
			class="w-full max-w-70vw flex justify-around items-center gap-x-4 mt-15 relative before:(content-[''] absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-2 bg-white rounded-lg) mb-12"
		>
			<v-btn
				v-for="place in CONTENT.places"
				:key="place.id"
				:rounded="'rounded-circle'"
				:icon="true"
				size="default"
				:active="place.type === currentType"
				:color="
					place.type === currentType ? 'teal-accent-2' : 'light-blue-lighten-2'
				"
				@click="changeType(place.type)"
			>
				<v-tooltip activator="parent" location="top">{{
					place.type ? $t(`places.${place.type}`) : $t(`labels.shop`)
				}}</v-tooltip>
				<v-icon
					v-if="place.icon && !place.iconPath"
					:icon="`mdi mdi-${place.icon}`"
					size="default"
					color="white"
				></v-icon>
				<component
					:is="`svgo-${place.iconPath}`"
					v-if="!place.icon && place.iconPath"
					class="block !w-15 !h-10 !fill-white !stroke-white"
				>
				</component>
			</v-btn>
		</div>

		<v-card class="w-full">
			<v-data-iterator :items="productList">
				<template #default="{ items }">
					<template v-for="(item, i) in items" :key="i">
						<v-expansion-panels variant="accordion">
							<v-expansion-panel>
								<template #title>
									<div>
										<div class="text-h5 mb-3">{{ item.raw.trackCode }}</div>
										<div>{{ item.raw.description }}</div>
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
const perPage = ref(5)
const productList = ref<IProductInfo[]>([])
const pagesCount = computed(() =>
	Math.ceil(productList.value.length / perPage.value),
)

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
			pageNumber: curPage.value,
			pageSize: perPage.value,
		}
		if (currentType.value) opt.locationType = currentType.value as LocationTypes
		const { status, data } = await $api.product.getAllProducts(opt)
		if (status.value === 'success')
			productList.value = data.value?.content || []
	} catch (error: any) {
		throw e
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

<style lang="scss" scoped></style>
