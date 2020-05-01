export enum ListProductAmountType {
  units, weight
}

export interface ListProduct {
  pid: string
  name: string
  price: Number
  rating: string
  amountType: ListProductAmountType
  amount: Number
}

export interface List {
  lid: string
  name: string
  owner: string
  participants: string[]
  products: Array<ListProduct>
}
