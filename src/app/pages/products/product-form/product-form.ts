import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.css'],
})
export class ProductFormComponent {
  name = '';
  stock = 0;

  constructor(private productService: ProductService, private router: Router) {}

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

    this.router.navigate(['/products']);
  }
}
