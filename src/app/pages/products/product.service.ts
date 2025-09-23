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
    { id: 3, name: 'Mouse1', stock: 50 },
    { id: 4, name: 'Teclado1', stock: 30 },
    { id: 5, name: 'Mouse2', stock: 50 },
    { id: 6, name: 'Teclado2', stock: 30 },
  ]);

  products = this._products;

  addProduct(product: Product) {
    this._products.update((list) => [...list, product]);
  }
}
