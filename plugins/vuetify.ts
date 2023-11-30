import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import { VAlert, VApp, VBottomNavigation, VBtn, VCard, VContainer, VDataIterator, VExpansionPanel, VExpansionPanels, VIcon, VList, VListItem, VListItemTitle, VMenu, VNavigationDrawer, VPagination, VProgressCircular, VSelect, VTab, VTabs, VTextField } from 'vuetify/lib/components/index.mjs'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    icons: {
      defaultSet: 'mdi',
    },
    ssr: true,
    components: {
      VApp,
      VContainer,
      VBottomNavigation,
      VBtn,
      VIcon,
      VMenu,
      VList,
      VListItem,
      VListItemTitle,
      VAlert,
      VProgressCircular,
      VTextField,
      VSelect,
      VCard,
      VExpansionPanels,
      VExpansionPanel,
      VTabs,
      VTab,
      VDataIterator,
      VPagination,
      VNavigationDrawer
    },
  })

  app.vueApp.use(vuetify)
})
