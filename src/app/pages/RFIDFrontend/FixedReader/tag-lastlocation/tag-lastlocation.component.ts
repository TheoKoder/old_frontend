import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { ActivatedRoute } from '@angular/router';

interface LocationEntry {
  last_seen: string;
  Tag: string;
  Location: string;
  Antenna: string;
  Floor: string;
}
@Component({
  selector: 'app-tag-lastlocation',
  templateUrl: './tag-lastlocation.component.html',
  styleUrl: './tag-lastlocation.component.scss'
})
export class TagLastlocationComponent implements OnInit{
  search:any;
  LocationData:any;
  LocationHeader:any;
  page :number = 1;
  per_page:number = 5;
  totalItems: any;
  totalPages: any;
  nextPageUrl: any;
  previousPageUrl: any;
  constructor(private api: ApiService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe((params:any) => {
      this.search = params['name'];
      this.fetchChartData();
    });
  }
  fetchChartData() {
    this.api.getApiLaravel('tag-area', { search: this.search }).subscribe(data => {
      this.LocationData = data.data;
      this.totalItems = data.pagination.total;
      this.nextPageUrl = data.pagination.nextPageUrl;
      this.previousPageUrl = data.pagination.previousPageUrl;
      this.LocationData.sort((a: LocationEntry, b: LocationEntry) => {
        const timeA = new Date(a.last_seen).getTime();
        const timeB = new Date(b.last_seen).getTime();
        return timeB - timeA;
      });
      this.calculateTotalPages();
      const keys = Object.keys(this.LocationData[0]);
      this.LocationHeader = keys;
      console.log(this.LocationData);

    });
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
      this.LocationData = data.data;
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

    downloadReport() {
      const csvData = this.convertToCSV(this.LocationData, this.LocationHeader);
      const blob = new Blob([csvData], { type: 'text/csv' });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Tag_Recent_Locations_${this.search}.csv`;
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

}
