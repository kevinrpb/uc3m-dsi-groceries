export interface ProductHealthData {
  amountBase: Number // ex 100g
  proteins: Number
  carbos: Number
  sugar: Number
  fat: Number
}

export interface Product {
  pid: string
  name: string
  price: number
  healthData: ProductHealthData
  category: string
  tags: string[]
}

