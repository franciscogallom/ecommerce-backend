export interface IProduct {
  id: number
  timestamp: string
  name: string
  description: string
  code: string
  photoUrl: string
  price: number
  stock: number
}

export interface IProductReceived {
  name: string
  description: string
  code: string
  photoUrl: string
  price: number
  stock: number
}
