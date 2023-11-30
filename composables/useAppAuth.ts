export const useAppAuth = () => {
  const localePath = useLocalePath()
  const { getSession } = useAuth()
  const { rawToken } = useAuthState()
  const router = useRouter()

  const logout = async () => {
    rawToken.value = null
    await getSession()
    router.push(localePath('/auth/login'))
  }

  return { logout }
}