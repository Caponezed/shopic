import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-products-management-table',
  imports: [],
  templateUrl: './products-management-table.component.html',
  styleUrl: './products-management-table.component.css'
})
export class ProductsManagementTableComponent {
  @Input({ required: true }) products: Product[] = [];

  @Output() openAddNewProductDialogEmitter = new EventEmitter<void>();
  @Output() openUpdateProductDialogEmitter = new EventEmitter<Product>();
  @Output() deleteProductByIdEmitter = new EventEmitter<Product>();

  openAddNewProductDialog() {
    this.openAddNewProductDialogEmitter.emit();
  }

  deleteProductById(product: Product) {
    this.deleteProductByIdEmitter.emit(product);
  }

  openUpdateProductDialog(product: Product) {
    this.openUpdateProductDialogEmitter.emit(product);
  }
}
