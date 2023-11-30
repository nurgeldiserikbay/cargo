import type { AsyncData, UseFetchOptions } from 'nuxt/app'
import type { PickFrom, KeysOf } from 'nuxt/dist/app/composables/asyncData'

import repository from '~/repository'

export type $Fetch = ReturnType<typeof getFetch>

function getFetch(config: { [key: string]: any, public: { [key: string]: any } }) {
  const { token } = useAuth()

  return async <DataT, ErrorT>(url: string, options?: UseFetchOptions<DataT>): Promise<AsyncData<PickFrom<DataT, KeysOf<DataT>> | null, ErrorT | null>> => {
    return await useFetch(url, {
      baseURL: config.public.apiBase,
      headers: {
        'Authorization': token.value
      },
      ...options
    })
  }
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const $fetch = getFetch(config)

  const api = repository($fetch)

  return {
    provide: {
      api,
    },
  }
})
