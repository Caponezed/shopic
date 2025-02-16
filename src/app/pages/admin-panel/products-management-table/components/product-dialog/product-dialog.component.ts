import { Component, EventEmitter, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../../../models/product.model';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-product-dialog',
  imports: [FormsModule],
  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.css'
})
export class ProductDialogComponent {
  constructor(@Inject(DIALOG_DATA) public product: Product) {
    if (!product) this.product = {
      name: '',
      description: '',
      productType: {
        name: ''
      },
      imgSrc: '',
      totalQuantity: 0,
      price: 0
    };
  }

  addNewProductEmitter = new EventEmitter<Product>();
  updateProductEmitter = new EventEmitter<Product>();

  get productIsValid(): boolean {
    return this.product.name.length > 3 &&
      this.product.description.length > 3 &&
      this.product.price > 0 &&
      this.product.productType.name.length > 3 &&
      this.product.totalQuantity > 0;
  }

  addNewProuduct() {
    this.addNewProductEmitter.emit(this.product);
  }

  updateProduct() {
    this.updateProductEmitter.emit(this.product);
  }
}
