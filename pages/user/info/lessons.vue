<template>
	<v-container
		class="flex-grow-1 d-flex flex-col justify-start items-center pt-10"
	>
		<v-card
			class="d-flex flex-col items-start w-full max-w-1200px pt-8 px-8 pb-10 rounded-lg"
		>
			<BackTo class="mb-4" />
			<div class="block w-full text-h5 mb-6 text-left capitalize text-center">
				{{ $t('pages.lessons') }}
			</div>
			<v-expansion-panels
				v-if="CONTENT.lessons.length"
				variant="accordion"
				class="condensed"
			>
				<v-expansion-panel
					v-for="lesson in CONTENT.lessons"
					:key="lesson.id"
					size="small"
				>
					<template #title>
						<div class="flex gap-x-2 grow-1">
							<div class="text-md basis-50 grow-1 max-w-[42%] cursor-pointer">
								<span>{{ lesson.title }}</span>
							</div>
						</div>
					</template>
					<template #text>
						<iframe
							class="block m-auto max-w-[680px] w-full aspect-video"
							:src="lesson.src"
							title="YouTube video player"
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowfullscreen
						></iframe>
					</template>
				</v-expansion-panel>
			</v-expansion-panels>
			<ListEmptyBanner v-else></ListEmptyBanner>
		</v-card>
	</v-container>
</template>

<script lang="ts" setup>
definePageMeta({
	layout: 'user-layout',
	auth: true,
	accesses: [ROLES.ROLE_USER],
})
</script>

<style lang="scss" scoped></style>
