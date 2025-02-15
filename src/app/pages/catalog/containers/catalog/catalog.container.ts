import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../../../components/product-card/product-card.component';
import { ProductDto } from '../../../../models/product-dto.model';
import { FormsModule } from '@angular/forms';
import { CatalogFilters } from '../../models/catalog-filters/catalog-filters.model';
import { ShopicButtonDirective } from '../../../../directives/shopicButton/shopic-button.directive';

@Component({
  selector: 'app-catalog',
  imports: [ProductCardComponent, FormsModule, ShopicButtonDirective],
  templateUrl: './catalog.container.html',
  styleUrl: './catalog.container.css'
})
export class CatalogContainer implements OnInit {
  products: ProductDto[] = [];
  filteredProducts: ProductDto[] = [];
  productTypes = new Set<string>();
  MAX_PRICE: number = 0;
  productFilters: CatalogFilters = {
    type: '',
    startPrice: 0,
    endPrice: Number.POSITIVE_INFINITY
  };

  ngOnInit(): void {
    this.products = [];

    this.filteredProducts = this.products.slice();

    const prices: number[] = [];
    this.products.map(p => {
      this.productTypes.add(p.type);
      prices.push(p.price);
    });

    this.MAX_PRICE = Math.max(...prices);
    this.productFilters.endPrice = this.MAX_PRICE;
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(
      product =>
        (this.productFilters.type.length > 0 ? product.type === this.productFilters.type : true) &&
        product.price >= this.productFilters.startPrice &&
        product.price <= this.productFilters.endPrice
    );
  }
}
