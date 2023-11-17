import { Seller } from "./Seller"

export interface Product {
  id: number
  price: number
  category: string
  brand: string
  //expiration_date: Date
  expiration_date: string
  seller: Seller
}
