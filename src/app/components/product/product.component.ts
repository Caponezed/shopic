import { Component, inject, Input, OnInit } from '@angular/core';
import { ProductDto as ProductModel } from '../../models/product-dto.model';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [CurrencyPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  activatedRoute = inject(ActivatedRoute);

  @Input() product: ProductModel = {
    id: 0,
    name: 'Товар 1',
    description: 'Описание 1',
    imgSrc: 'image-placeholder.jpg',
    type: 'Тип 1',
    price: 0,
  };

  ngOnInit(): void {
  }

}
