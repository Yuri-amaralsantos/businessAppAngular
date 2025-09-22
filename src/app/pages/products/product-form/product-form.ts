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
    this.productService.addProduct({
      id: Date.now(),
      name: this.name,
      stock: this.stock,
    });
    this.router.navigate(['/products']);
  }
}
