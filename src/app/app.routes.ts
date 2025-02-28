import { Routes } from '@angular/router';
import { HomeContainer } from './pages/home/containers/home/home.container';
import { CatalogContainer } from './pages/catalog/containers/catalog/catalog.container';
import { ProductContainer } from './pages/product/containers/product/product.container';
import { AdminPanelContainer } from './pages/admin-panel/containers/admin-panel/admin-panel.container';
import { LoginContainer } from './pages/login/login.container';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [
  { path: 'login', component: LoginContainer },
  { path: 'home', component: HomeContainer },
  { path: 'catalog', component: CatalogContainer },
  { path: 'product/:id', component: ProductContainer },
  { path: 'cart', component: CartComponent },
  { path: 'admin', component: AdminPanelContainer },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
