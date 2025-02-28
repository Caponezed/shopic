import { Component, inject, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { CartProduct } from '../../models/cart-product';
import { CART_PRODUCTS_TOKEN } from '../../app.config';
import { CurrencyPipe } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';
import { take } from 'rxjs/internal/operators/take';
import { NotificationService } from '../../services/notifications.service';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  private readonly localStorageService = inject(LocalStorageService);
  private readonly cartProductsKeyName = inject(CART_PRODUCTS_TOKEN);
  private readonly productsService = inject(ProductsService);
  private readonly notificationService = inject(NotificationService);
  cartProducts: CartProduct[] = [];
  totalPrice: number = 0;

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.cartProducts = this.localStorageService.getItem(this.cartProductsKeyName) ?? [];
    this.totalPrice = this.cartProducts.reduce((total, currentCartProduct) => total = total + (currentCartProduct.price * currentCartProduct.quantity), 0);
  }

  removeFromCart(cartProduct: CartProduct) {
    this.productsService.removeFromCart(cartProduct.id!);
    this.init();
  }

  confirmProductOrder(product: Product) {
    this.productsService.confirmOrder(product)
      .pipe(take(1))
      .subscribe(product => {
        console.log(product);
      });
  }

  confirmOrder() {
    if (this.cartProducts.length === 0) {
      this.notificationService.emitNotification(`Для заказа добавьте в корзину товары.`);
      return;
    };

    this.cartProducts.map(cp => {
      const product: Product = {
        id: cp.id,
        name: cp.name,
        description: cp.description,
        productType: cp.productType,
        totalQuantity: cp.totalQuantity - cp.quantity,
        price: cp.price,
        imgSrc: cp.imgSrc,
      };

      this.confirmProductOrder(product);
    });

    this.localStorageService.removeItem(this.cartProductsKeyName);
    this.notificationService.emitNotification(`Заказ был успешно оформлен.`);
    this.init();
  }
}
