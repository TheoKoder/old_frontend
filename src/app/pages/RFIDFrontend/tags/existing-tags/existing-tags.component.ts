import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-existing-tags',
  templateUrl: './existing-tags.component.html',
  styleUrl: './existing-tags.component.scss'
})
export class ExistingTagsComponent implements OnInit{
existingHeaders: any;
existing: any;
tags:any;
page :number = 1;
per_page:number = 5;
search:string ='';
totalItems: any;
totalPages: any;
floors: number[] = [0,1, 2, 3, 4, 5, 6, 7, 8,9];
selectedFloor: number =0;
nextPageUrl: any;
isDataAvailable: boolean = false;
previousPageUrl: any;
constructor(private api:ApiService, private router:Router){}
ngOnInit(): void {
 this.loadItems();
}
delete(arg0: any) {

}


loadItems() {
  this.api.getApiLaravel('existing-tags', {
    search: this.search
  }).subscribe((data: any) => {
    this.existing = data.data;
    console.log(this.existing)
    this.totalItems = data.pagination.total;
    this.nextPageUrl = data.pagination.nextPageUrl;
    this.previousPageUrl = data.pagination.previousPageUrl;
    this.calculateTotalPages();
    const keys = Object.keys(this.existing[0]);
    this.existingHeaders = keys;
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
    this.existing = data.data;
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
fetchTagsForFloor(floor: number){
  this.api.getApiLaravel(`tags/${floor}`).subscribe((data: any) => {
    this.tags = data;
    this.isDataAvailable = this.tags && this.tags.length > 0;
    console.log(this.tags)
  });
}
generateCSV(): void {
  if (!this.tags || this.tags.length === 0) {
    console.error('No tags data available.');
    return;
  }
  const keys = Object.keys(this.tags[0]);
  let csvContent = keys.join(',') + '\n';
  csvContent += this.tags.map((tag:any) => keys.map(key => tag[key]).join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `tags_floor_${this.selectedFloor}.csv`);
  document.body.appendChild(link);
  link.click();
  window.URL.revokeObjectURL(url);
}

  onFloorSelect(event: any) {
    const floor = event.target.value;
    this.selectedFloor = parseInt(floor, 10); 
    this.fetchTagsForFloor(this.selectedFloor);
  }
  downloadReport() {
    this.fetchTagsForFloor(this.selectedFloor);
    this.generateCSV();
  }
  

}
