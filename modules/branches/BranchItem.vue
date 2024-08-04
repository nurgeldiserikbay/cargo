<template>
	<div
		class="h-full box-border px-4 py-4 pb-6 rounded-md d-flex flex-col justify-start items-start bg-light"
		:style="{ height: `${height}px` }"
	>
		<h4 class="mb-2">{{ branch.name }}</h4>
		<p>{{ branch.address }}</p>
		<p>{{ branch.description }}</p>
	</div>
</template>

<script lang="ts" setup>
import type { IBranch } from '~/types/branch'

defineProps<{
	branch: IBranch
	height: number
}>()
</script>

<style lang="scss" scoped></style>
