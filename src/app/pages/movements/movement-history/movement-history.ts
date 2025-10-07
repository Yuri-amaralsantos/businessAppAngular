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
  displayedColumns = ['date', 'product', 'type', 'quantity', 'note'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // ⬇️ injeta ambos os serviços
  constructor(
    public movementService: MovementService,
    public productService: ProductService,
    private dialog: MatDialog
  ) {
    // Inicializa com as movimentações mais recentes primeiro
    const movements = this.movementService.movements().slice().reverse();
    this.dataSource.data = movements;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // 🔍 Busca o nome do produto pelo ID via ProductService
  productName(id: number) {
    const product = this.productService.getById(id);
    return product ? product.name : '—';
  }

  // ➕ Abre o modal de nova movimentação
  openModal(productId?: number, type?: 'entrada' | 'saida') {
    const dialogRef = this.dialog.open(MovementCreateComponent, {
      width: '450px',
      data: { productId, type },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(() => {
      // Atualiza a tabela após o modal fechar
      const updated = this.movementService.movements().slice().reverse();
      this.dataSource.data = updated;
      this.paginator.firstPage();
    });
  }
}
