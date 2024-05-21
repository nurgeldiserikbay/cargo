<template>
	<div class="flex flex-col items-center">
		<div v-if="user" class="mb-5 px-5 py-2 bg-light-300 rounded-lg">
			<ReferalItem :user="user" :active="true" />
		</div>
		<div class="flex-grow-1 w-full">
			<div
				v-for="(referralRow, referralRowInd) in referrals"
				:key="referralRowInd"
				v-dragscroll
				class="pb-3 overflow-y-hidden w-full hidden-scroll select-none"
			>
				<div class="px-5 py-2 bg-light-300 rounded-lg flex gap-3 w-min">
					<ReferalItem
						v-for="referral in referralRow.list"
						:key="referral.id"
						:user="referral"
						:active="isReferalActive(referralRowInd, referral.id)"
						@click="fetchList(referralRowInd + 1, referral)"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { IReferrals, IReferralsSearch } from '~/types/users'

const { $api } = useNuxtApp()
const { setLoading } = useLoading()

const $props = withDefaults(
	defineProps<{
		active: boolean
		user: IReferrals
	}>(),
	{
		active: false,
	},
)

const referrals = ref<
	{
		seleted: number | null
		list: IReferrals[]
	}[]
>([])

const isReferalActive = computed(() => (ind: number, id: number) => {
	return referrals.value[ind + 1]?.seleted === id
})

watch(
	() => $props.user,
	() => {
		fetchList(0, $props.user)
	},
	{
		immediate: true,
	},
)

async function fetchList(ind: number, referal: IReferrals) {
	try {
		setLoading('global', true)
		const opt: IReferralsSearch = {
			paged: true,
			id: referal.id,
		}

		const { status, data } = await $api.user.getReferrals(opt)

		if (status.value === 'success') {
			if (data.value?.content) {
				const newArr = referrals.value.slice(0, ind)
				newArr[ind] = {
					seleted: referal.id,
					list: data.value.content,
				}
				referrals.value = newArr
			}
		}
	} catch (error: any) {
		throw new Error(error)
	} finally {
		setLoading('global', false)
	}
}
</script>

<style lang="scss" scoped></style>
