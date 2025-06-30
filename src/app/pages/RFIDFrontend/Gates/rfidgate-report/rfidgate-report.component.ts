import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-rfidgate-report',
  templateUrl: './rfidgate-report.component.html',
  styleUrl: './rfidgate-report.component.scss'
})
export class RFIDGateReportComponent {
  GateReportHeaders: any;
  GateReport: any;
  tags:any;
  page :number = 1;
  isDataAvailable: boolean = false;
  per_page:number = 5;
  search:string ='';
  totalItems: any;
  totalPages: any;
  selectedDate: Date = new Date();
  nextPageUrl: any;
  previousPageUrl: any;
  csvReport:any
  constructor(private api:ApiService, private router:Router){}
ngOnInit(): void {
 this.loadItems();
}
delete(arg0: any) {

}

downloadReport() {
  this.generateCSV();
  }
loadItems() {
  this.api.getApiLaravel('RFIDGateReport', {
    page: this.page,
    perPage: this.per_page,
    search: this.search
  }).subscribe((data: any) => {
    this.GateReport = data.data;
    this.totalItems = data.pagination.total;
    this.nextPageUrl = data.pagination.nextPageUrl;
    this.previousPageUrl = data.pagination.previousPageUrl;
    this.calculateTotalPages();
    const keys = Object.keys(this.GateReport[0]);
    this.GateReportHeaders = keys;
  }, error => {
    console.log(error)
  });
}
loadReport(){
  this.api.getApiLaravel('RFIDGateReportCsv',{
    search: this.search
  }).subscribe((data:any)=>{
    this.csvReport = data.data;
    console.log(this.csvReport)
    this.isDataAvailable = this.csvReport && this.csvReport.length > 0;
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
    this.GateReport = data.data;
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

executeSearch(searchTerm: string): void {
  this.search = searchTerm;
  this.page = 1; 
  this.loadItems();
}
DateSearch() {
  if (this.selectedDate) {
    this.page = 1;
    const year = this.selectedDate.getFullYear();
    const month = this.padZero(this.selectedDate.getMonth() + 1);
    const day = this.padZero(this.selectedDate.getDate());
    const formattedDate = `${year}-${month}-${day}`;
    this.search = formattedDate;
    this.loadItems();
    this.loadReport();
  } else {
    console.error('Invalid date input:', this.selectedDate);
  }
}

padZero(num: number): string {
  return num < 10 ? '0' + num : num.toString();
}
resetSearch(): void {
  this.search = ''; 
  this.page = 1; 
  this.loadItems(); 
}
generateCSV(): void {
  if (!this.csvReport || this.csvReport.length === 0) {
    console.error('No data available for the CSV report.');
    return;
  }
  const filteredData = this.csvReport.filter((item: any) => {
    return new Date(item.LastSeen).toDateString() === this.selectedDate.toDateString();
  });

  if (filteredData.length === 0) {
    console.error('No data available for the selected date.');
    return;
  }

  const keys = Object.keys(filteredData[0]);
  let csvContent = keys.join(',') + '\n';
  csvContent += filteredData.map((item: any) => keys.map(key => item[key]).join(',')).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `GateReport_on_${this.selectedDate.toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  window.URL.revokeObjectURL(url);
}


}
