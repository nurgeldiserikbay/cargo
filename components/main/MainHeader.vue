<template>
	<div class="w-full h-[60px] shadow-sm bg-white">
		<v-container class="h-full d-flex justify-between items-center py-0">
			<MainLogo class="my-0"></MainLogo>

			<!-- <UserNavigation v-if="!isAuth"></UserNavigation> -->
			<div class="d-flex items-center gap-4">
				<PromoCode />
				<LangSwitcher></LangSwitcher>
				<UserMenu v-if="isAuthed"></UserMenu>
				<NuxtLinkLocale
					v-else
					:to="'/auth/login'"
					class="d-flex justify-center items-center gap-1 py-1 px-2 rounded-md bg-cprimary no-underline align-middle"
				>
					<IconUserIcon class="d-block w-5 h-5 fill-light text-light" />
					<span class="d-block text-(sm light) font-light leading-none">{{
						$t('pages.login')
					}}</span>
				</NuxtLinkLocale>
			</div>
		</v-container>
	</div>
</template>

<script lang="ts" setup>
import IconUserIcon from '@/assets/svg/user.svg'

const { data: user } = useAuth()

const isAuthed = computed(() => {
	return !!user.value
})
</script>

<style lang="scss" scoped></style>
