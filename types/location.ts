export type LocationTypes = 'BORDER' | 'CHINA' | 'KZ' | 'NULL'

export interface ICityCreate {
	name: string
	code: string
	type: LocationTypes
}

export interface ICity extends ICityCreate {
	id: number
}
