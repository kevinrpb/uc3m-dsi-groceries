export enum Rating {
  perfect = "😍",
  nice = "😀",
  regular = "😕",
  bad = "😟",
  dontDoIt = "😭"
}

export interface ProductHealthData {
  rating: Rating
  amountBase: number // ex 100g
  calories: number
  proteins: number
  carbos: number
  fat: number
  sugar: number
  salt: number
}

export interface Product {
  pid: string
  name: string
  price: number
  healthData: ProductHealthData
  category: string
  tags: string[]
}
