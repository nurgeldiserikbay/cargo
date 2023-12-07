<template>
	<v-app>
		<NuxtLayout>
			<NuxtLoadingIndicator />
			<NuxtErrorBoundary>
				<NuxtPage />
				<template #error="{ error }">
					<ErrorBlock
						:error="{ statusCode: error.statusCode }"
						@clear="error.value = null"
					></ErrorBlock>
				</template>
			</NuxtErrorBoundary>
		</NuxtLayout>
		<GlobLoading />
		<AlertBlock />
	</v-app>
</template>
