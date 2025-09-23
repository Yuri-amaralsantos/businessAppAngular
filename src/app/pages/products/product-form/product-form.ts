import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../product.service';

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

  constructor(
    private productService: ProductService,
    private dialogRef: MatDialogRef<ProductFormComponent>
  ) {}

  save() {
    const exists = this.productService
      .products()
      .some((p) => p.name.toLowerCase() === this.name.trim().toLowerCase());

    if (exists) {
      alert(`O produto "${this.name}" já existe!`);
      return;
    }

    this.productService.addProduct({
      id: Date.now(),
      name: this.name.trim(),
      stock: this.stock,
    });

    this.dialogRef.close();
  }
}
