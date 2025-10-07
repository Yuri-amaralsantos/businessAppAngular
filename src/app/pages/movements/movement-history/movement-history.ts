import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
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
  displayedColumns = ['date', 'product', 'type', 'quantity', 'note'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public productService: ProductService, private dialog: MatDialog) {
    // Inicializa com as movimentações invertidas (mais recentes primeiro)
    const movements = this.productService.movements().slice().reverse();
    this.dataSource.data = movements;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  productName(id: number) {
    return this.productService.getProductById(id)?.name ?? '—';
  }

  openModal(productId?: number, type?: 'entrada' | 'saida' | 'ajuste') {
    const dialogRef = this.dialog.open(MovementCreateComponent, {
      width: '450px',
      data: { productId, type },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(() => {
      // Atualiza a tabela após o modal fechar
      const updated = this.productService.movements().slice().reverse();
      this.dataSource.data = updated;
      this.paginator.firstPage();
    });
  }
}
