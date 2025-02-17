import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { take } from 'rxjs/internal/operators/take';
import { Product } from '../../../../models/product.model';
import { ProductsManagementTableComponent } from '../../products-management-table/products-management-table.component';
import { UsersManagementTableComponent } from '../../users-management-table/users-management-table.component';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { ProductDialogComponent } from '../../products-management-table/components/product-dialog/product-dialog.component';
import { FilesService } from '../../../../services/files.service';
import { UploadingFile } from '../../../../models/uploading-file.model';

@Component({
  selector: 'app-admin-panel',
  imports: [ProductsManagementTableComponent, UsersManagementTableComponent, DialogModule],
  templateUrl: './admin-panel.container.html',
  styleUrl: './admin-panel.container.css'
})
export class AdminPanelContainer implements OnInit {
  productsService = inject(ProductsService);
  dialogService = inject(Dialog);
  filesService = inject(FilesService);

  products: Product[] = [];
  activeManagementTable: string = 'products';

  ngOnInit(): void {
    this.getAllProducts();
  }

  openProductDialog(product?: Product) {
    const dialog = this.dialogService.open(ProductDialogComponent, { data: structuredClone(product) });

    dialog.componentInstance?.addNewProductEmitter
      .subscribe(product => this.addNewProduct(product));

    dialog.componentInstance?.updateProductEmitter
      .subscribe(product => this.updateProduct(product));

    dialog.componentInstance?.uploadImageEmitter
      .subscribe(uploadingFile => this.uploadImage(uploadingFile));
  }

  getAllProducts() {
    this.productsService.getAllProducts()
      .pipe(take(1))
      .subscribe(products => this.products = products);
  }

  addNewProduct(newProduct: Product) {
    this.productsService.addNewProduct(newProduct)
      .pipe(take(1))
      .subscribe((newProduct) => {
        this.getAllProducts();
        alert(`Товар с наименованием "${newProduct.name}" был успешно создан`);
      }
      );
  }

  updateProduct(product: Product) {
    this.productsService.updateProduct(product)
      .pipe(take(1))
      .subscribe(product => {
        this.getAllProducts();
        alert(`Товар с наименованием "${product.name}" был успешно обновлён`);
      });
  }

  deleteProductById(product: Product) {
    this.productsService.deleteProductById(product.id!)
      .pipe(take(1))
      .subscribe(() => {
        this.getAllProducts();
        alert(`Товар с наименованием "${product.name}" был успешно удалён`);
      }
      );
  }

  uploadImage(image: UploadingFile) {
    this.filesService.uploadFile(image.formData)
      .pipe(take(1))
      .subscribe((stringResponse) => alert(stringResponse));
  }
}
