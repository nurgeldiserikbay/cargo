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
			main: 'red',
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
