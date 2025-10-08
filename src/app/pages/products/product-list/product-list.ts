import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductService, Product } from '../../../services/product.service';
import { ProductFormComponent } from '../product-form/product-form';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css'],
})
export class ProductListComponent implements AfterViewInit, OnInit {
  displayedColumns = ['name', 'category', 'stock', 'baseSalePrice', 'actions'];
  dataSource = new MatTableDataSource<Product>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public productService: ProductService, private dialog: MatDialog) {}

  ngOnInit() {
    this.dataSource.data = this.productService.products();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data, filter) =>
      data.name.toLowerCase().includes(filter) || data.category.toLowerCase().includes(filter);
    this.dataSource.filter = value;
  }

  clearFilter(input: HTMLInputElement) {
    input.value = '';
    this.dataSource.filter = '';
  }

  openNewProduct() {
    const dialogRef = this.dialog.open(ProductFormComponent, { width: '400px' });
    dialogRef.afterClosed().subscribe(() => {
      this.dataSource.data = this.productService.products();
    });
  }

  editProduct(product: Product) {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '400px',
      data: { ...product },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.dataSource.data = this.productService.products();
    });
  }

  removeProduct(product: Product) {
    if (confirm(`Deseja remover o produto "${product.name}"?`)) {
      this.productService.removeProduct(product.id);
      this.dataSource.data = this.productService.products();
    }
  }
}
