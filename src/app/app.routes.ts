import { Routes } from '@angular/router';
import { HomeContainer } from './pages/home/containers/home/home.container';
import { CatalogContainer } from './pages/catalog/containers/catalog/catalog.container';
import { ProductContainer } from './pages/product/containers/product/product.container';

export const routes: Routes = [
  { path: 'home', component: HomeContainer },
  { path: 'catalog', component: CatalogContainer },
  { path: 'product/:id', component: ProductContainer },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
