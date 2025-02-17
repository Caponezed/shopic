import { Component, Inject, inject, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { ProductsService } from '../../../../services/products.service';
import { Product } from '../../../../models/product.model';
import { FILES_API_ENDPOINT } from '../../../../app.config';

@Component({
  selector: 'app-product',
  imports: [CurrencyPipe],
  templateUrl: './product.container.html',
  styleUrl: './product.container.css'
})
export class ProductContainer implements OnInit {
  constructor(@Inject(FILES_API_ENDPOINT) public readonly filesApiEndpoint: string) { }
  productsService = inject(ProductsService);
  activatedRoute = inject(ActivatedRoute);

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
      .pipe(
        take(1)
      )
      .subscribe(product => {
        this.product = product;
      });
  }

}
