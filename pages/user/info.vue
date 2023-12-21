<template>
	<v-container
		class="flex-grow-1 d-flex flex-col justify-start items-center pt-10"
	>
		<v-card
			class="w-full min-h-[50vh] border-box px-8 pt-8 !pb-24 relative !overflow-visible"
		>
			<template v-if="userInfo">
				<v-row>
					<v-col>
						<div class="text-h6 mb-4">{{ $t('labels.branchAddress') }}</div>
						<div class="whitespace-pre-wrap mb-4" v-html="userInfo"></div>
						<v-btn color="yellow" @click="copyText">
							<span class="mr-2">{{ $t('commands.copy') }}</span>
							<v-icon
								:icon="`mdi mdi-pencil-box-multiple-outline`"
								size="x-large"
							></v-icon>
						</v-btn>
					</v-col>
					<v-col class="flex justify-end items-center">
						<img
							src="@/assets/img/section1.png"
							alt=""
							class="max-w-[150px] mr-12"
						/>
					</v-col>
				</v-row>
			</template>

			<v-divider class="mt-12 mb-12"></v-divider>

			<template v-if="user">
				<v-row>
					<v-col>
						<div class="mb-4 flex items-center gap-4">
							<span class="text-h6">{{ $t('labels.yourCode') }}</span> -
							<span class="text-h6 text-gray">{{ user.id }}</span>
						</div>
						<v-btn color="yellow" @click="copyCode">
							<span class="mr-2">{{ $t('commands.copy') }}</span>
							<v-icon
								:icon="`mdi mdi-pencil-box-multiple-outline`"
								size="x-large"
							></v-icon>
						</v-btn>
					</v-col>
					<v-col class="flex justify-end">
						<img
							src="@/assets/img/section2.png"
							alt=""
							class="max-w-[120px] mr-12"
						/>
					</v-col>
				</v-row>
			</template>
		</v-card>
	</v-container>
</template>

<script lang="ts" setup>
const { $api } = useNuxtApp()

definePageMeta({
	layout: 'user-layout',
	auth: true,
	accesses: [ROLES.ROLE_USER],
})

const { data: user } = useAuth()

const { data: userInfo } = await $api.user.getUserPageInfo()

function copyText() {
	if (!userInfo.value) return
	navigator.clipboard.writeText(userInfo.value)
}

function copyCode() {
	if (!user.value) return
	navigator.clipboard.writeText(String(user.value.id))
}
</script>

<style lang="scss" scoped></style>
