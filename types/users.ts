import type { IPageMeta } from './common'

export type TypeRoles = 'ROLE_USER' | 'ROLE_MANAGER' | 'ROLE_ADMIN'

export interface IUserCreate {
	firstName: string
	lastName: string
	email: string
	phoneNumber: string
	password: string
	warehouseId: number
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
