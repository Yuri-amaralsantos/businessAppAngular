// src/app/services/product.service.ts
import { Injectable, signal } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  stock: number;
}

export interface StockMovement {
  id: number;
  productId: number;
  type: 'entrada' | 'saida';
  quantity: number;
  date: Date;
  note?: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private _products = signal<Product[]>([
    { id: 1, name: 'Mouse', stock: 50 },
    { id: 2, name: 'Teclado', stock: 30 },
  ]);
  products = this._products;

  private _movements = signal<StockMovement[]>([]);
  movements = this._movements;

  addProduct(product: Product) {
    this._products.update((list) => [...list, product]);
  }

  updateProduct(updated: Product) {
    this._products.update((list) => list.map((p) => (p.id === updated.id ? updated : p)));
    return this._products();
  }

  addMovement(m: Omit<StockMovement, 'id' | 'date'>) {
    const newM: StockMovement = { id: Date.now(), date: new Date(), ...m };

    this._products.update((products) =>
      products.map((p) => {
        if (p.id !== m.productId) return p;
        if (m.type === 'entrada') return { ...p, stock: p.stock + m.quantity };
        if (m.type === 'saida') return { ...p, stock: p.stock - m.quantity };

        return { ...p, stock: m.quantity };
      })
    );

    this._movements.update((list) => [...list, newM]);
  }

  getProductById(id: number) {
    return this._products().find((p) => p.id === id);
  }
}
