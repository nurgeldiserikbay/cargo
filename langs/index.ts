export default {
	legacy: false,
	compilation: {
		strictMessage: false,
	},
	warnHtmlMessage: false,
	locale: 'en',
	langDir: 'langs',
	lazy: false,
	strategy: 'prefix_except_default',
	locales: [
		{
			code: 'en',
			name: 'English',
			files: ['en-US'],
		},
		{
			code: 'ru',
			name: 'Русский',
			files: ['ru-RU'],
		},
		{
			code: 'kk',
			name: 'Қазақша',
			files: ['kk-KZ'],
		},
	],
	detectBrowserLanguage: {
		useCookie: true,
		cookieKey: 'i18n_redirected',
		redirectOn: 'root',
	},
}
