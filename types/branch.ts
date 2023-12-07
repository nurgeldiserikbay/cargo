export interface IBranchCreate {
	name: string
	address: string
	locationId: number
}

export interface IBranch extends IBranchCreate {
	id: number
}
