<template>
	<section class="pb-3">
		<v-container>
			<div class="bg-light pt-4 pb-8 px -2 rounded-md box-border">
				<h2 class="text-(3xl) mb-3">{{ $t('titles.tariffs') }}</h2>
				<div class="grid grid-cols-1 gap-4 sm:(grid-cols-2)">
					<div
						class="bg-backColor px-2 py-3 rounded-md text-center md:(text-(xl))"
					>
						<p>{{ $t('labels.cost_and_mass') }}</p>
						<p class="text-(lg primary) font-extrabold md:(text-(3xl))">
							{{ $t('labels.cost_to_mass', [cost]) }}
						</p>
					</div>
					<div
						class="bg-backColor px-2 py-3 rounded-md text-center md:(text-(xl))"
					>
						<p>{{ $t('labels.timeDeliver') }}</p>
						<p class="text-(lg primary) font-extrabold md:(text-(3xl))">
							{{ $t('labels.days', ['7-14']) }}
						</p>
					</div>
				</div>
			</div>
		</v-container>
	</section>
</template>

<script lang="ts" setup>
const cost = ref(1900)
</script>

<style lang="scss" scoped></style>
