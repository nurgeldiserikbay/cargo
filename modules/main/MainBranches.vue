<template>
	<section>
		<v-container>
			<h2 class="text-(3xl) mb-3">{{ $t('titles.ourBranches') }}</h2>
			<div>
				<Swiper
					:slides-per-view="1"
					:loop="true"
					:space-between="'20px'"
					:breakpoints="breakpoints"
				>
					<swiper-slide v-for="branch in branchStore.branches" :key="branch.id">
						<BranchItem :branch="branch" :height="height" />
					</swiper-slide>
				</Swiper>
			</div>
		</v-container>
	</section>
</template>

<script lang="ts" setup>
import BranchItem from '@/modules/branches/BranchItem.vue'

import { useBranchStore } from '~/store/branch'

const breakpoints = {
	480: {
		slidesPerView: 2,
		spaceBetween: 20,
	},
	720: {
		slidesPerView: 3,
		spaceBetween: 30,
	},
	1020: {
		slidesPerView: 4,
		spaceBetween: 40,
	},
}

const branchStore = useBranchStore()
const height = ref(120)

onMounted(async () => {
	await branchStore.fetchBranches()

	const slides = document.querySelectorAll('.swiper-slide')

	if (slides.length) {
		let maxHeight = 120

		for (const elem of slides) {
			const curHeight = elem.getBoundingClientRect().height
			if (curHeight > maxHeight) {
				maxHeight = curHeight
			}
		}

		height.value = maxHeight
	}
})
</script>

<style lang="scss" scoped></style>
