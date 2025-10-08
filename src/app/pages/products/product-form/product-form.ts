import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Product, ProductService } from '../../../services/product.service';
import { CurrencyMaskModule } from 'ng2-currency-mask';

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
    CurrencyMaskModule,
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
  baseSalePrice = 0;

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
      this.baseSalePrice = data.baseSalePrice ?? 0;
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

    const productData: Product = {
      id: this.id ?? Date.now(),
      name: this.name.trim(),
      stock: this.stock,
      category: this.category,
      baseSalePrice: this.baseSalePrice,
    };

    if (this.id) {
      this.productService.updateProduct(productData);
    } else {
      this.productService.addProduct(productData);
    }

    this.dialogRef.close(true);
  }
}
