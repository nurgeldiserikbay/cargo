<template>
	<section>
		<v-container>
			<h1
				class="block text-4xl leading-tight mb-3 font-bold sm:(text-(6xl center)) md:(mb-6 mt-5)"
				v-html="$t('data.main.bannerTitle')"
			></h1>
			<h3
				class="text-(xl ctertiary) font-normal leading-tight mb-6 sm:(text-(2xl center))"
			>
				<span class="mr-2">{{ $t('data.main.bannerText') }}</span>
				<IconChine />
			</h3>
			<NuxtLinkLocale
				v-if="isAuthed"
				:to="'/user'"
				class="d-block px-3 py-2 rounded-md bg-cprimary no-underline w-full max-w-[350px] text-(xl light center) font-bold m-auto md:(mb-6 mt-4)"
				>{{ $t('pages.checkProduct') }}</NuxtLinkLocale
			>
			<NuxtLinkLocale
				v-else
				:to="'/auth/register'"
				class="d-block px-3 py-2 rounded-md bg-cprimary no-underline w-full max-w-[350px] text-(xl light center) font-bold m-auto md:(mb-6 mt-4)"
				>{{ $t('pages.register') }}</NuxtLinkLocale
			>
		</v-container>
	</section>
</template>

<script lang="ts" setup>
import IconChine from '@/assets/svg/chine.svg'

const { data: user } = useAuth()

const isAuthed = computed(() => {
	return !!user.value
})
</script>

<style lang="scss" scoped>
h1 :deep(span) {
	@apply text-cprimary;
}
</style>
