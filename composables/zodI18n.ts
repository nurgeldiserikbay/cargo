export const zodI18n = (str: string | undefined): string => {
  if (!str) return ''

  const { t: $t } = useI18n()

  return $t('errors.' + str)
}