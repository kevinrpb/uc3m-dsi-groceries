import { Product } from './product.model';

export interface List {
  lid: string
  name: string
  shared: boolean
  products: Array<Product>
}
