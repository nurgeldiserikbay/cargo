import { AuthModule } from './modules/auth'
import { LocationModule } from './modules/location'
import { BranchModule } from './modules/branch'
import { ProductModule } from './modules/product'
import { AdminModule } from './modules/admin'
import { UserModule } from './modules/user'
import type { $Fetch } from '~/plugins/api'

export interface IApiInstance {
	location: LocationModule
	auth: AuthModule
	branch: BranchModule
	product: ProductModule
	admin: AdminModule
	user: UserModule
}

export type IApiKeys = keyof IApiInstance

export default function (fetcher: $Fetch): IApiInstance {
	return {
		location: new LocationModule(fetcher),
		auth: new AuthModule(fetcher),
		branch: new BranchModule(fetcher),
		product: new ProductModule(fetcher),
		admin: new AdminModule(fetcher),
		user: new UserModule(fetcher),
	}
}
