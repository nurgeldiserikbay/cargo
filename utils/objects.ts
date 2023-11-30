export const rmObjFields = (obj: { [key: string]: any }, keys: string[]) => {
  const newObj: { [key: string]: any } = {}

  for (let key in obj) {
    if (!keys.includes(key)) newObj[key] = obj[key]
  }

  return newObj
}

export const crossValArr = (arr1: string[], arr2: string[]) => {
  return arr1.some((v) => arr2.includes(v))
}