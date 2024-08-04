<template>
	<v-menu :offset="10">
		<template #activator="{ props }">
			<button v-bind="props" class="w-7 cursor-pointer">
				<span class="block w-full h-[3px] bg-primary rounded-md mb-1"></span>
				<span class="block w-full h-[3px] bg-primary rounded-md mb-1"></span>
				<span class="block w-full h-[3px] bg-primary rounded-md"></span>
			</button>
		</template>
		<div>
			<div class="bg-light rounded-md shadow-md">
				<div v-for="link in PAGES" :key="link.to">
					<NuxtLinkLocale
						:to="link.to"
						class="block text-(sm color1) py-2 px-6 rounded-sm text-left hover:(text-(color1) bg-gray/10) no-underline"
					>
						{{ $t(link.text) }}</NuxtLinkLocale
					>
				</div>
				<div>
					<v-btn
						variant="text"
						class="block w-full text-(color1) hover:(text-(color1)) no-underline"
						@click="logout"
					>
						<template #prepend>
							<v-icon icon="mdi mdi-logout"></v-icon>
						</template>
						{{ $t('commands.logout') }}
					</v-btn>
				</div>
			</div>
		</div>
	</v-menu>
</template>

<script lang="ts" setup>
const { logout } = useAppAuth()

const { t: $t } = useI18n()

const PAGES = [
	{
		text: $t('pages.profile'),
		to: '/user/profile',
	},
	{
		text: $t('pages.checkProduct'),
		to: '/user',
	},
	{
		text: $t('pages.productList'),
		to: '/user/product-list',
	},
	{
		text: $t('pages.address'),
		to: '/user/address',
	},
	{
		text: $t('pages.referrals'),
		to: '/user/referrals',
	},
	{
		text: $t('pages.archive'),
		to: '/user/archive',
	},
]
</script>

<style lang="scss" scoped>
.router-link-active {
	@apply bg-gray/10;
}
</style>
