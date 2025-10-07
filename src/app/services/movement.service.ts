import { Injectable, signal } from '@angular/core';
import { ProductService } from './product.service';

export interface StockMovement {
  id: number;
  productId: number;
  type: 'entrada' | 'saida';
  quantity: number;
  date: Date;
  note?: string;
}

@Injectable({ providedIn: 'root' })
export class MovementService {
  private _movements = signal<StockMovement[]>([]);
  movements = this._movements;

  constructor(private productService: ProductService) {}

  addMovement(m: Omit<StockMovement, 'id' | 'date'>) {
    const newM: StockMovement = { id: Date.now(), date: new Date(), ...m };
    this._movements.update((list) => [...list, newM]);

    const delta = m.type === 'entrada' ? m.quantity : -m.quantity;
    this.productService.adjustStock(m.productId, delta);
  }
}
