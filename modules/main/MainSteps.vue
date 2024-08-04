<template>
	<section class="pb-3">
		<v-container>
			<div class="bg-light pt-4 pb-8 px -2 rounded-md box-border break-words">
				<h2 class="text-(3xl) mb-6">{{ $t('titles.how_is_work') }}</h2>
				<div class="flex flex-col items-start gap-5 md:(gap-7)">
					<div
						v-for="(step, stepInd) in STEPS"
						:key="stepInd"
						class="flex items-start gap-2 md:(gap-5)"
					>
						<div
							class="w-10 h-10 flex justify-center items-center rounded-full shrink-0 text-(center lg purple) font-bold bg-purple/15 md:(text-(2xl) w-12 h-12)"
						>
							{{ stepInd + 1 }}
						</div>
						<div>
							<div class="text-lg md:(text-(2xl))">{{ step.text }}</div>
							<NuxtLinkLocale
								v-if="step.link"
								:to="step.link.to"
								class="mt-3 text-(md primary) font-bold no-underline cursor-pointer md:(text-(xl))"
							>
								{{ step.link.text }}
							</NuxtLinkLocale>
						</div>
					</div>
				</div>
			</div>
		</v-container>
	</section>
</template>

<script lang="ts" setup>
const { t: $t } = useI18n()

const STEPS = computed(() => {
	return [
		{
			text: $t('data.main.steps.1'),
			link: isAuthed.value
				? {
						text: $t('labels.getAddress'),
						to: '/user/address',
					}
				: {
						text: $t('labels.getAddress'),
						to: '/auth/login',
					},
		},
		{
			text: $t('data.main.steps.2'),
			link: {
				text: $t('labels.list_of_cancel_products'),
				to: '',
			},
		},
		{
			text: $t('data.main.steps.3'),
		},
		{
			text: $t('data.main.steps.4'),
		},
	]
})

const { data: user } = useAuth()

const isAuthed = computed(() => {
	return !!user.value
})
</script>

<style lang="scss" scoped></style>
