import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MovementService } from '../../../services/movement.service';
import { ProductService } from '../../../services/product.service';
import { MovementCreateComponent } from '../movement-create/movement-create';

@Component({
  selector: 'app-movement-history',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './movement-history.html',
  styleUrls: ['./movement-history.css'],
})
export class MovementHistoryComponent implements AfterViewInit {
  displayedColumns = ['date', 'product', 'type', 'quantity', 'price', 'note'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public movementService: MovementService,
    public productService: ProductService,
    private dialog: MatDialog
  ) {
    this.dataSource.data = this.movementService.movements().slice().reverse();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data, filter) => {
      const productName = this.productName(data.productId).toLowerCase();
      return (
        productName.includes(filter) ||
        data.type.toLowerCase().includes(filter) ||
        (data.note && data.note.toLowerCase().includes(filter))
      );
    };
    this.dataSource.filter = value;
  }

  clearFilter(input: HTMLInputElement) {
    input.value = '';
    this.dataSource.filter = '';
  }

  productName(id: number) {
    const product = this.productService.getById(id);
    return product ? product.name : '—';
  }

  openModal(productId?: number, type?: 'entrada' | 'saida') {
    const dialogRef = this.dialog.open(MovementCreateComponent, {
      width: '450px',
      data: { productId, type },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.dataSource.data = this.movementService.movements().slice().reverse();
      this.paginator.firstPage();
    });
  }
}
