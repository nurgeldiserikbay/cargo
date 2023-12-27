<template>
	<div class="user-layout min-h-full box-border d-flex flex-col pb-18 lg:pb-4">
		<MainHeader />
		<slot></slot>
		<UserFooter class="!md:hidden" />
	</div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.user-layout {
	background: url('~/assets/img/bg-2.webp') no-repeat center;
	background-size: cover;
	background-color: rgba(#000, 0.3);
	background-blend-mode: darken;
}
</style>
