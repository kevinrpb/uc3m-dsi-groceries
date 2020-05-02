export enum Rating {
  perfect = "😍",
  nice = "😀",
  regular = "😕",
  bad = "😟",
  dontDoIt = "😭"
}

export interface ProductHealthData {
  rating: Rating
  amountBase: Number // ex 100g
  calories: Number
  proteins: Number
  carbos: Number
  fat: Number
  sugar: Number
  salt: Number
}

export interface Product {
  pid: string
  name: string
  price: Number
  healthData: ProductHealthData
  category: string
  tags: string[]
}
