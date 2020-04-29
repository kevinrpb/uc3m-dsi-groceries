export enum ListProductAmountType {
  units, weight
}

export interface ListProduct {
  pid: string
  amount: Number
  amountType: ListProductAmountType
}

export interface List {
  lid: string
  name: string
  owner: string
  shared: boolean
  participants: string[]
  products: Array<ListProduct>
}
