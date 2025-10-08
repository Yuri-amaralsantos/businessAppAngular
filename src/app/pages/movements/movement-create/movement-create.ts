import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MovementService } from '../../../services/movement.service';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-movement-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './movement-create.html',
  styleUrls: ['./movement-create.css'],
})
export class MovementCreateComponent {
  productId: number | null = null;
  type: 'entrada' | 'saida' | '' = '';
  quantity: number | null = null;
  note: string = '';
  errorMessage: string = '';

  constructor(
    private dialogRef: MatDialogRef<MovementCreateComponent>,
    public movementService: MovementService,
    public productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Se não houver produtos cadastrados
    if (this.productService.products().length === 0) {
      this.errorMessage = 'Não há nenhum produto cadastrado!';
    }

    if (data) {
      this.productId = data.productId || null;
      this.type = data.type || '';
    }
  }

  get canSave(): boolean {
    if (!this.productId || !this.type || !this.quantity) return false;
    const product = this.productService.products().find((p) => p.id === this.productId);
    if (!product) return false;

    if (this.type === 'saida' && this.quantity > product.stock) {
      this.errorMessage = `Estoque insuficiente! Disponível: ${product.stock}`;
      return false;
    }

    this.errorMessage = ''; // limpa mensagem se estiver tudo ok
    return true;
  }

  save() {
    if (!this.canSave || !this.productId || !this.type || !this.quantity) return;

    const result = this.movementService.addMovement({
      productId: this.productId,
      type: this.type,
      quantity: this.quantity,
      note: this.note,
    });

    if (!result.success) {
      this.errorMessage = result.error || 'Erro ao salvar movimentação';
      return;
    }

    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
