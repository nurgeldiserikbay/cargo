<template>
	<div class="relative rounded-full flex justify-center items-center">
		<div class="bg">
			<img
				:src="`${runtimeConfig.public.assets}/assets/img/${levelType}.png`"
				alt=""
			/>
		</div>
		<div
			v-if="count"
			class="absolute top-1/10 left-1/5 min-w-3 rounded-md bg-red-600 px-1 text-(10px light-600) font-900 transform -translate-1/2"
		>
			{{ getCounts }}
		</div>
		<div
			v-if="active"
			class="absolute bottom-1/25 right-1/25 w-3 h-3 rounded-full bg-green-600"
		></div>
	</div>
</template>

<script lang="ts" setup>
import type { LevelsType } from '~/types/common'

const runtimeConfig = useRuntimeConfig()

const $props = withDefaults(
	defineProps<{
		levelType?: LevelsType
		active?: boolean
		count?: number
	}>(),
	{ levelType: LEVELS_TYPE.BRONZE, active: false, count: 0 },
)

const getCounts = computed(() => {
	return $props.count < 99 ? $props.count : '+99'
})
</script>

<style lang="scss" scoped>
.bg {
	width: 50px;
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: linear-gradient(145deg, #7cdad7, #32706c);
	border-radius: 50%;
	box-shadow: inset 0 0 10px 0 rgba(0, 0, 0, 0.2);
	border: 4px solid rgb(107, 33, 168);

	img {
		height: 65%;
		object-fit: contain;
	}
}
</style>
