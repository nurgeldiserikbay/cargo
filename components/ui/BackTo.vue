<template>
	<v-btn :size="'small'" @click="click">
		{{ $t('commands.backTo') }}
	</v-btn>
</template>

<script lang="ts" setup>
const $router = useRouter()
const $localePath = useLocalePath()

const $props = defineProps<{
	to?: string
}>()

function click() {
	if ($props.to) {
		$router.push($localePath($props.to))
	} else {
		$router.back()
	}
}
</script>

<style lang="scss" scoped></style>
