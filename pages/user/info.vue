<template>
	<v-container
		class="flex-grow-1 d-flex flex-col justify-start items-center pt-10"
	>
		<v-card
			class="w-full max-w-[450px] min-h-[50vh] max-h-[600px] border-box px-5 py-6 relative !overflow-visible"
		>
			<v-btn
				color="yellow"
				:size="'small'"
				:icon="true"
				:rounted="true"
				class="!absolute -top-3 -right-3"
				@click="copyText"
			>
				<v-icon
					:icon="`mdi mdi-pencil-box-multiple-outline`"
					size="x-large"
				></v-icon>
			</v-btn>
			<div v-if="userInfo" class="whitespace-pre-wrap" v-html="userInfo"></div>
		</v-card>
	</v-container>
</template>

<script lang="ts" setup>
const { $api } = useNuxtApp()

definePageMeta({
	layout: 'user-layout',
	auth: true,
	accesses: [ROLES.ROLE_USER],
})

const { data: userInfo } = await $api.user.getUserPageInfo()

function copyText() {
	if (!userInfo.value) return
	navigator.clipboard.writeText(userInfo.value)
}
</script>

<style lang="scss" scoped></style>
