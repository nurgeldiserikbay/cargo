import type { IUserCreate } from '~/types/users'
import HttpFactory from '../factory'

export class AuthModule extends HttpFactory {
  async register(userData: IUserCreate) {
    return await this.POST('/register', userData)
  }
}