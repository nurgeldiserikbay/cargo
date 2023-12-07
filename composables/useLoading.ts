export const useLoading = () => {
	const route = useRoute()

	const loadings = useState<{ [key: string]: boolean }>('loadings', () => ({}))

	const getLoading = computed(() => (key: string) => loadings.value[key])

	watch(
		() => route.path,
		() => {
			setLoading('global', false)
		},
	)

	const setLoading = (key: string, value: boolean) =>
		(loadings.value[key] = value)

	return {
		getLoading,
		setLoading,
	}
}
