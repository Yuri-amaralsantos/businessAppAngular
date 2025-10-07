import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ProductService, Product } from '../../../services/product.service';
import { ProductFormComponent } from '../product-form/product-form';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatIconModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css'],
})
export class ProductListComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'stock', 'actions'];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public productService: ProductService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.productService.products());
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openNewProduct() {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.dataSource.data = this.productService.products();
    });
  }

  editProduct(product: Product) {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '400px',
      data: { ...product },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data = this.productService.updateProduct(result);
      }
    });
  }
}
