import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';



@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  ngOnInit(): void {
    this.createBarChart();
    this.createHistogramChart();
  }

  createBarChart() {
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Loans Applied', 'Reviews', 'User Feedbacks', 'Loans Available'],
        datasets: [{
          label: 'Counts',
          data: [1200, 850, 500, 300],
          backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: true } }
      }
    });
  }

  createHistogramChart() {
    const ctx = document.getElementById('histogramChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar', // Histogram charts are essentially bar charts
      data: {
        labels: ['Low', 'Medium', 'High', 'Very High'],
        datasets: [{
          label: 'Risk Levels',
          data: [700, 1000, 900, 1200],
          backgroundColor: ['#d9534f', '#f0ad4e', '#5bc0de', '#5cb85c'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: true } }
      }
    });
  }
}