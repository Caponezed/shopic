import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BASE_URL, CART_PRODUCTS_TOKEN } from '../app.config';
import { LocalStorageService } from './local-storage.service';
import { CartProduct } from '../models/cart-product';
import { NotificationService } from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly cartProductsKeyName = inject(CART_PRODUCTS_TOKEN);
  constructor(@Inject(BASE_URL) private baseUrl: string, private readonly httpClient: HttpClient, private readonly localStorageService: LocalStorageService) { }
  notificationService = inject(NotificationService);
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

  confirmOrder(product: Product) {
    return this.httpClient.put<Product>(`${this.baseUrl}/api/products/confirmOrder`, product);
  }

  deleteProductById(productId: number) {
    return this.httpClient.delete<void>(`${this.baseUrl}/api/products/${productId}`);
  }

  addToCart(product: Product, quantity: number) {
    if (product.totalQuantity < quantity) {
      this.notificationService.emitNotification("Нельзя добавить больше товаров чем есть на складе");
      return;
    };

    if (quantity < 1) {
      this.notificationService.emitNotification("Количество товаров должно быть от 1 и больше");
      return;
    };

    let currentCartProducts: CartProduct[] = this.localStorageService.getItem(this.cartProductsKeyName) ?? [];
    const cartProduct: CartProduct = {
      id: product.id,
      name: product.name,
      description: product.description,
      productType: product.productType,
      quantity,
      totalQuantity: product.totalQuantity,
      price: product.price,
      imgSrc: product.imgSrc
    };

    const cartProductIndex = currentCartProducts.findIndex(ccp => ccp.id === product.id);

    if (cartProductIndex !== -1) {
      currentCartProducts[cartProductIndex] = cartProduct;
    } else {
      currentCartProducts = [...currentCartProducts, cartProduct]
    }

    this.localStorageService.setItem(this.cartProductsKeyName, currentCartProducts);
    this.notificationService.emitNotification("Данный товар был успешно добавлен в корзину");
  }

  removeFromCart(productId: number) {
    let currentCartProducts: CartProduct[] = this.localStorageService.getItem(this.cartProductsKeyName) ?? [];
    const removedProduct = currentCartProducts.find(ccp => ccp.id === productId);
    currentCartProducts = currentCartProducts.filter(ccp => ccp.id !== removedProduct?.id);

    this.localStorageService.setItem(this.cartProductsKeyName, currentCartProducts);
    this.notificationService.emitNotification("Данный товар был успешно убран из корзины");
  }
}
