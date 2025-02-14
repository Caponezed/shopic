import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ShopicButtonDirective } from '../../directives/shopicButton/shopic-button.directive';
import { ProductCardModel } from '../../models/product-card/product-card.model';

@Component({
  selector: 'app-product-card',
  imports: [ShopicButtonDirective],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product: ProductCardModel = {
    title: 'Заголовок',
    description: 'Описание товара',
    imgSrc: 'image-placeholder.jpg'
  };
  @Input() buttonText: string = 'Открыть товар';

  @Output() clickEmitter = new EventEmitter<void>();

  action() {
    this.clickEmitter.emit();
  }
}
