export const rmObjFields = (obj: { [key: string]: any }, keys: string[]) => {
	const newObj: { [key: string]: any } = {}

	for (const key in obj) {
		if (!keys.includes(key) && obj[key] !== undefined && obj[key] !== '')
			newObj[key] = obj[key]
	}

	return newObj
}

export const clearObjFields = (obj: { [key: string]: any }) => {
	const newObj: { [key: string]: any } = {}

	for (const key in obj) {
		if (obj[key] !== undefined && obj[key] !== '') newObj[key] = obj[key]
	}

	return newObj
}

export const crossValArr = (arr1: string[], arr2: string[]) => {
	return arr1.some((v) => arr2.includes(v))
}

export const clearToNums = (arr: string): string => {
	return arr.replace(/\D/g, '')
}
