import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ProductListComponent } from './pages/products/product-list/product-list';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductListComponent },
  { path: '**', redirectTo: '' },
];
