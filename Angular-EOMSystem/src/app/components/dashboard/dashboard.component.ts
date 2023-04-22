import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Chart } from 'angular-highcharts';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';  

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  template: `
    <button (click)="add()">Add Point!</button>
    <div [chart]="chart"></div>`
})
export class DashboardComponent implements OnInit {
  constructor(private backend: BackendService) {}
  programs: any;
  ngOnInit(): void {
    this.backend.programs().subscribe({
      next: (data) => (this.programs = data),
    });
  }
  chart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Linechart'
    },
    xAxis:{
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec',
      ]
    },
    yAxis:{
      title: {
        text: 'Sample'
      }
    },
    series:[
      {
        name: "Sample",
        type: "line",
        data: [1,2,3,4,5,6,7,8,9]

      }
    ]
  });

  // add point to chart serie
  add() {
    this.chart.addPoint(Math.floor(Math.random() * 10));
  }

}