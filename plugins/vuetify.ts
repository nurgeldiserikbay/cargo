import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import {
	VLayout,
	VAlert,
	VApp,
	VBottomNavigation,
	VBtn,
	VCard,
	VContainer,
	VDataIterator,
	VDivider,
	VExpansionPanel,
	VExpansionPanels,
	VIcon,
	VList,
	VListItem,
	VListItemTitle,
	VMenu,
	VNavigationDrawer,
	VPagination,
	VProgressCircular,
	VSelect,
	VTab,
	VTabs,
	VTextField,
	VTooltip,
	VAppBarNavIcon,
	VMain,
	VAppBar,
	VSpacer,
	VToolbarTitle,
	VCol,
	VRow,
	VTextarea,
	VCheckbox,
	VForm,
	VField,
	VChip,
	VSwitch,
} from 'vuetify/lib/components/index.mjs'

export default defineNuxtPlugin((app) => {
	const vuetify = createVuetify({
		theme: {
			defaultTheme: 'light',
		},
		icons: {
			defaultSet: 'mdi',
		},
		ssr: false,
		components: {
			VLayout,
			VApp,
			VContainer,
			VCol,
			VRow,
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
			VNavigationDrawer,
			VTooltip,
			VDivider,
			VAppBarNavIcon,
			VToolbarTitle,
			VSpacer,
			VAppBar,
			VMain,
			VTextarea,
			VCheckbox,
			VForm,
			VField,
			VChip,
			VSwitch,
		},
	})

	app.vueApp.use(vuetify)
})
