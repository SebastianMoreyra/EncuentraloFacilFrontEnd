import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/Product';

//const base_url = "http://localhost:8080/api/product"
const base_url = "http://localhost:3000/Product"
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(){
    const endpoint = `${base_url}/`;
    return this.http.get<Product[]>(endpoint)
  }
  getProductosById(id: any) {
    const endpoint = `${base_url}/${id}`;
    return this.http.get<Product>(endpoint)
  }
  updateProduct(body: any, id: any) {
    const endpoint = `${base_url}/${id}`;
    return this.http.put<Product>(endpoint, body)
  }

  getProductsByCategory(category: any) {
    const endpoint = `${base_url}/${category}`;
    return this.http.get<Product>(endpoint)
  }
  saveProduct(body: any) {
    const endpoint = `${base_url}/`;
    return this.http.post<Product>(endpoint, body)
  }
  deleteProduct(id: any) {
    const endpoint = `${base_url}/${id}`;
    return this.http.delete<Product>(endpoint)

  }
}
