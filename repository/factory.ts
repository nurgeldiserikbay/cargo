import type { AsyncData } from 'nuxt/app'
import type { PickFrom, KeysOf } from 'nuxt/dist/app/composables/asyncData'

import type { $Fetch } from '~/plugins/api'

export interface ErrorT {
  statusCode: number
  statusMessage: string
  message: string
}

export type HttpFactoryResult<DataT> = Promise<AsyncData<PickFrom<DataT, KeysOf<DataT>> | null, ErrorT | null>>

class HttpFactory {
  private $fetch: $Fetch

  constructor(fetcher: $Fetch) {
    this.$fetch = fetcher
  }

  async CALL<DataT>(
    method: any,
    url: string,
    data?: null | object,
    extras = {}
  ): HttpFactoryResult<DataT> {
    return await this.$fetch<DataT, null>(url, {
      method,
      ...(data && { body: data }),
      ...extras,
    })
  }

  async GET<DataT>(url: string, extras = {}): HttpFactoryResult<DataT> {
    return await this.CALL<DataT>('GET', url, null, extras)
  }

  async POST<DataT>(url: string, data?: object, extras = {}): HttpFactoryResult<DataT> {
    return await this.CALL<DataT>('POST', url, data, extras)
  }

  async PUT<DataT>(url: string, data?: object, extras = {}): HttpFactoryResult<DataT> {
    return await this.CALL<DataT>('PUT', url, data, extras)
  }

  async DELETE<DataT>(url: string, extras = {}): HttpFactoryResult<DataT> {
    return await this.CALL<DataT>('DELETE', url, null, extras)
  }
}

export default HttpFactory
