<template>
	<v-bottom-navigation class="!bg-blue relative z-120 !h-18 !max-w-full">
		<v-btn
			v-for="link in CONTENT.links"
			:key="link.to"
			:active="localePath(link.to) === $route.path"
			value="recent"
			class="!px-2"
			@click="goToPage(link.to)"
		>
			<component :is="link.icon" class="w-8 h-8 object-contain"></component>
			<span
				class="block px-2 mt-2 rounded-xl text-[color1 center] text-sxs font-600 uppercase break-words"
				>{{ $t(link.text) }}</span
			>
		</v-btn>
	</v-bottom-navigation>
</template>

<script lang="ts" setup>
const localePath = useLocalePath()
const $router = useRouter()
const $route = useRoute()

function goToPage(path: string) {
	$router.push(localePath(path))
}
</script>

<style lang="scss" scoped></style>
