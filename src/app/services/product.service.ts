import { Injectable, signal } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  stock: number;
  category: string;
  baseSalePrice?: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private _products = signal<Product[]>([]);
  products = this._products;

  addProduct(product: Product) {
    this._products.update((list) => [...list, product]);
  }

  updateProduct(update: { id: number; name: string; category?: string; baseSalePrice?: number }) {
    const products = this._products();
    this._products.set(
      products.map((p) =>
        p.id === update.id
          ? {
              ...p,
              name: update.name,
              category: update.category ?? p.category,
              baseSalePrice: update.baseSalePrice ?? p.baseSalePrice,
            }
          : p
      )
    );
  }

  adjustStock(productId: number, delta: number) {
    this._products.update((list) =>
      list.map((p) => (p.id === productId ? { ...p, stock: p.stock + delta } : p))
    );
  }

  getById(id: number) {
    return this._products().find((p) => p.id === id);
  }

  removeProduct(productId: number) {
    this._products.update((list) => list.filter((p) => p.id !== productId));
  }
}
