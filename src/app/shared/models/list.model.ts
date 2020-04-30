export enum ListProductAmountType {
  units, weight
}

export interface ListProduct {
  pid: string
  name: string
  price: Number
  amount: Number
  amountType: ListProductAmountType
}

export interface List {
  lid: string
  name: string
  owner: string
  participants: string[]
  products: Array<ListProduct>
}
