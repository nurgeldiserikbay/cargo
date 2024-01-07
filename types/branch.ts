export interface IBranchCreate {
	name: string
	address: string
	description: string
	locationId: number
}

export interface IBranch extends IBranchCreate {
	id: number
}
