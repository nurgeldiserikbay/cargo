<template>
	<div
		v-if="token && user?.promoCode"
		:title="$t('labels.yourCode')"
		class="cursor-pointer text-(xs center gray/80) leading-none"
		@click="copyText"
	>
		<div class="mb-1">
			<span>{{ $t('labels.yourCode') }}</span>
		</div>
		<div class="text-dark">
			<i class="mdi mdi-pencil-box-multiple-outline mr-1"></i>
			<span>{{ user?.promoCode }}</span>
		</div>
	</div>
</template>

<script lang="ts" setup>
const { data: user, token } = useAuth()

function copyText() {
	if (!user.value?.promoCode) return
	navigator.clipboard.writeText(user.value.promoCode)
}
</script>

<style lang="scss" scoped></style>
