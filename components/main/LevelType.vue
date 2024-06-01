<template>
	<div class="relative rounded-full flex justify-center items-center">
		<div class="flex items-center justify-center">
			<img
				:src="`${runtimeConfig.public.assets}/assets/img/${levelType}.png`"
				alt=""
				class="object-contain select-none drag-none pointer-events-none"
				:class="{ 'w-[60px] h-[60px]': small, 'w-[120px] h-[120px]': !small }"
			/>
		</div>
		<div
			v-if="count"
			class="absolute top-1/5 left-1/4 min-w-10 py-0 px-2 rounded-md bg-red-600 px-1 text-(sm light-600) font-900 transform -translate-1/2"
		>
			{{ getCounts }}
		</div>
		<div
			class="absolute rounded-full"
			:class="{
				'bottom-1/100 -right-1/10': small,
				'bottom-1/10 right-1/10': !small,
			}"
		>
			<img
				v-if="active"
				:src="`${runtimeConfig.public.assets}/assets/img/active.png`"
				alt=""
				class="block"
				:class="{ 'w-5 h-5': small, 'w-7 h-7': !small }"
			/>
			<img
				v-else
				:src="`${runtimeConfig.public.assets}/assets/img/none-active.png`"
				alt=""
				class="block"
				:class="{ 'w-5 h-5': small, 'w-7 h-7': !small }"
			/>
		</div>
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
		small?: boolean
	}>(),
	{ levelType: LEVELS_TYPE.BRONZE, active: false, count: 0, small: false },
)

const getCounts = computed(() => {
	return $props.count < 99 ? $props.count : '+99'
})
</script>

<style lang="scss" scoped></style>
