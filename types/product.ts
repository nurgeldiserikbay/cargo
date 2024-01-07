import type { IPageMeta, IPagination } from './common'
import type { LocationTypes } from './location'

export interface IProductOwner {
	firstName: string
	lastName: string
	locationName: string
	phoneNumber: string
	productDescription: string
	productTrackCode: string
	warehouseName: string
}

export interface IProductCreate {
	description?: string
	ownerId?: number
	trackCode: string
	warehouseId?: number
}

export interface IProduct extends IProductCreate {
	id: number
	description?: string
	ownerId: number
	trackCode: string
	warehouseId: number
}

export interface IProductInfo {
	id: number
	trackCode: string
	description?: string
}

export interface IProductInfoSearch extends IPagination {
	locationType?: LocationTypes
}

export type IProductInfoList = IPageMeta<IProductInfo[]>

export interface IProductHistory {
	createdDate: string
	id: number
	warehouseAddress: string
	warehouseName: string
}
