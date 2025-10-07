import { Injectable, signal } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  stock: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private _products = signal<Product[]>([]);
  products = this._products;

  addProduct(product: Product) {
    this._products.update((list) => [...list, product]);
  }

  updateProduct(updated: Product) {
    this._products.update((list) => list.map((p) => (p.id === updated.id ? updated : p)));
  }

  adjustStock(productId: number, delta: number) {
    this._products.update((list) =>
      list.map((p) => (p.id === productId ? { ...p, stock: p.stock + delta } : p))
    );
  }

  getById(id: number) {
    return this._products().find((p) => p.id === id);
  }
}
