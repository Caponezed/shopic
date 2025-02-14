import { Routes } from '@angular/router';
import { HomeContainer } from './pages/home/containers/home/home.container';

export const routes: Routes = [
  { path: 'home', component: HomeContainer },
  { path: '**', redirectTo: '/home' }
];
