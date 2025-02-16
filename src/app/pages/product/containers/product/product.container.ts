import { Component, inject, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { ProductsService } from '../../../../services/products.service';
import { Product } from '../../../../models/product.model';

@Component({
  selector: 'app-product',
  imports: [CurrencyPipe],
  templateUrl: './product.container.html',
  styleUrl: './product.container.css'
})
export class ProductContainer implements OnInit {
  productsService = inject(ProductsService);
  activatedRoute = inject(ActivatedRoute);

  product: Product = {
    name: 'Товар 1',
    description: 'Описание 1',
    imgSrc: 'image-placeholder.jpg',
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
      .pipe(
        take(1)
      )
      .subscribe(product => {
        this.product = product;
      });
  }

}
