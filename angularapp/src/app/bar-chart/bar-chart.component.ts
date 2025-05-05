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
    this.createLineChart();
  }

  createBarChart() {
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Loans Applied', 'Reviews', 'User Feedbacks', 'Loans Available'],
        datasets: [{
          label: 'Counts',
          data: [25, 30, 70, 40],
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

  createLineChart() {
    const ctx = document.getElementById('lineChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Loans Applied', 'Reviews', 'User Feedbacks', 'Loans Available'],
        datasets: [{
          label: 'Counts Trend',
          data: [25, 30, 70, 40], // Same data as bar chart
          borderColor: '#4e73df',
          backgroundColor: 'rgba(78, 115, 223, 0.2)',
          borderWidth: 2,
          tension: 0.3 // Adds a smooth curve effect
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: true } },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
}