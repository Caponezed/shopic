import { Component, Inject, inject, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { ProductsService } from '../../../../services/products.service';
import { Product } from '../../../../models/product.model';
import { CART_PRODUCTS_TOKEN, FILES_API_ENDPOINT } from '../../../../app.config';
import { FormsModule } from '@angular/forms';
import { CartProduct } from '../../../../models/cart-product';
import { LocalStorageService } from '../../../../services/local-storage.service';

@Component({
  selector: 'app-product',
  imports: [CurrencyPipe, FormsModule],
  templateUrl: './product.container.html',
  styleUrl: './product.container.css'
})
export class ProductContainer implements OnInit {
  constructor(@Inject(FILES_API_ENDPOINT) public readonly filesApiEndpoint: string) { }
  productsService = inject(ProductsService);
  activatedRoute = inject(ActivatedRoute);
  localStorageService = inject(LocalStorageService);
  cartProductsKeyName = inject(CART_PRODUCTS_TOKEN);

  cartProduct: CartProduct = {
    name: '',
    description: '',
    productType: {
      name: ''
    },
    totalQuantity: 0,
    quantity: 1,
    price: 0
  };

  product: Product = {
    name: 'Товар 1',
    description: 'Описание 1',
    imgSrc: '',
    productType: {
      name: "Тип 1"
    },
    price: 0,
    totalQuantity: 0
  };

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const productId = params['id'];
      this.getProductById(productId);
    });
  }

  getProductById(productId: number) {
    this.productsService.getProductById(productId)
      .pipe(take(1))
      .subscribe(product => {
        this.product = product;
        const cartProducts: CartProduct[] = this.localStorageService.getItem(this.cartProductsKeyName) ?? [];
        const cartProduct = cartProducts.find(cp => cp.id === product.id);
        if (cartProduct) {
          this.cartProduct = cartProduct!
        } else {
          this.cartProduct = {
            name: '',
            description: '',
            productType: {
              name: ''
            },
            quantity: this.cartProduct.quantity,
            totalQuantity: this.product.totalQuantity,
            price: 0
          };
        }
      });
  }

  addToCart(product: Product, quantity: number) {
    this.productsService.addToCart(product, quantity);
    this.getProductById(product.id!);
  }

  removeFromCart() {
    this.productsService.removeFromCart(this.product.id!);
    this.getProductById(this.product.id!);
  }
}
