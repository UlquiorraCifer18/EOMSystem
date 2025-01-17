import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Chart } from 'angular-highcharts';
import { AuthService } from '../../services/auth.service';
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
  constructor(private backend: BackendService,
    private auth: AuthService,) {}

  isAdmin = false;
  public loggedIn: boolean = false;
  programs: any[] = [];
  notification: any;

  //faculty properties
  leadPrograms: any[] = [];
  memberPrograms: any[] = [];
  exmoas: any[] = [];

  ngOnInit(): void {
    this.backend.programs().subscribe({
      next: (data) => (this.programs = Object.values(data)),
    });
    this.backend.expiringMoa().subscribe({
      next: (data) => (this.exmoas = Object.values(data)),
      error: (error) => console.log(error),
    });
    this.notify(true);
    this.backend.userRole().subscribe((data: { role: number }) => {
      if (data.role === 1) {
        this.isAdmin = true;
      }
    });
    this.backend.programByLeader().subscribe((data) => {
      this.leadPrograms = Object.values(data);
    });
    this.backend.programBymember().subscribe((data) => {
      this.memberPrograms = Object.values(data);
    });
    this.auth.authStatus.subscribe((value) => {
      this.loggedIn = value;
    });
    this.backend.userRole().subscribe((data: { role: number }) => {
      if (data.role === 1) {
        this.isAdmin = true;
      }
    });
  }

  notify(boolean: Boolean): any {
    const announcement = document.getElementById('announcement');
    if (!boolean) {
      announcement?.remove();
    }
    return (this.notification =
      'You have 30 days remaining before your partnership with BSU expires');
  }

  deleteProgram(id: number) {
    this.backend.deleteProgram(id).subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error),
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
        data: [1,2,3,4,5,6,7,8,9,10,11,12]

      }
    ]
  });

  // add point to chart serie
  add() {
    this.chart.addPoint(Math.floor(Math.random() * 10));
  }

}