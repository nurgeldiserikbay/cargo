import type { TypeRoles } from '~/types/users'

export default defineNuxtRouteMiddleware((to) => {
	const { $localePath } = useNuxtApp()
	const { data, token } = useAuth()

	if (!token.value && to.meta.auth === true)
		return navigateTo($localePath('/auth/login'))

	const authorities = data.value?.authorities || []

	if (token.value && to.meta.unauthenticatedOnly === true) {
		if (crossValArr(authorities, [ROLES.ROLE_ADMIN]))
			return navigateTo($localePath('/admin/locations'))
		if (crossValArr(authorities, [ROLES.ROLE_MANAGER]))
			return navigateTo($localePath('/admin/checkProduct'))
		if (authorities.includes(ROLES.ROLE_USER))
			return navigateTo($localePath('/user'))
		else return navigateTo($localePath('/error'))
	}

	const routeAccesses: TypeRoles[] = (to.meta.accesses as TypeRoles[]) || []

	if (!routeAccesses?.length) return true

	const validAccess = crossValArr(routeAccesses, authorities)

	if (validAccess) return true

	if (crossValArr(authorities, [ROLES.ROLE_ADMIN]))
		return navigateTo($localePath('/admin/locations'))
	if (crossValArr(authorities, [ROLES.ROLE_MANAGER]))
		return navigateTo($localePath('/admin/checkProduct'))
	if (authorities.includes(ROLES.ROLE_USER))
		return navigateTo($localePath('/user'))
	else return navigateTo($localePath('/error'))
})
