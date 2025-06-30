import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../../services/api.service';
import { th } from 'date-fns/locale';

@Component({
  selector: 'app-rfidgate-current',
  templateUrl: './rfidgate-current.component.html',
  styleUrl: './rfidgate-current.component.scss'
})
export class RFIDGateCurrentComponent {
  GateHeaders: any;
  Gate: any;
  tags:any;
  page :number = 1;
  per_page:number = 5;
  search:string ='';
  totalItems: any;
  totalPages: any;
  nextPageUrl: any;
  previousPageUrl: any;
  GateReport: any;
  GateHeadersReport:any;
  constructor(private api:ApiService, private router:Router){}
ngOnInit(): void {
 this.loadItems();
 this.loadReport();
}
delete(arg0: any) {

}
loadReport(){
  this.api.getApiLaravel('RFIDGateCsv', {
    search: this.search
  }).subscribe((data: any) => {
    this.GateReport = data.data;
    console.log(this.Gate)
    this.calculateTotalPages();
    const keys = Object.keys(this.GateReport[0]);
    this.GateHeadersReport = keys;
  }, error => {
    console.log(error)
  });
}

downloadReport() {
  const csvData = this.convertToCSV(this.GateReport, this.GateHeadersReport);
  const blob = new Blob([csvData], { type: 'text/csv' });

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'RFIDGateReport.csv';
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
loadItems() {
  this.api.getApiLaravel('RFIDGate', {
    search: this.search
  }).subscribe((data: any) => {
    this.Gate = data.data;
    console.log(this.Gate)
    this.totalItems = data.pagination.total;
    this.nextPageUrl = data.pagination.nextPageUrl;
    this.previousPageUrl = data.pagination.previousPageUrl;
    this.calculateTotalPages();
    const keys = Object.keys(this.Gate[0]);
    this.GateHeaders = keys;
  }, error => {
    console.log(error)
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
    this.Gate = data.data;
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
resetSearch(searchInput: HTMLInputElement): void {
  searchInput.value = '';
  this.search = ''; 
  this.page = 1; 
  this.loadItems(); 
}

}
