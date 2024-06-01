<template>
	<v-container>
		<ControlUsers
			:selected-user="selectedUser"
			@clear="clear"
			@added="addUser"
		/>
		<v-divider inset class="my-4 !max-w-full !ms-0"></v-divider>
		<div class="mt-4">
			<span>{{ $t('labels.totalCount') }}</span
			>: <span>{{ totalCount }}</span>
		</div>
		<div
			v-dragscroll
			class="overflow-y-hidden w-full hidden-scroll select-none"
		>
			<v-table
				density="comfortable"
				:hover="true"
				class="table w-full mt-2 min-w-[1200px]"
			>
				<thead class="w-full">
					<tr class="w-full">
						<th
							class="min-w-[80px] border-r-(1 black solid) px-2 py-1 border-b-(1 black solid)"
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
						<th
							class="border-r-(1 black solid) px-2 py-1 border-b-(1 black solid) min-w-[100px]"
						>
							{{ $t('labels.level') }}
						</th>
						<th
							class="border-r-(1 black solid) px-2 py-1 border-b-(1 black solid) min-w-[100px]"
						>
							{{ $t('labels.active') }}
						</th>
						<th class="px-2 py-1 border-b-(1 black solid)">
							{{ $t('labels.commands') }}
						</th>
					</tr>
				</thead>
				<tbody class="w-full">
					<tr class="w-full">
						<td
							class="min-w-[80px] border-r-(1 black solid) px-2 py-1 border-b-(1 black solid)"
						>
							<v-text-field
								v-model="search.id"
								:placeholder="$t('labels.search')"
							></v-text-field>
						</td>
						<td
							class="border-r-(1 black solid) px-2 py-1 border-b-(1 black solid)"
						>
							<v-text-field
								v-model="search.firstNameLike"
								:placeholder="$t('labels.search')"
							></v-text-field>
						</td>
						<td
							class="border-r-(1 black solid) px-2 py-1 border-b-(1 black solid)"
						>
							<v-text-field
								v-model="search.emailLike"
								:placeholder="$t('labels.search')"
							></v-text-field>
						</td>
						<td
							class="border-r-(1 black solid) px-2 py-1 border-b-(1 black solid)"
						>
							<v-text-field
								v-model="search.phoneNumberLike"
								:placeholder="$t('labels.search')"
							></v-text-field>
						</td>
						<td
							class="border-r-(1 black solid) px-2 py-1 border-b-(1 black solid)"
						></td>
						<td
							class="border-r-(1 black solid) px-2 py-1 border-b-(1 black solid) min-w-[150px]"
						>
							<v-select
								:value="search.level"
								:label="$t('labels.filter')"
								:item-value="'value'"
								:item-title="'label'"
								:items="[
									{ label: $t('labels.all'), value: '' },
									...Object.values(LEVELS_TYPE).map((e) => ({
										label: e,
										value: e,
									})),
								]"
								@update:model-value="search.level = $event"
							></v-select>
						</td>
						<td
							class="border-r-(1 black solid) px-2 py-1 border-b-(1 black solid) min-w-[120px]"
						>
							<v-select
								:value="search.active"
								:label="$t('labels.filter')"
								:item-value="'value'"
								:item-title="'label'"
								:items="[
									{ value: '', label: $t('labels.all') },
									{ value: true, label: $t('labels.yes') },
									{ value: false, label: $t('labels.no') },
								]"
								@update:model-value="search.active = $event"
							></v-select>
						</td>
						<td class="px-2 py-1 border-b-(1 black solid)"></td>
					</tr>
					<tr
						v-for="(item, itemInd) in list"
						:key="item.id"
						class="w-full"
						:class="{ 'bg-gray-300': itemInd % 2 === 0 }"
					>
						<td class="min-w-[80px] border-r-(1 black solid) px-2 py-1">
							{{ item.id }}
						</td>
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
						<td class="border-r-(1 black solid) px-2 py-1 min-w-[100px]">
							<div>
								{{ item.level }}
							</div>
						</td>
						<td class="border-r-(1 black solid) px-2 py-1 min-w-[100px]">
							<div>
								{{ item.active ? $t(`labels.yes`) : $t(`labels.no`) }}
							</div>
						</td>
						<td class="px-2 py-1 flex">
							<v-btn
								variant="plain"
								color="primary"
								:icon="true"
								@click.stop="select(item)"
							>
								<v-tooltip activator="parent" location="top">{{
									$t(`commands.select`)
								}}</v-tooltip>
								<v-icon icon="mdi mdi-button-pointer" size="small"></v-icon>
							</v-btn>
							<v-btn
								variant="plain"
								color="red"
								:icon="true"
								@click.stop="remove(item)"
							>
								<v-tooltip activator="parent" location="top">{{
									$t(`commands.delete`)
								}}</v-tooltip>
								<v-icon icon="mdi mdi-delete" size="small"></v-icon>
							</v-btn>
						</td>
					</tr>
				</tbody>
			</v-table>
		</div>
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

