import { Rating } from './product.model';

export interface ListProduct {
  pid: string
  name: string
  price: number
  rating: Rating
  amount: number
  bought: boolean
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
  owner: ListParticipant
  participants: ListParticipant[]
  products: Array<ListProduct>
}
