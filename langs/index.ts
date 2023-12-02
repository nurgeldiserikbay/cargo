export default {
  legacy: false,
  locale: 'en',
  langDir: 'langs',
  lazy: true,
  strategy: 'prefix_except_default',
  locales: [
    {
      code: 'en',
      name: 'English',
      files: ['en-US']
    },
    {
      code: 'ru',
      name: 'Русский',
      files: ['ru-RU']
    },
    {
      code: 'kk',
      name: 'Қазақша',
      files: ['kk-KZ']
    }
  ],
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'i18n_redirected',
    redirectOn: 'root',
  },
}