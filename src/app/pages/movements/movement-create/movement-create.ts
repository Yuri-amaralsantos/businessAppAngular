import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
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

  constructor(
    private dialogRef: MatDialogRef<MovementCreateComponent>,
    public productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.productId = data.productId || null;
      this.type = data.type || '';
    }
  }

  save() {
    if (!this.productId || !this.type || !this.quantity) return;

    this.productService.addMovement({
      productId: this.productId,
      type: this.type,
      quantity: this.quantity,
      note: this.note,
    });

    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
