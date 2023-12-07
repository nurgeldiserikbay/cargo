<template>
	<div
		v-show="page || show || getLoading('global')"
		class="fixed top-0 left-0 bottom-0 right-0 z-110 w-full h-full flex justify-center items-center bg-dark-200/20"
		@click.stop=""
	>
		<v-progress-circular
			:size="50"
			color="primary"
			indeterminate
		></v-progress-circular>
	</div>
</template>

<script lang="ts" setup>
const nuxtApp = useNuxtApp()

defineProps<{
	show?: boolean
}>()

const { getLoading } = useLoading()

const page = ref(false)

nuxtApp.hook('page:start', () => {
	page.value = true
})

nuxtApp.hook('page:finish', () => {
	page.value = false
})
</script>

<style lang="scss" scoped></style>
