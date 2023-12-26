import { createError, appendHeader } from 'h3'

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig()

	if (!config.public.API_URL) {
		throw new Error('Missing `runtimeConfig.API_URL` configuration.')
	}

	const { method, url, headers } = event.req
	const body =
		method !== 'GET' && method !== 'HEAD' ? await readBody(event) : undefined

	try {
		const response = await $fetch.raw(url, {
			method,
			baseURL: config.public.API_URL,
			headers: {
				...headers,
			},
			body,
		})

		for (const header of ['set-cookie', 'cache-control']) {
			if (response.headers.has(header)) {
				appendHeader(event, header, response.headers.get(header))
			}
		}

		return response._data
	} catch (error) {
		return error
	}
})
