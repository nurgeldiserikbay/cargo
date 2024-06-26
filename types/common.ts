export interface ErrorT {
	status?: number
	statusCode?: number
	statusMessage?: string
	message?: string
	data: string
}

export interface IAlertShort {
	title: string
	text?: string
}

export type TypeAlerts = 'error' | 'success' | 'warning' | 'info'

export interface IAlert extends IAlertShort {
	type: TypeAlerts
}

export type ValueType<T> = T extends Promise<infer U> ? U : T

export interface IPagination {
	offset?: number
	paged?: boolean
	page?: number
	size?: number
	sort?: {
		sorted?: true
		unsorted?: true
	}
	totalElements?: number
	unpaged?: boolean
}

export interface IPageMeta<T> {
	content: T
	empty: boolean
	first: boolean
	last: boolean
	number: number
	numberOfElements: number
	pageable: {
		offset: number
		page: number
		size: number
		paged: boolean
		sort: {
			empty: boolean
			sorted: boolean
			unsorted: boolean
		}
		unpaged: boolean
	}
	size: number
	sort: {
		empty: boolean
		sorted: boolean
		unsorted: boolean
	}
	totalElements: number
	totalPages: number
}

export type LevelsType =
	| 'BRONZE'
	| 'SILVER'
	| 'GOLD'
	| 'PLATINUM'
	| 'DIAMOND'
	| 'NONE'
