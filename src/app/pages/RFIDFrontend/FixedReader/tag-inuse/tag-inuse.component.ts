import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../../services/api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tag-inuse',
  templateUrl: './tag-inuse.component.html',
  styleUrl: './tag-inuse.component.scss'
})
export class TagInuseComponent implements OnInit {
  tagNewHeaders: any;
  tagNewReport: any;
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



loadItems() {
  this.api.getApiLaravel('InuseTag', {search: this.search}).subscribe((data: any) => {
    this.tagNewReport = data.data;
    this.totalItems = data.pagination.total;
    this.nextPageUrl = data.pagination.nextPageUrl;
    this.previousPageUrl = data.pagination.previousPageUrl;
    this.calculateTotalPages();
    const keys = Object.keys(this.tagNewReport[0]);
    this.tagNewHeaders = keys;
    this.isDataAvailable = this.tagNewReport && this.tagNewReport.length > 0;
    console.log(this.tagNewReport);
  }, error => {
    console.log(error)
  });
}
loadReport(){
  this.api.getApiLaravel('newTag',{
    search: this.search
  }).subscribe((data:any)=>{
    this.csvReport = data.data;
    this.isDataAvailable = this.csvReport && this.csvReport.length > 0;
  });
}

nextPage() {
  if (this.nextPageUrl) {
    this.loadItemsFromUrl(this.nextPageUrl);
    this.page++;
  } else {
    console.error('Next page URL not available.');
  }
}

previousPage() {
  if (this.previousPageUrl) {
    this.loadItemsFromUrl(this.previousPageUrl);
    this.page--;
  } else {
    console.error('Previous page URL not available.');
  }
}

private loadItemsFromUrl(url: string) {
  this.api.getNextPage(url).subscribe((data: any) => {
    this.tagNewReport = data.data;
    this.totalItems = data.pagination.total;
    this.nextPageUrl = data.pagination.nextPageUrl;
    this.previousPageUrl = data.pagination.previousPageUrl;
  }, (error: any) => {
    console.error('Error loading items from URL:', error);

  });
}
calculateTotalPages() {
  this.totalPages = Math.ceil(this.totalItems / this.per_page);
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
tag(name: any) {
console.log(name)
this.router.navigate(['/tag_area',name])



}

padZero(num: number): string {
  return num < 10 ? '0' + num : num.toString();
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
downloadReport() {
  const csvData = this.convertToCSV(this.tagNewReport, this.tagNewHeaders);
  const blob = new Blob([csvData], { type: 'text/csv' });

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Tag_IN-USE.csv`;
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
