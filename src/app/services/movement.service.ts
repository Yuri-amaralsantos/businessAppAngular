import { Injectable, signal } from '@angular/core';
import { ProductService } from './product.service';

export interface StockMovement {
  id: number;
  productId: number;
  type: 'entrada' | 'saida';
  quantity: number;
  price: number;
  date: Date;
  note?: string;
}

@Injectable({ providedIn: 'root' })
export class MovementService {
  private _movements = signal<StockMovement[]>([]);
  movements = this._movements;

  constructor(private productService: ProductService) {}

  addMovement(m: Omit<StockMovement, 'id' | 'date'>): { success: boolean; error?: string } {
    const product = this.productService.products().find((p) => p.id === m.productId);
    if (!product) return { success: false, error: 'Produto não encontrado' };

    if (m.type === 'saida' && m.quantity > product.stock) {
      return { success: false, error: `Estoque insuficiente! Disponível: ${product.stock}` };
    }

    const newM: StockMovement = { id: Date.now(), date: new Date(), ...m };
    this._movements.update((list) => [...list, newM]);

    const delta = m.type === 'entrada' ? m.quantity : -m.quantity;
    this.productService.adjustStock(m.productId, delta);

    return { success: true };
  }
}
