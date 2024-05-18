<template>
	<v-chip
		v-if="token && user?.promoCode"
		class="chip"
		variant="elevated"
		rounded="lg"
		append-icon="mdi mdi-pencil-box-multiple-outline"
		color="yellow"
		@click="copyText"
	>
		<span>{{ user?.promoCode }}</span>
	</v-chip>
</template>

<script lang="ts" setup>
const { data: user, token } = useAuth()

function copyText() {
	if (!user.value?.promoCode) return
	navigator.clipboard.writeText(user.value.promoCode)
}
</script>

<style lang="scss" scoped></style>
