import { Component, inject, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../../../components/product-card/product-card.component';
import { Product } from '../../../../models/product.model';
import { FormsModule } from '@angular/forms';
import { CatalogFilters } from '../../models/catalog-filters/catalog-filters.model';
import { ShopicButtonDirective } from '../../../../directives/shopicButton/shopic-button.directive';
import { ProductsService } from '../../../../services/products.service';
import { take } from 'rxjs/internal/operators/take';

@Component({
  selector: 'app-catalog',
  imports: [ProductCardComponent, FormsModule, ShopicButtonDirective],
  templateUrl: './catalog.container.html',
  styleUrl: './catalog.container.css'
})
export class CatalogContainer implements OnInit {
  private readonly productsService = inject(ProductsService);

  products: Product[] = [];
  filteredProducts: Product[] = [];
  productTypes = new Set<string>();
  MAX_PRICE: number = 0;
  productFilters: CatalogFilters = {
    productTypeName: '',
    startPrice: 0,
    endPrice: 0
  };

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productsService.getAllProducts()
      .pipe(
        take(1)
      )
      .subscribe(products => {
        this.products = products;

        this.filteredProducts = this.products.slice();

        const prices: number[] = [];
        this.products.map(p => {
          this.productTypes.add(p.productType.name);
          prices.push(p.price);
        });

        this.MAX_PRICE = Math.max(...prices);
        this.productFilters.endPrice = this.MAX_PRICE;
      });
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(
      product =>
        (this.productFilters.productTypeName.length > 0 ? product.productType.name === this.productFilters.productTypeName : true) &&
        product.price >= this.productFilters.startPrice &&
        product.price <= this.productFilters.endPrice
    );
  }
}
