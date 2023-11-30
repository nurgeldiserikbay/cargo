export interface IProductOwner {
  firstName: string;
  lastName: string;
  locationName: string;
  phoneNumber: string;
  productDescription: string;
  productTrackCode: string;
  warehouseName: string;
}

export interface IProductCreate {
  description?: string;
  ownerId: number;
  trackCode: string;
  warehouseId: number;
}

export interface IProduct extends IProductCreate {
  id: number;
  description?: string;
  ownerId: number;
  trackCode: string;
  warehouseId: number;
}