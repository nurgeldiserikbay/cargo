import type { $Fetch, HttpFactoryResult } from '~/plugins/api'
import type { ErrorT } from '~/types/common'

class HttpFactory {
	private $fetch: $Fetch

	constructor(fetcher: $Fetch) {
		this.$fetch = fetcher
	}

	async CALL<DataT>(
		method: any,
		url: string,
		data?: null | object,
		extras = {},
	): HttpFactoryResult<DataT, ErrorT> {
		return await this.$fetch<DataT, ErrorT>(url, {
			method,
			...(data && { body: data }),
			...extras,
		})
	}

	async GET<DataT>(url: string, extras = {}): HttpFactoryResult<DataT, ErrorT> {
		return await this.CALL<DataT>('GET', url, null, extras)
	}

	async POST<DataT>(
		url: string,
		data?: object,
		extras = {},
	): HttpFactoryResult<DataT, ErrorT> {
		return await this.CALL<DataT>('POST', url, data, extras)
	}

	async PUT<DataT>(
		url: string,
		data?: object,
		extras = {},
	): HttpFactoryResult<DataT, ErrorT> {
		return await this.CALL<DataT>('PUT', url, data, extras)
	}

	async DELETE<DataT>(
		url: string,
		extras = {},
	): HttpFactoryResult<DataT, ErrorT> {
		return await this.CALL<DataT>('DELETE', url, null, extras)
	}

	async fakeApi<DataT>(data: DataT): HttpFactoryResult<DataT, ErrorT> {
		return await new Promise((resolve) => {
			setTimeout(() => {
				resolve({
					status: {
						value: 'success',
					},
					data: {
						value: data,
					},
				})
			}, 1000)
		})
	}
}

export default HttpFactory
