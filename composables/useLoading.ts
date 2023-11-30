export const useLoading = () => {
  const loadings = useState<{ [key: string]: boolean }>('loadings', () => ({}))

  const getLoading = computed(() => (key: string) => loadings.value[key])

  const setLoading = (key: string, value: boolean) => loadings.value[key] = value

  return {
    getLoading,
    setLoading
  }
}
