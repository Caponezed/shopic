import { Component, EventEmitter, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../../../models/product.model';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { UtilsService } from '../../../../../services/utils.service';
import { UploadingFile } from '../../../../../models/uploading-file.model';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-product-dialog',
  imports: [FormsModule, JsonPipe],
  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.css'
})
export class ProductDialogComponent {
  constructor(@Inject(DIALOG_DATA) public product: Product, public readonly utilsService: UtilsService) {
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

  imageFile: UploadingFile = {
    formData: new FormData(),
    file: new File([], 'Файл не выбран'),
    fileIsUploaded: false
  };

  addNewProductEmitter = new EventEmitter<Product>();
  updateProductEmitter = new EventEmitter<Product>();
  uploadImageEmitter = new EventEmitter<UploadingFile>();

  get productIsValid(): boolean {
    return this.product.name.length > 3 &&
      this.product.description.length > 3 &&
      this.product.price > 0 &&
      this.product.productType.name.length > 3 &&
      this.product.totalQuantity > 0 &&
      (!this.product.id ? !this.product.imgSrc : true);
  }

  addNewProuduct() {
    this.addNewProductEmitter.emit(this.product);
  }

  updateProduct() {
    this.updateProductEmitter.emit(this.product);
  }

  uploadImageProduct() {
    this.uploadImageEmitter.emit(this.imageFile);
    const modifiedFileName = (this.imageFile.formData.get('file') as File).name;
    this.product.imgSrc = modifiedFileName;
    console.log(this.product);
  }
}
