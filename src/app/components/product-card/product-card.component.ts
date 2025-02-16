import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ShopicButtonDirective } from '../../directives/shopicButton/shopic-button.directive';
import { Product } from '../../models/product.model';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [ShopicButtonDirective, CurrencyPipe, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
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
