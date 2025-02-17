import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { ShopicButtonDirective } from '../../directives/shopicButton/shopic-button.directive';
import { Product } from '../../models/product.model';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FILES_API_ENDPOINT } from '../../app.config';

@Component({
  selector: 'app-product-card',
  imports: [ShopicButtonDirective, CurrencyPipe, RouterLink, NgOptimizedImage],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
  constructor(
    @Inject(FILES_API_ENDPOINT) public readonly filesApiEndpoint: string
  ) { }

  @Input() product: Product = {
    name: 'Заголовок',
    description: 'Описание товара',
    price: 0,
    productType: {
      name: "Тип товара"
    },
    imgSrc: '',
    totalQuantity: 0
  };

  @Output() clickEmitter = new EventEmitter<void>();
}
