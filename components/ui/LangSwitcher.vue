<template>
	<v-menu :offset="10">
		<template #activator="{ props }">
			<button
				v-bind="props"
				class="cursor-pointer uppercase text-ctertiary text-xs"
			>
				<span>{{ locale }}</span>
				<IconArrowDown class="d-inline-block w-3 h-3 ml-1" />
			</button>
		</template>
		<v-list>
			<v-list-item
				v-for="item in getLocales"
				:key="item.code"
				:value="item.code"
				:active="locale === item.code"
			>
				<v-list-item-title>
					<NuxtLink
						:to="switchLocalePath(item.code)"
						class="text-(color1) hover:(text-(color1)) no-underline"
						>{{ item.name }}</NuxtLink
					>
				</v-list-item-title>
			</v-list-item>
		</v-list>
	</v-menu>
</template>

<script lang="ts" setup>
import type { LocaleObject } from '@nuxtjs/i18n/dist/runtime/composables'

import IconArrowDown from '@/assets/svg/arrow-down.svg'

defineProps<{
	color?: string
}>()

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const getLocales = computed<LocaleObject[]>(
	() => locales.value as LocaleObject[],
)
</script>

<style lang="scss" scoped></style>
