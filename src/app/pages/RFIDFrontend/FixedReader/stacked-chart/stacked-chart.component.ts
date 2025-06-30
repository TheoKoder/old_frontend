import { Component, Input } from '@angular/core';
import { Chart, TooltipItem, registerables } from 'chart.js';
import { ChartData, ChartType, ChartDataset } from 'chart.js';
import { DataMgr, readerData } from './utils';
import 'chartjs-adapter-moment';
import 'chartjs-adapter-date-fns';
import { enUS } from 'date-fns/locale';


// const sqldata12: readerData[] = [
//   {
//     last_seen: new Date("2023-05-06 12:52:25"),
//     Tag: "Tag1",
//     Location: "open plan 1",
//     Antenna: "Reader 1 Antenna one",
//     Floor: "floor 1"
//   },
//   {
//     last_seen: new Date("2023-05-09 00:00:00"),
//     Tag: "Tag1",
//     Location: "open plan 2",
//     Antenna: "Reader 1 Antenna two",
//     Floor: "floor 1"
//   },
//   {
//     last_seen: new Date("2023-05-16 12:53:15"),
//     Tag: "Tag1",
//     Location: "open plan 3",
//     Antenna: "Reader 1 Antenna three",
//     Floor: "floor 1"
//   },
//   {
//     last_seen: new Date("2023-05-20 12:53:15"),
//     Tag: "Tag1",
//     Location: "open plan 4",
//     Antenna: "Reader 1 Antenna four",
//     Floor: "floor 1"
//   }
// ]


@Component({
  selector: 'app-stacked-chart',
  templateUrl: './stacked-chart.component.html',
  styleUrl: './stacked-chart.component.scss'
})
export class StackedChartComponent {
  @Input() chartData!: readerData[] 
  Mgr!: DataMgr;
  public stackedChartType: ChartType = 'bar';
  public stackedChartLabels!: String[];
  public stackedChartLegend: boolean = true;
  public stackedChartOptions: any;
  public barChartData!: ChartData<'bar'>;


  constructor() {
    Chart.register(...registerables);
  }

  
  ngOnInit(){
    setTimeout(() => {
    console.log('Chart '+this.chartData);
    if (this.chartData != null) {
      this.Mgr = new DataMgr(this.chartData)
      this.stackedChartLabels = this.Mgr.labels
      this.stackedChartOptions = {
        indexAxis: 'y',
        title: {
          display: true,
          text: 'Chart.js Bar Chart - Stacked'
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context: TooltipItem<'bar'>) {
                let dv = context.dataset.data[context.datasetIndex] as number[]
                let start = new Date(dv[0])
                let end = new Date(dv[1])
                return start + '-' + end;
              }
            }
          }
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
            min: this.Mgr.min,
            max: this.Mgr.max,
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10,
            },
            type: "time",
            time: {
              displayFormats: {
                millisecond: "HH:mm:ss.SSS",
                second: "yyyy-MM-dd HH:mm:ss.SSS",
                minute: "yyyy-MM-dd HH:mm:ss.SSS",
                hour: "yyyy-MM-dd HH:mm:ss.SSS",
                day: "yyyy-MM-dd HH:mm:ss.SSS",
                week: "yyyy-MM-dd HH:mm:ss.SSS",
                month: "yyyy-MM-dd HH:mm:ss.SSS",
                quarter: "yyyy-MM-dd HH:mm:ss.SSS",
                year: "yyyy-MM-dd HH:mm:ss.SSS",
              },
              unit: "minute",
            },
            adapters: {
              date: {
                locale: enUS,
              },
            },
          },
          y: {
            stacked: true,

          }
        }
      };
      this.barChartData = this.getData();
    }
  },1500);
  }

  getData() {
    var chartData: ChartData<'bar'> =
    {
      labels: this.stackedChartLabels,
      datasets: this.Mgr.getDataSets()
    }
    console.log(chartData)
    return chartData;
  }
  

  
  // events
  public chartClicked(e: any): void {
    //console.log(e);
  }

  public chartHovered(e: any): void {
    //console.log(e);
  }
}
