<template>
	<v-container>
		<v-form>
			<v-container>
				<v-row class="text-h6 text-left" :justify="'space-between'">
					<v-col>{{ $t('labels.referrals') }}</v-col>
				</v-row>
				<v-row :align="'stretch'">
					<v-col cols="12" md="4">
						<v-text-field
							v-bind="userId"
							:label="$t('labels.userId')"
							:error-messages="zodI18n(errors.userId)"
						></v-text-field>
					</v-col>
					<v-col cols="12" md="4" class="flex center gap-5">
						<v-btn
							variant="elevated"
							type="submit"
							color="secondary"
							size="x-large"
							@click.prevent="submit"
						>
							{{ $t('commands.view') }}
						</v-btn>
					</v-col>
				</v-row>
			</v-container>
		</v-form>
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
						ID
					</th>
					<th
						class="border-r-(1 black solid) px-2 py-1 border-b-(1 black solid)"
					>
						{{ $t('labels.firstName') }}
					</th>
					<th
						class="border-r-(1 black solid) px-2 py-1 border-b-(1 black solid)"
					>
						{{ $t('labels.lastName') }}
					</th>
				</tr>
			</thead>
			<tbody class="w-full">
				<tr
					v-for="(item, itemInd) in referralsList"
					:key="item.id"
					class="w-full"
					:class="{ 'bg-gray-300': itemInd % 2 === 0 }"
				>
					<td class="border-r-(1 black solid) px-2 py-1">{{ item.id }}</td>
					<td class="border-r-(1 black solid) px-2 py-1">
						{{ `${item.firstName}` }}
					</td>
					<td class="border-r-(1 black solid) px-2 py-1">
						{{ `${item.firstName}` }}
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
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import type { IReferrals, IReferralsSearch } from '~/types/users'

const localePath = useLocalePath()
const $router = useRouter()
const $route = useRoute()
const { $api } = useNuxtApp()
const { t: $t } = useI18n()
const { setLoading } = useLoading()

definePageMeta({
	layout: 'admin-layout',
	auth: true,
	accesses: [ROLES.ROLE_ADMIN],
})

const schema = toTypedSchema(
	z.object({
		userId: z.string().min(1).max(200),
	}),
)

const { errors, values, handleSubmit, defineComponentBinds } = useForm({
	validationSchema: schema,
})

const userId = defineComponentBinds('userId')

const submit = handleSubmit(
	async () => {
		try {
			if (!values.userId) return
			setLoading('global', true)
			await fetchList()
		} finally {
			setLoading('global', false)
		}
	},
	() => {},
)

const curPage = computed(() => {
	return Number($route.query.page || 1)
})
const perPage = ref(10)
const referralsList = ref<IReferrals[]>([])
const pagesCount = ref(0)
const totalCount = ref(0)

await fetchList()

watch(
	() => $route.query,
	() => {
		fetchList()
	},
)

async function fetchList() {
	try {
		if (!userId.value?.modelValue) return

		setLoading('global', true)
		const opt: IReferralsSearch = {
			paged: true,
			page: curPage.value - 1,
			size: perPage.value,
			id: userId.value.modelValue,
		}

		const { status, data } = await $api.user.getReferrals(opt)
		if (status.value === 'success') {
			if (data.value?.content) referralsList.value = data.value?.content
			pagesCount.value = data.value?.totalPages || 0
			totalCount.value = data.value?.totalElements || 0
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

<style lang="scss" scoped></style>
