import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ShopicButtonDirective } from '../../directives/shopicButton/shopic-button.directive';
import { ProductCardModel } from '../../models/product-card/product-card.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [ShopicButtonDirective, CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
  @Input() product: ProductCardModel = {
    title: 'Заголовок',
    description: 'Описание товара',
    price: 0,
    type: 'Тип товара',
    imgSrc: 'image-placeholder.jpg'
  };
  @Input() buttonText: string = 'Открыть товар';

  @Output() clickEmitter = new EventEmitter<void>();

  action() {
    this.clickEmitter.emit();
  }
}
