<template>
	<v-container
		class="flex-grow-1 d-flex flex-col justify-start items-center pt-10"
	>
		<v-card
			class="d-flex flex-col items-start w-full max-w-1200px pt-8 px-8 pb-10 rounded-lg"
		>
			<BackTo class="mb-4" />
			<div class="block w-full text-h5 mb-6 text-left capitalize text-center">
				{{ $t('pages.contacts') }}
			</div>
			<ListEmptyBanner></ListEmptyBanner>
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
