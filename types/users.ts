import type { IPageMeta, IPagination, LevelsType } from './common'

export type TypeRoles = 'ROLE_USER' | 'ROLE_MANAGER' | 'ROLE_ADMIN'

export interface IUserCreate {
	firstName: string
	lastName: string
	email: string
	phoneNumber: string
	password: string
	warehouseId: number
	promoCode: string
	refererId?: string
}

export interface IUser extends IUserCreate {
	id: number
	authorities: TypeRoles[]
}

export interface IAdminUserCreate extends IUserCreate {
	locked?: boolean
}

export interface IAdminUser extends IUser {
	locked?: boolean
}

export type IAdminUserList = IPageMeta<IAdminUser[]>

export interface IReferralsSearch extends IPagination {
	id: number | string
}

export interface IReferrals {
	id: number
	firstName: string
	lastName: string
	active: boolean
	level: LevelsType
	referals: number
}

export type IReferralsList = IPageMeta<IReferrals[]>
