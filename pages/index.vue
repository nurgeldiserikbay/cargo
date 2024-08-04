<template>
	<div>
		<MainBanner />
		<MainBranches />
		<MainTariffes />
		<MainSteps />
		<MainContacts />
	</div>
</template>

<script lang="ts" setup>
import MainBanner from '@/modules/main/MainBanner.vue'
import MainBranches from '@/modules/main/MainBranches.vue'
import MainTariffes from '@/modules/main/MainTariffes.vue'
import MainSteps from '@/modules/main/MainSteps.vue'
import MainContacts from '@/modules/main/MainContacts.vue'

definePageMeta({
	auth: false,
	unauthenticatedOnly: false,
	layout: 'user-layout',
})
</script>

<style lang="scss" scoped></style>
