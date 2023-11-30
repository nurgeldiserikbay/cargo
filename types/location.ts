import type { IBranch } from "./branch"

export interface ICity {
  id: number;
  name: string;
  warehouses: IBranch[]
}
