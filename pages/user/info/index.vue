<template>
	<v-container
		class="flex-grow-1 d-flex flex-col justify-start items-center pt-10"
	>
		<v-card
			class="d-flex flex-col items-start w-full max-w-1200px pt-8 px-8 pb-10 rounded-lg"
		>
			<NuxtLinkLocale
				v-for="link in CONTENT.infoList"
				:key="link.to"
				:to="link.to"
				class="text-h5 mb-6 text-left capitalize text-color1"
			>
				{{ $t(link.text) }}</NuxtLinkLocale
			>
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
