import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../services/api.service';
import Chart from 'chart.js/auto';
import { ChartData } from 'chart.js';
import { th } from 'date-fns/locale';
import { DatePipe } from '@angular/common';
import { readerData } from '../stacked-chart/utils';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrl: './reader.component.scss',
})
export class ReaderComponent implements OnInit {
  sqldata: readerData[]=[];
  search: any;
  label: any[] = [];
  realData: any[] = [];
  chartData: any;
  constructor(private api: ApiService, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.search = params['name'];
      this.fetchChartData();
    });
  }

  ngOnInit(): void {

  }

  fetchChartData() {
    this.api.getApiLaravel('tag-area', { search: this.search }).subscribe(data => {
      this.chartData = data.data;
      const datePipe: DatePipe = new DatePipe('en-US');
      this.sqldata = data.data.map((item:any) => ({
        last_seen: datePipe.transform(item.last_seen, 'YYYY-MM-dd HH:mm:ss'),
        Tag: item.Tag,
        Location: item.Location,
        Antenna: item.Antenna,
        Floor: item.Floor
      }));
      console.log(this.sqldata);
    });
  }
  renderChart(labelData: any, mainData: any) {
    const chartData1 = {
      labels: labelData,
      datasets: [
        {
          label: 'Location',
          data: mainData.map((value:any, index:any) => parseInt(index) + 1),
          backgroundColor: ['rgba(255, 99, 132, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)'],
          borderWidth: 1,


        },
      ],
    };
    console.log(mainData.map((value:any) => value))
    new Chart('myChart', {
      type: 'bar',
      data: chartData1,
      options: {
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              callback: function (value,index) {
                return value + ' ' + labelData[index];
              },
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              callback: function (value ,index) {
                return value + ' ' + mainData[index];
              },
            },
          },
        },
      },
    });
  }
}
