<template>
	<v-container>
		<CreateBranch
			:selected-branch="selectedBranch"
			@clear="clear"
			@added="addBranch"
		/>
		<v-divider inset class="my-4 !max-w-full !ms-0"></v-divider>
		<v-data-iterator :items="list" :page="curPage" :items-per-page="perPage">
			<template #default="{ items }">
				<v-list :variant="'elevated'">
					<v-list-item
						v-for="(item, i) in items"
						:key="i"
						:variant="'elevated'"
						class="mb-4 cursor-pointer"
						@click="select(item.raw)"
					>
						<v-row>
							<v-col
								cols="6"
								:align-self="'center'"
								class="border !border-r-(!2px solid color1)"
							>
								<div>{{ item.raw.name }}</div>
								<div>{{ item.raw.address }}</div>
							</v-col>
							<v-col :align-self="'center'">
								{{ getCityName(item.raw.locationId) }}
							</v-col>
							<v-col class="flex justify-end gap-2">
								<v-btn variant="plain" color="primary" :icon="true">
									<v-tooltip activator="parent" branch="top">{{
										$t(`commands.select`)
									}}</v-tooltip>
									<v-icon icon="mdi mdi-button-pointer" size="large"></v-icon>
								</v-btn>
								<v-btn
									variant="plain"
									color="error"
									:icon="true"
									class="cursor-pointer"
									@click.stop="remove(item.raw)"
								>
									<v-tooltip activator="parent" branch="top">{{
										$t(`commands.clear`)
									}}</v-tooltip>
									<v-icon icon="mdi mdi-delete" size="large"></v-icon>
								</v-btn>
							</v-col>
						</v-row>
					</v-list-item>
				</v-list>
			</template>
			<template #no-data>
				<ListEmptyBanner></ListEmptyBanner>
			</template>
		</v-data-iterator>
		<v-divider inset class="my-4 !max-w-full !ms-0"></v-divider>
		<v-pagination
			v-if="pagesCount > 1"
			v-model="curPage"
			:length="pagesCount"
		></v-pagination>
	</v-container>
</template>

<script lang="ts" setup>
import type { IBranch } from '~/types/branch'
import { useLocationStore } from '~/store/location'

const locationStore = useLocationStore()
const { $api } = useNuxtApp()
const { t: $t } = useI18n()
const { setLoading } = useLoading()
const { setError, setSuccess } = useAllert()

definePageMeta({
	layout: 'admin-layout',
	auth: true,
	accesses: [ROLES.ROLE_ADMIN],
})

const selectedBranch = ref<IBranch>()
const curPage = ref(1)
const perPage = ref(5)
const list = ref<IBranch[]>([])
const pagesCount = computed(() => Math.ceil(list.value.length / perPage.value))
const getCityName = computed(
	() => (id: number) => locationStore.getCityById(id)?.name || '',
)

const { data } = await $api.branch.getBranchs()
if (data.value) list.value = data.value

function addBranch(branch: IBranch) {
	if (!selectedBranch.value) list.value.unshift(branch)
	else {
		list.value = list.value.map((e) => (e.id === branch.id ? branch : e))
	}
}

function select(item: IBranch) {
	selectedBranch.value = item
}

function clear() {
	selectedBranch.value = undefined
}

async function remove(item: IBranch) {
	try {
		setLoading('global', true)
		const { status, error } = await $api.branch.removeBranch(item.id)
		if (status.value === 'success') {
			list.value = list.value.filter((e) => e.id !== item.id)
			setSuccess({
				title: $t('messages.successBranchRemove'),
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
</script>

<style lang="scss" scoped></style>
