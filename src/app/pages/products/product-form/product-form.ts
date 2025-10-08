import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Product, ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-form',
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
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.css'],
})
export class ProductFormComponent {
  name = '';
  stock = 0;
  category = '';
  id?: number;
  isEdit = false;

  categories = ['Eletrônicos', 'Roupas', 'Alimentos', 'Brinquedos', 'Outros'];

  constructor(
    private productService: ProductService,
    private dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: Product
  ) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.stock = data.stock;
      this.category = data.category;
      this.isEdit = true;
    }
  }

  save() {
    const exists = this.productService
      .products()
      .some((p) => p.name.toLowerCase() === this.name.trim().toLowerCase() && p.id !== this.id);

    if (exists) {
      alert(`O produto "${this.name}" já existe!`);
      return;
    }

    if (this.id) {
      this.productService.updateProduct({
        id: this.id,
        name: this.name,
        category: this.category,
      });
    } else {
      this.productService.addProduct({
        id: Date.now(),
        name: this.name.trim(),
        stock: this.stock,
        category: this.category,
      });
    }

    this.dialogRef.close(true);
  }
}
