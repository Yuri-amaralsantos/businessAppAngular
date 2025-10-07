import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Product, ProductService } from '../../../services/product.service';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.css'],
})
export class ProductFormComponent {
  name = '';
  stock = 0;
  id?: number;

  constructor(
    private productService: ProductService,
    private dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: Product
  ) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.stock = data.stock;
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
      this.productService.updateProduct({ id: this.id, name: this.name, stock: this.stock });
    } else {
      this.productService.addProduct({
        id: Date.now(),
        name: this.name.trim(),
        stock: this.stock,
      });
    }

    this.dialogRef.close(true);
  }
}
