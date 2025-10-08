import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { MovementService } from '../../services/movement.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatGridListModule,
    BaseChartDirective,
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent {
  private productService = inject(ProductService);
  private movementService = inject(MovementService);

  products = this.productService.products;
  movements = this.movementService.movements;

  totalProducts = computed(() => this.products().length);
  totalStock = computed(() => this.products().reduce((sum, p) => sum + p.stock, 0));
  totalMovements = computed(() => this.movements().length);

  stockChartLabels = computed(() => this.products().map((p) => p.name));
  stockChartData = computed<ChartConfiguration['data']>(() => ({
    labels: this.stockChartLabels(),
    datasets: [
      {
        label: 'Estoque Atual',
        data: this.products().map((p) => p.stock),
        backgroundColor: '#1976d2',
      },
    ],
  }));
  stockChartType: ChartType = 'bar';

  movementChartData = computed<ChartConfiguration['data']>(() => {
    const byDate = new Map<string, { entrada: number; saida: number }>();
    this.movements().forEach((m) => {
      const date = new Date(m.date).toLocaleDateString();
      if (!byDate.has(date)) byDate.set(date, { entrada: 0, saida: 0 });
      byDate.get(date)![m.type] += m.quantity;
    });

    const labels = Array.from(byDate.keys());
    const entradaData = labels.map((d) => byDate.get(d)!.entrada);
    const saidaData = labels.map((d) => byDate.get(d)!.saida);

    return {
      labels,
      datasets: [
        { label: 'Entradas', data: entradaData, backgroundColor: '#4caf50' },
        { label: 'Saídas', data: saidaData, backgroundColor: '#f44336' },
      ],
    };
  });
  movementChartType: ChartType = 'bar';
}
