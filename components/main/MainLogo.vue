<template>
	<NuxtLinkLocale :to="localePath('/')" class="d-inline-block !my-0">
		<img
			src="@/assets/img/logotype.png"
			alt=""
			class="d-block"
			:style="{ height: `${height}px` }"
		/>
	</NuxtLinkLocale>
</template>

<script lang="ts" setup>
const localePath = useLocalePath()

withDefaults(
	defineProps<{
		height?: number
	}>(),
	{
		height: 40,
	},
)
</script>

<style lang="scss" scoped></style>
