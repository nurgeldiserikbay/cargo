<template>
	<v-container
		class="product-list flex-grow-1 d-flex flex-col justify-start items-center"
	>
		<v-card class="w-full">
			<div class="text-h4 ml-4 mb-5 mt-6">
				{{ $t('labels.referrals') }}
			</div>
			<v-data-iterator :items="referralsList" :items-per-page="perPage">
				<template #default="{ items }">
					<v-list-item>
						<div class="flex items-center">
							<div class="text-md font-bold basis-10">
								<span>{{ '№' }}</span>
							</div>
							<div class="text-md font-bold basis-10">
								{{ 'ID' }}
							</div>
							<div class="text-md font-bold grow max-w-[30%]">
								{{ $t('labels.firstName') }}
							</div>
							<div class="text-md font-bold grow max-w-[46%]">
								{{ $t('labels.lastName') }}
							</div>
						</div>
					</v-list-item>
					<v-list-item v-for="(item, i) in items" :key="i" height="20">
						<div class="flex items-center">
							<div class="text-md basis-10">
								<span>{{ (curPage - 1) * perPage + i + 1 }}</span>
							</div>
							<div class="text-md basis-10">
								{{ item.raw.id }}
							</div>
							<div class="text-md grow max-w-[30%]">
								{{ `${item.raw.firstName}` }}
							</div>
							<div class="text-md grow max-w-[46%]">
								{{ `${item.raw.lastName}` }}
							</div>
						</div>
					</v-list-item>
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
import type { IReferrals, IReferralsSearch } from '~/types/users'

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
const { data: user } = useAuth()

const curPage = computed(() => {
	return Number($route.query.page || 1)
})
const perPage = ref(10)
const referralsList = ref<IReferrals[]>([])
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
		if (!user.value) return

		setLoading('global', true)
		const opt: IReferralsSearch = {
			paged: true,
			page: curPage.value - 1,
			size: perPage.value,
			id: user.value?.id,
		}

		const { status, data } = await $api.user.getReferrals(opt)
		if (status.value === 'success') {
			if (data.value?.content) referralsList.value = data.value?.content
			pagesCount.value = data.value?.totalPages || 0
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
