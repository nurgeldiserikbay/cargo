import HttpFactory from '../factory'
import type { IUserCreate } from '~/types/users'

export class AuthModule extends HttpFactory {
	async register(userData: IUserCreate) {
		return await this.POST('/register', userData)
	}
}
