<template>
	<div
		class="flex flex-col items-center text-center"
		:class="{ arrow: active }"
	>
		<div class="mb-1">
			<LevelType
				:level-type="user.level"
				:active="user.active"
				:count="user.referals"
			/>
		</div>
		<div class="text-xs whitespace-pre-line">
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
		height: 28px;
		margin-left: -2.5px;
		background: white;
	}
}
</style>
