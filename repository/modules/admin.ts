import type { IUserCreate } from '~/types/users'
import HttpFactory from '../factory'

export class AdminModule extends HttpFactory {
  async createAdmin(userData: IUserCreate) {
    return await this.POST<IUserCreate>('/admin/users', userData)
  }
}