import type { LevelsType } from '~/types/common'
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
	accesses: [ROLES.ROLE_ADMIN],
})

const $route = useRoute()
const $router = useRouter()
const localePath = useLocalePath()
const selectedUser = ref<IAdminUser>()
const perPage = ref(10)
const totalCount = ref(0)
const curPage = computed(() => {
	return Number($route.query.page) || 1
})
const list = ref<IAdminUser[]>([])
const search = reactive<{
	id: string
	emailLike: string
	firstNameLike: string
	phoneNumberLike: string
	level: LevelsType | null
	active: boolean | null
}>({
	id: '',
	emailLike: '',
	firstNameLike: '',
	phoneNumberLike: '',
	level: null,
	active: null,
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

watch(
	() => $route.query,
	() => {
		fetchUsers()
	},
)

watch(
	() => search,
	() => {
		if (fetchId) {
			clearTimeout(fetchId)
			fetchId = null
		}
		fetchId = setTimeout(async () => {
			if (curPage.value === 1) {
				await fetchUsers()
			} else {
				$router.push({
					path: localePath($route.path),
					query: { page: 1 },
				})
			}
		}, 500)
	},
	{ deep: true },
)

await fetchUsers()

onMounted(async () => {
	await branchStore.fetchBranches()
	await locationStore.fetchCities()
})

async function fetchUsers() {
	try {
		setLoading('global', true)
		const { data } = await $api.admin.getAdmins({
			query: clearObjFields({
				size: perPage.value,
				page: curPage.value - 1,
				authorityEqual: ROLES.ROLE_USER,
				codeEqual: search.id,
				emailLike: search.emailLike,
				firstNameLike: search.firstNameLike,
				phoneNumberLike: search.phoneNumberLike,
				active: search.active,
				level: search.level,
			}),
		})
		if (data.value) {
			list.value = data.value.content
			totalCount.value = data.value.totalElements
		}
	} catch (error: any) {
		if (error?.response?._data) {
			setError({ title: error.response._data.error || '' })
		}
	} finally {
		setLoading('global', false)
	}
}

function addUser(user: IAdminUser) {
	if (!selectedUser.value) list.value.unshift(user)
	else list.value = list.value.map((e) => (e.id === user.id ? user : e))
	clear()
}

function select(item: IAdminUser) {
	selectedUser.value = item
}

async function remove(item: IAdminUser) {
	try {
		setLoading('global', true)
		await $api.admin.removeAdmin(item.id)
	} catch (error: any) {
		if (error?.response?._data) {
			setError({ title: error.response._data.error || '' })
		}
	} finally {
		setLoading('global', false)
	}
}

function clear() {
	selectedUser.value = undefined
}

function changePage(num: number) {
	$router.push({
		path: localePath($route.path),
		query: { page: num },
	})
}
</script>

<style lang="scss" scoped></style>
