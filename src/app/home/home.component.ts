import { Component, OnInit } from '@angular/core';
import { ComplaintService } from '../services/complaint.service';
import { Router } from '@angular/router';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { CommonModule } from '@angular/common';
import type { EChartsOption } from 'echarts';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [
    provideEcharts(),
  ]
})
export class HomeComponent implements OnInit {
  totalComplaints: number = 0;
  draft: number = 0;
  resolved: number = 0;
  opened: number = 0;
  canceled: number = 0;

  // Add initOpts to set chart dimensions and renderer
  initOpts = {
    renderer: 'svg', // Renderer can be 'canvas' or 'svg'
    width: 1000,
    height: 300,
  };

  options: EChartsOption = {
    color: ['#3398DB'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: ['DRAFT', 'OPENED', 'RESOLVED', 'CANCELED'],
        axisTick: {
          alignWithLabel: true,
        },
        axisLabel: {
          show: true, // Ensure labels are shown
          interval: 0, // Force display of all labels
          rotate: 0,   // You can adjust this if labels overlap
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'Complaints',
        type: 'bar',
        barWidth: '60%',
        data: [0, 0, 0, 0], 
      },
    ],
  };

  constructor(private router: Router, private complaintService: ComplaintService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }
  
  loadDashboardData(): void {
    // Fetch total complaints
    this.complaintService.getTotalComplaints().subscribe({
      next: (data: number) => this.totalComplaints = data,
      error: (error) => console.error('Error fetching total complaints:', error)
    });

    // Fetch complaints by status and update the chart dynamically
    this.complaintService.getComplaintsByStatus('DRAFT').subscribe({
      next: (data: number) => {
        this.draft = data;
        this.updateChartData();
      },
      error: (error) => console.error('Error fetching draft complaints:', error)
    });

    this.complaintService.getComplaintsByStatus('RESOLVED').subscribe({
      next: (data: number) => {
        this.resolved = data;
        this.updateChartData();
      },
      error: (error) => console.error('Error fetching resolved complaints:', error)
    });

    this.complaintService.getComplaintsByStatus('OPEN').subscribe({
      next: (data: number) => {
        this.opened = data;
        this.updateChartData();
      },
      error: (error) => console.error('Error fetching opened complaints:', error)
    });

    this.complaintService.getComplaintsByStatus('CANCELED').subscribe({
      next: (data: number) => {
        this.canceled = data;
        this.updateChartData();
      },
      error: (error) => console.error('Error fetching canceled complaints:', error)
    });
  }

  updateChartData(): void {
    // Update the chart data dynamically after fetching from the service
    this.options = {
      ...this.options,
      series: [
        {
          name: 'Complaints',
          type: 'bar',
          barWidth: '60%',
          data: [this.draft, this.opened, this.resolved, this.canceled], // Use the updated data
        },
      ],
    };
  }
}
