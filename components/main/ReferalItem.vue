<template>
	<div
		class="flex flex-col items-center text-center bg-light py-2 px-3 rounded-md min-w-30 shadow-lg"
		:class="{ arrow: active }"
	>
		<div class="relative rounded-full mb-1">
			<LevelType
				:level-type="user.level"
				:active="user.active"
				class="z-10"
				:count="user.referals || 0"
			/>
		</div>
		<div
			class="text-[10px] whitespace-pre-line font-700 text-gray-800 text-xs py-1 px-2 bg-backColor rounded-md grow-1"
			:class="{
				'bg-green-500 text-white': active,
			}"
		>
			{{ `${user.lastName} ${user.firstName} \n ID: ${user.id}` }}
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

<style lang="scss" scoped></style>
