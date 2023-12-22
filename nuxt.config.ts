// import { transformAssetUrls } from 'vite-plugin-vuetify'

import i18n from './langs'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	ssr: false,
	runtimeConfig: {
		public: {
			apiBase: process.env.NUXT_PUBLIC_API_BASE,
		},
	},
	css: [
		'~/assets/style/main.scss',
		'@mdi/font/css/materialdesignicons.min.css',
	],
	devtools: { enabled: true },
	components: [
		{
			path: '~/components',
			pathPrefix: false,
		},
	],
	build: {
		transpile: ['vuetify'],
	},
	modules: [
		// async (options, nuxt) => {
		//   nuxt.hooks.hook('vite:extendConfig', (config) => {
		//     // @ts-expect-error
		//     config.plugins.push(
		//       vuetify({ autoImport: true })
		//     )
		//   })
		// },
		'@unocss/nuxt',
		'nuxt-svgo',
		'@nuxtjs/color-mode',
		'@nuxtjs/i18n',
		'@nuxt/image',
		'@pinia/nuxt',
		'@sidebase/nuxt-auth',
	],
	svgo: {
		autoImportPath: '~/assets/svg/',
	},
	// vite: {
	//   vue: {
	//     template: {
	//       transformAssetUrls,
	//     },
	//   },
	// },
	colorMode: {
		preference: 'light',
		classSuffix: '',
	},
	i18n,
	auth: {
		// globalAppMiddleware: true,
		baseURL: process.env.NUXT_PUBLIC_API_BASE,
		provider: {
			type: 'local',
			endpoints: {
				signIn: { path: '/authenticate', method: 'post' },
				getSession: { path: '/account', method: 'get' },
			},
			token: {
				signInResponseTokenPointer: '/id_token',
			},
			pages: {
				login: '/auth/login',
			},
			sessionDataType: {
				id: 'number',
				firstName: 'string',
				lastName: 'string',
				email: 'string',
				phoneNumber: 'string',
				password: 'string',
				warehouseId: 'number',
				authorities: '("ROLE_USER" | "ROLE_MANAGER" | "ROLE_ADMIN")[]',
			},
		},
	},
})
