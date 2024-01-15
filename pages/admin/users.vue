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
					<th class="px-2 py-1 border-b-(1 black solid)">
						{{ $t('labels.commands') }}
					</th>
				</tr>
			</thead>
			<tbody class="w-full">
				<tr class="w-full">
					<td
						class="border-r-(1 black solid) px-2 py-1 border-b-(1 black solid)"
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
					<td class="px-2 py-1 border-b-(1 black solid)"></td>
				</tr>
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
					<td class="px-2 py-1">
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
					</td>
				</tr>
			</tbody>
		</v-table>
		<v-divider inset class="my-4 !max-w-full !ms-0"></v-divider>
		<v-pagination
			v-if="pagesCount > 1"
			:model-value="curPage"
			:length="pagesCount"
			@update:model-value="changePage($event)"
		></v-pagination>
	</v-container>
</template>

<script lang="ts" setup>
import { useBranchStore } from '~/store/branch'
import { useLocationStore } from '~/store/location'

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
const search = reactive({
	id: '',
	emailLike: '',
	firstNameLike: '',
	phoneNumberLike: '',
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
	() => curPage.value,
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
		fetchId = setTimeout(() => {
			fetchUsers()
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
				role: [ROLES.ROLE_USER],
				id: search.id,
				emailLike: search.emailLike,
				firstNameLike: search.firstNameLike,
				phoneNumberLike: search.phoneNumberLike,
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
