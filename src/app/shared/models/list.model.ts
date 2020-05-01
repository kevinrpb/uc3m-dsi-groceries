export interface ListProduct {
  pid: string
  name: string
  price: Number
  amount: Number
}

export interface List {
  lid: string
  name: string
  owner: string
  participants: string[]
  products: Array<ListProduct>
}
