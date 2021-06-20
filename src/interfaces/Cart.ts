import { IProduct } from "./Product"

export interface ICart {
  id: number
  timestamp: string
  products: IProduct[]
}
