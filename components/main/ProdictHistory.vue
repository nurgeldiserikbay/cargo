<template>
	<v-list
		v-if="productHistory"
		class="history"
		:variant="'elevated'"
		:loading="pending"
	>
		<v-list-item :variant="'plain'" class="!min-h-auto">
			<v-row class="!m-0">
				<v-col
					:align-self="'center'"
					class="!border-r-(2px solid color1/10) !px-2 !py-0"
				>
					<span class="text-xs font-bold color-1">{{
						$t('labels.branchName')
					}}</span>
				</v-col>
				<v-col :align-self="'center'" class="flex justify-end !px-2 !py-0">
					<span class="text-xs font-bold">{{ $t('labels.dateArrive') }}</span>
				</v-col>
			</v-row>
		</v-list-item>
		<v-list-item
			v-for="item in productHistory"
			:key="item.id"
			:variant="'plain'"
			class="!min-h-auto"
		>
			<v-row class="!m-0">
				<v-col
					:align-self="'center'"
					class="!border-r-(2px solid color1/10) !p-2"
				>
					<span class="text-md">{{ item.warehouseAddress }}</span
					><br />
					<span class="text-xs">{{ item.warehouseDescription }}</span>
				</v-col>
				<v-col :align-self="'center'" class="flex justify-end !p-2">
					<span class="text-xs">{{
						new Date(item.createdDate).toLocaleDateString()
					}}</span>
				</v-col>
			</v-row>
		</v-list-item>
	</v-list>
	<div
		v-else
		class="w-full min-h-[40px] text-center flex justify-center items-center text-lg px-8"
	>
		{{ $t('messages.noData') }}
	</div>
</template>

<script lang="ts" setup>
const $props = defineProps<{
	id: number
}>()

const { $api } = useNuxtApp()

const { pending, data: productHistory } = await $api.product.getProductHistory(
	$props.id,
)
</script>

<style lang="scss" scoped>
.history :deep(.v-list) {
	padding: 0 !important;
}

.history :deep(.v-list-item) {
	padding: 0 !important;
}
</style>
