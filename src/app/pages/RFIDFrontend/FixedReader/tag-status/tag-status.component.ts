import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { Router } from '@angular/router';
interface DataPoint {
  label: string;
  y: number;
}
@Component({
  selector: 'app-tag-status',
  templateUrl: './tag-status.component.html',
  styleUrl: './tag-status.component.scss'
})

export class TagStatusComponent implements OnInit{
 missingCount :any;
 inUseCount :any;
 newCount :any;
 status:any;
 statusHeader:any;
 search:any;
 per_page:number = 5;
 totalItems:any;
 totalPages: any;
  nextPageUrl: any;
  previousPageUrl: any;
  page :number = 1;
 constructor(private api:ApiService, private router:Router){}
  ngOnInit(): void {
    this.search='Missing';
    this.loadItems();
    this.load();
  }
  loadItems() {
    this.api.getApiLaravel('tagStatusCounts').subscribe((data: any) => {
      this.missingCount = data.missing_count;
      this.inUseCount = data.in_use_count;
      this.newCount = data.new_count;
      this.updateChartOptions();
    });
  }
  LastLocation(name: any) {
    console.log(name)
    this.router.navigate(['/lastlocation',name])
  }
  load() {
    this.api.getApiLaravel('missingTag', {
      search: this.search
    }).subscribe((data: any) => {
      this.status = data.data;
      console.log(this.status)
      this.totalItems = data.pagination.total;
      this.nextPageUrl = data.pagination.nextPageUrl;
      this.previousPageUrl = data.pagination.previousPageUrl;
      this.calculateTotalPages();
      const keys = Object.keys(this.status[0]);
      this.statusHeader = keys;
    }, error => {
      console.log(error)
    });
  }
  downloadReport() {
    const csvData = this.convertToCSV(this.status, this.statusHeader);
    const blob = new Blob([csvData], { type: 'text/csv' });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Missing.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
  private convertToCSV(data: any[], headers: string[]): string {
    const csvHeader = headers.join(',') + '\n';
    const csvData = data.map(item => {
      return headers.map(key => item[key]).join(',');
    }).join('\n');

    return csvHeader + csvData;
  }
  nextPage() {
    if (this.nextPageUrl) {
      this.loadItemsFromUrl(this.nextPageUrl);
      this.page++;
    }
  }

  previousPage() {
    if (this.previousPageUrl) {
      this.loadItemsFromUrl(this.previousPageUrl);
      this.page--;
    }
  }

  private loadItemsFromUrl(url: string) {
    this.api.getNextPage(url).subscribe((data: any) => {
      this.status = data.data;
      this.totalItems = data.pagination.total;
      this.nextPageUrl = data.pagination.nextPageUrl;
      this.previousPageUrl = data.pagination.previousPageUrl;
    }, (error: any) => {
      console.log(error);
    });
  }
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.totalItems / this.per_page);
  }

  updateChartOptions() {
    this.columnChartOptions.data[0].dataPoints = [
      { label: 'Missing', y: this.missingCount },
      { label: 'In Use', y: this.inUseCount },
      { label: 'New', y: this.newCount },
    ];
    this.pieChartOptions.data[0].dataPoints = [
      { label: 'Missing', y: this.missingCount },
      { label: 'In Use', y: this.inUseCount },
      { label: 'New', y: this.newCount },
    ];
    this.lineChartOptions.data[0].dataPoints = [
      { label: 'Missing', y: this.missingCount },
      { label: 'In Use', y: this.inUseCount },
      { label: 'New', y: this.newCount },
    ];
  }

  columnChartOptions = {
    animationEnabled: true,
    title: {
      text: 'Tag Statistics',
    },
    data: [
      {
        type: 'column',
        dataPoints: [] as DataPoint[],
      },
    ],
  };

  pieChartOptions = {
    animationEnabled: true,
    title: {
      text: 'Tag Statistics',
    },
    theme: 'light2',
    data: [
      {
        type: 'pie',
        dataPoints: [] as DataPoint[],
      },
    ],
  };

  lineChartOptions = {
    animationEnabled: true,
    title: {
      text: 'Tag Statistics',
    },
    theme: 'light2',
    data: [
      {
        type: 'line',
        dataPoints: [] as DataPoint[],
      },
    ],
  };
}
