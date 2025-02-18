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
import { User } from '../../../../models/user.model';
import { UsersDialogComponent } from '../../users-management-table/components/users-dialog/users-dialog.component';
import { UsersService } from '../../../../services/users.service';

@Component({
  selector: 'app-admin-panel',
  imports: [ProductsManagementTableComponent, UsersManagementTableComponent, DialogModule],
  templateUrl: './admin-panel.container.html',
  styleUrl: './admin-panel.container.css'
})
export class AdminPanelContainer implements OnInit {
  productsService = inject(ProductsService);
  usersService = inject(UsersService);
  dialogService = inject(Dialog);
  filesService = inject(FilesService);

  products: Product[] = [];
  users: User[] = [];
  activeManagementTable: string = 'products';

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllUsers();
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

  openUserDialog(user?: User) {
    const dialog = this.dialogService.open(UsersDialogComponent, { data: structuredClone(user) });

    dialog.componentInstance?.registerEmitter
      .subscribe(user => this.register(user));

    dialog.componentInstance?.updateUserEmitter
      .subscribe(user => this.updateUser(user));
  }

  getAllUsers() {
    this.usersService.getAllUsers()
      .pipe(take(1))
      .subscribe(users => this.users = users);
  }
  register(user: User) {
    this.usersService.register(user)
      .pipe(take(1))
      .subscribe(newUser => {
        this.getAllUsers();
        alert(`Пользователь с email "${newUser.email}" был успешно создан`);
      });
  }
  updateUser(user: User) {
    this.usersService.updateUser(user)
      .pipe(take(1))
      .subscribe(() => {
        this.getAllUsers();
        alert(`Пользователь с email "${user.email}" был успешно обновлён`);
      });
  }
  deleteUserById(user: User) {
    this.usersService.deleteUserById(user.id!)
      .pipe(take(1))
      .subscribe(() => {
        this.getAllUsers();
        alert(`Пользователь с email "${user.email}" был успешно удалён`);
      });
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
