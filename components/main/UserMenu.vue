<template>
	<v-menu :offset="10">
		<template #activator="{ props }">
			<LevelType
				v-if="user && user.level"
				v-bind="props"
				:level-type="user.level"
				:active="user.active"
				:small="true"
				class="z-10 w-10 h-10 cursor-pointer"
				:count="user.referals || 0"
			/>
			<v-btn
				v-else
				color="secondary"
				v-bind="props"
				:icon="true"
				:rounded="'true'"
				:size="'small'"
			>
				<v-icon icon="mdi mdi-account"></v-icon>
			</v-btn>
		</template>
		<v-list>
			<v-list-item>
				<v-list-item-title>
					<NuxtLinkLocale
						:to="'/user/settings'"
						class="text-(color1) hover:(text-(color1)) no-underline text-center"
					>
						{{ $t('pages.settings') }}</NuxtLinkLocale
					>
				</v-list-item-title>
			</v-list-item>
			<v-list-item>
				<v-list-item-title>
					<NuxtLinkLocale
						:to="'/user/archive'"
						class="text-(color1) hover:(text-(color1)) no-underline text-center"
					>
						{{ $t('pages.archive') }}</NuxtLinkLocale
					>
				</v-list-item-title>
			</v-list-item>
			<v-list-item>
				<v-list-item-title>
					<NuxtLinkLocale
						:to="'/user/referrals'"
						class="text-(color1) hover:(text-(color1)) no-underline text-center"
					>
						{{ $t('labels.referrals') }}</NuxtLinkLocale
					>
				</v-list-item-title>
			</v-list-item>
			<v-list-item>
				<v-btn
					variant="text"
					class="text-(color1) hover:(text-(color1)) no-underline"
					@click="logout"
				>
					<template #prepend>
						<v-icon icon="mdi mdi-logout"></v-icon>
					</template>
					{{ $t('commands.logout') }}
				</v-btn>
			</v-list-item>
		</v-list>
	</v-menu>
</template>

<script lang="ts" setup>
const { data: user } = useAuth()
const { logout } = useAppAuth()
</script>

<style lang="scss" scoped></style>
