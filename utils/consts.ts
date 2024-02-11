import IconBox from '@/assets/svg/box-svgrepo-com.svg'
import IconTruckDeliver from '@/assets/svg/truck-deliver-svgrepo-com.svg'
import IconSkyscraperCity from '@/assets/svg/skyscraper-city-svgrepo-com.svg'
import IconAddressBook from '@/assets/svg/address-book.svg'
import type { TypeAlerts } from '~/types/common'
import type { LocationTypes } from '~/types/location'
import type { TypeRoles } from '~/types/users'

export const LOCATION_TYPES: { [key in LocationTypes]: LocationTypes } = {
	BORDER: 'BORDER',
	CHINA: 'CHINA',
	KZ: 'KZ',
	NULL: 'NULL',
}

export const CONTENT = {
	faq: [
		// {
		// 	id: 0,
		// 	question: 'What do you want to',
		// 	answer: 'What do you want to do',
		// },
	],
	links: [
		{
			to: '/user',
			text: 'pages.user',
			icon: IconBox,
		},
		{
			to: '/user/product-list',
			text: 'pages.productList',
			icon: IconTruckDeliver,
		},
		{
			to: '/user/address',
			text: 'pages.address',
			icon: IconSkyscraperCity,
		},
		{
			to: '/user/info',
			text: 'pages.info',
			icon: IconAddressBook,
		},
	],
	infoList: [
		{
			to: '/user/info/contacts',
			text: 'pages.contacts',
		},
		// {
		// 	to: '/user/info/calculation',
		// 	text: 'pages.calculation',
		// },
		{
			to: '/user/info/lessons',
			text: 'pages.lessons',
		},
	],
	places: [
		{
			id: 0,
			type: LOCATION_TYPES.NULL,
			icon: 'store-clock',
		},
		{
			id: 1,
			type: LOCATION_TYPES.CHINA,
			icon: 'earth',
		},
		{
			id: 2,
			type: LOCATION_TYPES.BORDER,
			iconPath: 'kz-border',
		},
		{
			id: 3,
			type: LOCATION_TYPES.KZ,
			icon: 'home-account',
		},
	],
	lessons: [
		// {
		// 	id: 1,
		// 	title: 'lessons1',
		// 	src: 'https://www.youtube.com/embed/J9E8hFJhAw4?si=W3aE5dqkrPPTTgIu',
		// },
		// {
		// 	id: 2,
		// 	title: 'lessons2',
		// 	src: 'https://www.youtube.com/embed/ZfiJHHiGlB8?si=nzBkhez1h2l6ISZ3',
		// },
		// {
		// 	id: 3,
		// 	title: 'lessons3',
		// 	src: 'https://www.youtube.com/embed/J9E8hFJhAw4?si=W3aE5dqkrPPTTgIu',
		// },
		// {
		// 	id: 4,
		// 	title: 'lessons4',
		// 	src: 'https://www.youtube.com/embed/ZfiJHHiGlB8?si=nzBkhez1h2l6ISZ3',
		// },
		// {
		// 	id: 5,
		// 	title: 'lessons5',
		// 	src: 'https://www.youtube.com/embed/J9E8hFJhAw4?si=W3aE5dqkrPPTTgIu',
		// },
		// {
		// 	id: 6,
		// 	title: 'lessons6',
		// 	src: 'https://www.youtube.com/embed/ZfiJHHiGlB8?si=nzBkhez1h2l6ISZ3',
		// },
	],
}

export const ALERTS: { [key in TypeAlerts]: TypeAlerts } = {
	error: 'error',
	success: 'success',
	warning: 'warning',
	info: 'info',
}

export const ROLES: { [key in TypeRoles]: TypeRoles } = {
	ROLE_USER: 'ROLE_USER',
	ROLE_MANAGER: 'ROLE_MANAGER',
	ROLE_ADMIN: 'ROLE_ADMIN',
}

export const ADMIN_MENUS = [
	{
		to: '/admin/locations',
		text: 'pages.locations',
		roles: [ROLES.ROLE_ADMIN],
	},
	{
		to: '/admin/branchs',
		text: 'pages.branchs',
		roles: [ROLES.ROLE_ADMIN],
	},
	{
		to: '/admin/personals',
		text: 'pages.personals',
		roles: [ROLES.ROLE_ADMIN],
	},
	{
		to: '/admin/products',
		text: 'pages.products',
		roles: [ROLES.ROLE_ADMIN, ROLES.ROLE_MANAGER],
	},
	{
		to: '/admin/users',
		text: 'pages.users',
		roles: [ROLES.ROLE_ADMIN],
	},
	{
		to: '/admin/checkProduct',
		text: 'pages.checkProduct',
		roles: [ROLES.ROLE_MANAGER],
	},
]
