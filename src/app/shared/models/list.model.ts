import { Rating } from './product.model';

export enum ListProductAmountType {
  units, weight
}

export interface ListProduct {
  pid: string
  name: string
  price: Number
  rating: Rating
  amountType: ListProductAmountType
  amount: Number
}

export interface ListParticipant {
  uid: string
  email: string
  displayName?: string
  photoURL?: string
}

export interface List {
  lid: string
  name: string
  owner: string
  participants: ListParticipant[]
  products: Array<ListProduct>
}
