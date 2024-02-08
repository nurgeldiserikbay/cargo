import HttpFactory from '../factory'
import type {
	IProduct,
	IProductCreate,
	IProductHistory,
	IProductInfoList,
	IProductInfoSearch,
	IProductOwner,
	IProductsCount,
} from '~/types/product'

export class ProductModule extends HttpFactory {
	async getProductOwnerById(trackCode: string) {
		return await this.GET<IProductOwner>('/products', { trackCode })
	}

	async addProduct(product: IProductCreate) {
		return await this.POST<IProduct>('/products', product)
	}

	async getAllProducts(search: IProductInfoSearch) {
		return await this.GET<IProductInfoList>('/products/search', {
			query: search,
		})
	}

	async getProduct(id: number) {
		return await this.GET<IProduct>(`/products/${id}`)
	}

	async getProductHistory(id: number) {
		return await this.GET<IProductHistory[]>(`/products/${id}/histories`)
	}

	async updateProduct(id: number, product: IProductCreate) {
		return await this.PUT<IProduct>(`/products/${id}`, product)
	}

	async updateByTrackCode(trackCode: string) {
		return await this.POST<IProduct>(`/products/${trackCode}/commit`)
	}

	async updateByTrackCodes(trackCode: string[]) {
		return await this.POST<IProduct>('/products/commit-all', trackCode)
	}

	async getProductsCount() {
		return await this.GET<IProductsCount>('/products/count-all')
	}

	async sendToArchive(productId: number) {
		return await this.PUT('/products/archive-many', [productId])
	}

	async sendFromArchive(productId: number) {
		return await this.PUT('/products/activate-many', [productId])
	}
}
