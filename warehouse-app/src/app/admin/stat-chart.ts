import { Component } from '@angular/core';
import { TRANSACTIONS } from '../data';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-stat-chart',
  standalone: true,
  imports: [BaseChartDirective],
  providers: [provideCharts(withDefaultRegisterables())],
  template: `
    <canvas baseChart
        [data]="barChartData"
        [options]="barChartOptions"
        [type]="barChartType">
    </canvas>
  `
})
export class StatChartComponent {

  barChartType: ChartType = 'bar';

  // Step 1 filter + count 30-day data
  last30Days = TRANSACTIONS
    .filter(t => {
      const date = new Date(t.update_at);
      const today = new Date();
      const diff = (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
      return diff <= 30;
    })
    .reduce((acc: any, t: any) => {
      const key = new Date(t.update_at).toISOString().split('T')[0];

      if (!acc[key]) acc[key] = { sell: 0, buy: 0 };

      if (t.transaction_type === 'Selling') acc[key].sell++;
      else if (t.transaction_type === 'Buying') acc[key].buy++;

      return acc;
    }, {});

  // Step 2: extract sorted labels
  labels: string[] = Object.keys(this.last30Days).sort();

  // Step 3: map dataset for both buy and sell
  sellData = this.labels.map(d => this.last30Days[d].sell);
  buyData  = this.labels.map(d => this.last30Days[d].buy);

  // Step 4: chart config
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: { y: { beginAtZero: true } }
  };

  barChartData = {
    labels: this.labels,
    datasets: [
      {
        label: 'Selling orders',
        data: this.sellData,
        backgroundColor: 'green'
      },
      {
        label: 'Buying orders',
        data: this.buyData,
        backgroundColor: 'gold'
      }
    ]
  };
}
