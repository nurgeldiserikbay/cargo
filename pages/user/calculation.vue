<template>
	<v-container
		class="flex-grow-1 d-flex flex-col justify-start items-center pt-10"
	>
		<v-card
			class="d-flex flex-col items-center w-full max-w-1200px pt-8 px-8 pb-10 rounded-lg"
		>
			<div class="text-h4 mb-6 text-left capitalize">
				{{ $t('pages.calculation') }}
			</div>
			<div class="w-full text-(lg)">
				<div class="flex justify-between items-center gap-8">
					<div
						class="flex justify-start items-center gap-2 text-h6 leading-none gap-4"
					>
						<v-icon icon="mdi mdi-gold" color="black" size="x-large"></v-icon>
						<span>{{ $t('labels.massCount') }}</span>
					</div>
					<div class="text-h5">
						<span>{{ cost }}</span>
						<span>$</span>
					</div>
				</div>
				<v-divider inset class="my-8 !max-w-full !ms-0"></v-divider>
				<div class="flex justify-between items-center gap-8">
					<div
						class="flex justify-start items-center gap-2 text-h6 leading-none gap-4"
					>
						<v-icon
							icon="mdi mdi-cash-multiple"
							color="black"
							size="x-large"
						></v-icon>
						<span>{{ $t('labels.rate') }}</span>
					</div>
					<div class="text-h5">
						<span>{{ rate }}</span>
						<span> $</span>
					</div>
				</div>
				<v-divider inset class="my-8 !max-w-full !ms-0"></v-divider>
				<div
					class="flex justify-between items-center gap-8 gap-y-4 flex-wrap lg:flex-nowrap"
				>
					<div class="flex-grow max-w-[380px]">
						<div class="text-h6 mb-4">{{ $t('labels.productMass') }}</div>
						<v-text-field
							v-model="mass"
							:floating="true"
							:rules="[
								(v) => (v < 0 ? $t('errors.OnlyPosNumbers') : true),
								(v) => (v > 500 ? $t('errors.maxMass', [500]) : true),
							]"
							variant="solo"
							type="number"
							class="!text-lg"
							hide-spin-buttons
						>
							<template #prepend>
								<v-icon
									icon="mdi mdi-weight-kilogram"
									color="black"
									size="x-large"
								></v-icon>
							</template>
						</v-text-field>
					</div>
					<div class="text-h5">
						<span>
							<span>{{ getTotalPrice.toLocaleString() }}</span>
							<span> $</span>
						</span>
						<span> - </span>
						<span>
							<span>{{ getTotalPriceCur.toLocaleString() }}</span>
							<span> ₸</span>
						</span>
					</div>
				</div>
			</div>
		</v-card>
	</v-container>
</template>

<script lang="ts" setup>
definePageMeta({
	layout: 'user-layout',
	auth: true,
	accesses: [ROLES.ROLE_USER],
})

const cost = ref(4)
const rate = ref(465)
const mass = ref()

const getTotalPrice = computed(() => {
	return (mass.value || 0) * cost.value
})

const getTotalPriceCur = computed(() => {
	return getTotalPrice.value * rate.value
})
</script>

<style lang="scss" scoped></style>
