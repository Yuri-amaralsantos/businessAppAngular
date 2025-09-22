import { Injectable, signal } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  stock: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private _products = signal<Product[]>([
    { id: 1, name: 'Mouse', stock: 50 },
    { id: 2, name: 'Teclado', stock: 30 },
  ]);

  products = this._products;

  addProduct(product: Product) {
    this._products.update((list) => [...list, product]);
  }
}
