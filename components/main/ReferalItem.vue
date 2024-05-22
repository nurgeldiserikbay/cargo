<template>
	<div
		class="flex flex-col items-center text-center"
		:class="{ arrow: active }"
	>
		<div class="relative mb-1">
			<LevelType
				:level-type="user.level"
				:active="user.active"
				:count="user.referals"
			/>
			<div
				class="absolute w-1 h-1 bg-purple-800 left-1/2 transform -translate-x-1/2"
			></div>
		</div>
		<div
			class="text-[10px] whitespace-pre-line bg-purple-800 px-2 py-1 rounded-md font-700 text-light"
		>
			{{ `ID: ${user.id}` }}
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { IReferrals } from '~/types/users'

withDefaults(
	defineProps<{
		user: IReferrals
		active?: boolean
	}>(),
	{ active: false },
)
</script>

<style lang="scss" scoped>
.arrow {
	position: relative;

	&:after {
		content: '';
		position: absolute;
		top: 100%;
		left: 50%;
		width: 5px;
		height: 16px;
		margin-left: -2.5px;
		background: rgb(107, 33, 168);
	}
}
</style>
