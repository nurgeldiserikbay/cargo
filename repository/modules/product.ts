import type { IProduct, IProductCreate, IProductOwner } from '~/types/product'
import HttpFactory from '../factory'

export class ProductModule extends HttpFactory {
  async getProductOwnerById(trackCode: string) {
    return await this.GET<IProductOwner>('/products')
  }

  async addProduct(product: IProductCreate) {
    return await this.POST<IProduct>(`/products`, product)
  }

  async getProduct(id: number) {
    return await this.GET<IProduct>(`/products/${id}`)
  }

  async updateProduct(id: number, product: IProductCreate) {
    return await this.PUT<IProduct>(`/products/${id}`, product)
  }

  async updateByTrackCode(trackCode: string) {
    return await this.PUT<IProduct>(`/products/${trackCode}/manage`)
  }
}