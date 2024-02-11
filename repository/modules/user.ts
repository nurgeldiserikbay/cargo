import HttpFactory from '../factory'
import type { IUser, IUserCreate } from '~/types/users'

export class UserModule extends HttpFactory {
	async getUser() {
		return await this.GET<IUser>('/account')
	}

	async updateUser(userData: IUserCreate) {
		return await this.POST<IUser>('/account', userData)
	}

	async getUserPageInfo() {
		return await this.GET<string>('v2/account/code')
	}
}
