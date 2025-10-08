import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MovementService } from '../../../services/movement.service';
import { ProductService } from '../../../services/product.service';
import { MovementCreateComponent } from '../movement-create/movement-create';

@Component({
  selector: 'app-movement-history',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatTableModule, MatPaginatorModule],
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
    const movements = this.movementService.movements().slice().reverse();
    this.dataSource.data = movements;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
      const updated = this.movementService.movements().slice().reverse();
      this.dataSource.data = updated;
      this.paginator.firstPage();
    });
  }
}
