// import { transformAssetUrls } from 'vite-plugin-vuetify'

import path from 'path'
import i18n from './langs'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	ssr: false,
	inlineSSRStyles: false,
	runtimeConfig: {
		public: {
			assets: process.env.ENV_GITHUB === 'true' ? '/cargo' : '',
			apiBase: process.env.NUXT_PUBLIC_API_BASE,
			API_URL: process.env.NUXT_PUBLIC_API_URL,
		},
	},
	image: { dir: 'assets/img' },
	app:
		process.env.ENV_GITHUB === 'true'
			? {
					baseURL: '/cargo/',
					buildAssetsDir: 'assets',
				}
			: {},
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
		transpile: ['vuetify', 'tslib'],
	},
	modules: [
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
	nitro: {
		output: {
			publicDir: path.join(__dirname, './docs'),
		},
	},
	i18n,
	auth: {
		globalAppMiddleware: true,
		baseURL:
			process.env.ENV_GITHUB === 'true' ? 'https://ipost.kz/api' : '/api',
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
				refererId: 'string',
				promoCode: 'string',
			},
		},
	},
})
