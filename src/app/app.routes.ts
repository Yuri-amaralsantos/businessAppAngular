import { Routes } from '@angular/router';
import { LayoutComponent } from './components/Layout/Layout';
import { HomeComponent } from './pages/home/home';
import { ProductListComponent } from './pages/products/product-list/product-list';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'products', component: ProductListComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];
