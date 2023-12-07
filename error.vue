<template>
	<v-app>
		<div class="error-layout min-h-full d-flex flex-col">
			<MainHeader :is-auth="true" />
			<v-container>
				<ErrorBlock
					:error="{
						statusCode: error.statusCode,
						message: $t('messages.pageNotFound'),
					}"
					@clear="clear"
				></ErrorBlock>
			</v-container>
		</div>
	</v-app>
</template>

<script setup>
definePageMeta({
  auth: false,
  layout: 'auth-layout',
});

withDefaults(
  defineProps<{ error?: any }>(),
  {
    error: null
  }
);

const $emits = defineEmits(['clear']);

function clear() {
  $emits('clear');
}
</script>

<style lang="scss" scoped>
.error-layout {
	background: url('~/assets/img/bg-1.webp') no-repeat center;
	background-size: cover;
	background-color: rgba(#000, 0.3);
	background-blend-mode: darken;
}
</style>
