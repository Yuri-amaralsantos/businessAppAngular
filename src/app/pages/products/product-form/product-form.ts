import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: true, // ⚠️ precisa ser standalone
  imports: [FormsModule], // ⚠️ aqui incluímos FormsModule
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.css'],
})
export class ProductFormComponent {
  name = '';
  stock = 0;

  constructor(private router: Router) {}

  save() {
    console.log('Produto salvo:', { name: this.name, stock: this.stock });
    this.router.navigate(['/products']);
  }
}
