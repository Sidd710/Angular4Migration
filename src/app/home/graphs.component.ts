// TODO SOMEDAY: Feature Componetized like CrisisCenter
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  templateUrl: './graphs.component.html'
})

export class GraphsComponent implements OnInit {
  ngOnInit() {
  }

  // 1. LINE CHART
  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
  ];
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: any = {
    animation: false,
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';
  
  public randomizeLine(): void {
    let _lineChartData: Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = { data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label };
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }
  // events
  public lineChartClicked(e: any): void {
    console.log(e);
  }
  public lineChartHovered(e: any): void {
    console.log(e);
  }


  // 2. BAR CHART
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];
  // events
  public barChartClicked(e: any): void {
    console.log(e);
  }
  public barChartHovered(e: any): void {
    console.log(e);
  }
  public randomizeBar(): void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
  }


  // 3. DOUGHNUT CHART
  public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: number[] = [350, 450, 100];
  public doughnutChartType: string = 'doughnut';
  // events
  public doughnutChartClicked(e: any): void {
    console.log(e);
  }
  public doughnutchartHovered(e: any): void {
    console.log(e);
  }


  // 4. RADAR CHART
  public radarChartLabels: string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];
  public radarChartData: any = [
    { data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B' }
  ];
  public radarChartType: string = 'radar';
  // events
  public radarChartClicked(e: any): void {
    console.log(e);
  }
  public radarChartHovered(e: any): void {
    console.log(e);
  }


  // 4. PIE CHART
  public pieChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType: string = 'pie';
  // events
  public pieChartClicked(e: any): void {
    console.log(e);
  }
  public pieChartHovered(e: any): void {
    console.log(e);
  }


  // 5. POLAR AREA CHART
  public polarAreaChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
  public polarAreaChartData: number[] = [300, 500, 100, 40, 120];
  public polarAreaLegend: boolean = true;
  public polarAreaChartType: string = 'polarArea';
  // events
  public polarAreaChartClicked(e: any): void {
    console.log(e);
  }
  public polarAreaChartHovered(e: any): void {
    console.log(e);
  }


  // 6. DYNAMIC CHARTS
  public dynamicLineChartData:Array<any> = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  public dynamicLineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public dynamicLineChartType:string = 'line';
  public dynamicPieChartType:string = 'pie';
  // Pie
  public dynamicPieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public dynamicPieChartData:number[] = [300, 500, 100];

  public randomizeType():void {
    this.dynamicLineChartType = this.dynamicLineChartType === 'line' ? 'bar' : 'line';
    this.dynamicPieChartType = this.dynamicPieChartType === 'doughnut' ? 'pie' : 'doughnut';
  }
  public dynamicChartClicked(e:any):void {
    console.log(e);
  }
  public dynamicChartHovered(e:any):void {
    console.log(e);
  }
 
}
