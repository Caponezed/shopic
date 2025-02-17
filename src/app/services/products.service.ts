import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BASE_URL } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(@Inject(BASE_URL) private baseUrl: string, private readonly httpClient: HttpClient) { }

  getAllProducts() {
    return this.httpClient.get<Product[]>(`${this.baseUrl}/api/products`);
  }

  getProductById(productId: number) {
    return this.httpClient.get<Product>(`${this.baseUrl}/api/products/${productId}`);
  }

  addNewProduct(product: Product) {
    return this.httpClient.post<Product>(`${this.baseUrl}/api/products`, product);
  }

  updateProduct(product: Product) {
    return this.httpClient.put<Product>(`${this.baseUrl}/api/products`, product);
  }

  deleteProductById(productId: number) {
    return this.httpClient.delete<void>(`${this.baseUrl}/api/products/${productId}`);
  }
}
