<template>
	<NuxtLinkLocale :to="localePath('/')" class="d-inline-block">
		<img :src="'/assets/img/logotype.svg'" class="d-block" :height="height" />
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
