<template>
	<v-container
		class="product-list flex-grow-1 d-flex flex-col justify-start items-center"
	>
		<div class="w-full">
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

<style lang="scss" scoped></style>
