<template>
	<NuxtLinkLocale :to="localePath('/')" class="d-inline-block">
		<NuxtImg src="./img/logotype.png" class="d-block" :height="height" />
	</NuxtLinkLocale>
</template>

<script lang="ts" setup>
const localePath = useLocalePath()

withDefaults(
	defineProps<{
		height?: number
	}>(),
	{
		height: 60,
	},
)
</script>

<style lang="scss" scoped></style>
