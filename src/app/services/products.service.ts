import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api';

  getAllProducts() {
    return this.httpClient.get<Product[]>(`${this.apiUrl}/products`);
  }

  getProductById(productId: number) {
    return this.httpClient.get<Product>(`${this.apiUrl}/products/${productId}`);
  }
}
