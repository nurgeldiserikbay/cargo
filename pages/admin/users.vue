<template>
	<div></div>
</template>

<script lang="ts" setup>
definePageMeta({
	layout: 'admin-layout',
	auth: true,
	accesses: [ROLES.ROLE_ADMIN, ROLES.ROLE_MANAGER],
})
</script>

<style lang="scss" scoped></style>
