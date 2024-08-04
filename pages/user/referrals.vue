<template>
	<v-container
		class="product-list flex-grow-1 d-flex flex-col justify-start items-center max-h-full overflow-hidden min-h-full"
	>
		<div class="w-full max-h-full">
			<ReferalsItem v-if="getUser" :user="getUser" />
		</div>
	</v-container>
</template>

<script lang="ts" setup>
import type { IReferrals } from '~/types/users'

definePageMeta({
	layout: 'user-layout',
	auth: true,
	accesses: [ROLES.ROLE_USER],
})

const { data: user } = useAuth()

const getUser = computed<IReferrals | null>(() => {
	return user.value
		? ({
				id: user.value.id,
				firstName: user.value.firstName,
				lastName: user.value.lastName,
			} as IReferrals)
		: null
})
</script>

<style lang="scss" scoped>
.bg-container {
	background-color: #d7d7d7;
	background-image: linear-gradient(147deg, #d7d7d7 -30%, #353535 80%);
}
</style>
