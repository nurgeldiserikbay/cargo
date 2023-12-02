import type { UseFetchOptions } from 'nuxt/app'
import type { PickFrom, KeysOf, _AsyncData } from 'nuxt/dist/app/composables/asyncData'

import repository from '~/repository'

export type $Fetch = ReturnType<typeof getFetch>

export type CustomAsyncData<Data, Error> = _AsyncData<PickFrom<Data, KeysOf<Data>> | null, Error>

export type HttpFactoryResult<DataT, ErrorT> = Promise<CustomAsyncData<DataT, ErrorT> & Promise<CustomAsyncData<DataT, ErrorT>>>

function getFetch(config: { [key: string]: any, public: { [key: string]: any } }) {
  const { token } = useAuth()

  return async <DataT, ErrorT>(url: string | Request | Ref<string | Request> | (() => string | Request), options?: UseFetchOptions<DataT>): HttpFactoryResult<DataT, ErrorT> => {
    return await useFetch(url, {
      baseURL: config.public.apiBase,
      headers: {
        'Authorization': token.value || ''
      },
      immediate: true,
      ...options
    }) as unknown as HttpFactoryResult<DataT, ErrorT>
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
