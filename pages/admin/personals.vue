<template>
	<v-container>
		<CreatePersonal
			:selected-user="selectedUser"
			@clear="clear"
			@added="addUser"
		/>
		<v-divider inset class="my-4 !max-w-full !ms-0"></v-divider>
		<v-data-iterator
			:items="list"
			:page="curPage + 1"
			:items-per-page="perPage"
		>
			<template #default="{ items }">
				<v-expansion-panels>
					<v-expansion-panel v-for="(item, i) in items" :key="i">
						<template #title>
							<v-row>
								<v-col
									:align-self="'center'"
									class="border !border-r-(2px solid color1)"
								>
									{{ item.raw.lastName + ' ' + item.raw.firstName }}
								</v-col>
								<v-col class="flex justify-end gap-2">
									<v-btn
										variant="plain"
										color="primary"
										:icon="true"
										@click.stop="select(item.raw)"
									>
										<v-tooltip activator="parent" location="top">{{
											$t(`commands.select`)
										}}</v-tooltip>
										<v-icon icon="mdi mdi-button-pointer" size="large"></v-icon>
									</v-btn>
									<v-switch
										:model-value="!item.raw.locked"
										hide-details
										inset
										:label="
											item.raw.locked ? $t('lables.unlock') : $t('labels.lock')
										"
										@update:model-value="toggleAdmin(item.raw)"
									>
									</v-switch>
								</v-col>
							</v-row>
						</template>
						<template #text>
							<v-row>
								<v-col :align-self="'center'">
									{{ item.raw.phoneNumber }}
								</v-col>
								<v-col
									:align-self="'center'"
									class="border !border-r-(2px solid color1)"
								>
									{{
										getGetCityName(item.raw.warehouseId) +
										getBranchName(item.raw.warehouseId)
									}}
								</v-col>
								<v-col :align-self="'center'"> {{ item.raw.password }}+ </v-col>
							</v-row>
						</template>
					</v-expansion-panel>
				</v-expansion-panels>
			</template>
			<template #no-data>
				<ListEmptyBanner></ListEmptyBanner>
			</template>
		</v-data-iterator>
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
const { setError, setSuccess } = useAllert()

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
const pagesCount = computed(() => Math.ceil(totalCount.value / perPage.value))
const getBranch = computed(() => (id: number) => branchStore.getBranchById(id))
const getBranchName = computed(
	() => (id: number) => getBranch.value(id)?.name || '',
)
const getGetCityName = computed(() => (id: number) => {
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

await fetchUsers()

async function fetchUsers() {
	try {
		setLoading('global', true)
		const { data } = await $api.admin.getAdmins({
			query: {
				size: perPage.value,
				page: curPage.value - 1,
			},
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

async function toggleAdmin(item: IAdminUser) {
	try {
		setLoading('global', true)
		const { status, error } = await $api.admin.updateAdmin(item.id, {
			...item,
			locked: !item.locked,
		})
		if (status.value === 'success') {
			list.value = list.value.filter((e) => e.id !== item.id)
			setSuccess({
				title: $t('messages.successAdminRemove'),
			})
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

function changePage(num: number) {
	$router.push({
		path: localePath($route.path),
		query: { page: num },
	})
}
</script>

<style lang="scss" scoped></style>
