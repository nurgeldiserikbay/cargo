import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetTypography,
	presetUno,
	presetWebFonts,
	transformerDirectives,
	transformerVariantGroup,
} from 'unocss'
import type { Theme } from 'unocss/preset-uno'
import presetTheme from 'unocss-preset-theme'

export default defineConfig({
	shortcuts: [],
	theme: {
		colors: {
			color1: '#020202',
			color2: '#e0e0e0',
			color10: '#ffffff',
			main: 'red',
		},
		fontSize: {
			sxs: '10px',
		},
	},
	presets: [
		presetAttributify(),
		presetIcons(),
		presetTypography(),
		presetWebFonts({
			fonts: {},
		}),
		presetUno(),
		presetTheme<Theme>({
			theme: {},
		}),
	],
	transformers: [transformerDirectives(), transformerVariantGroup()],
})
