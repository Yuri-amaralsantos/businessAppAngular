import { Routes } from '@angular/router';
import { LayoutComponent } from './components/Layout/Layout';
import { HomeComponent } from './pages/home/home';
import { ProductListComponent } from './pages/products/product-list/product-list';
import { MovementHistoryComponent } from './pages/movements//movement-history/movement-history';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'movements', component: MovementHistoryComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];
