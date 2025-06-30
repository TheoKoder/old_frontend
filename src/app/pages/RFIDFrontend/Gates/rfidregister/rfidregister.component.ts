import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-rfidregister',
  templateUrl: './rfidregister.component.html',
  styleUrl: './rfidregister.component.scss'
})
export class RFIDRegisterComponent {
  RegisterHeaders: any;
  Register: any;
  tags:any;
  page :number = 1;
  per_page:number = 5;
  search:string ='';
  totalItems: any;
  totalPages: any;
  nextPageUrl: any;
  previousPageUrl: any;
  constructor(private api:ApiService, private router:Router){}
ngOnInit(): void {
 this.loadItems();
}

downloadReport() {
  
}


loadItems() {
  this.api.getApiLaravel('RFIDRegister', {
    search: this.search
  }).subscribe((data: any) => {
    this.Register = data.data;
    console.log(data.data);
    this.totalItems = data.pagination.total;
    this.nextPageUrl = data.pagination.nextPageUrl;
    this.previousPageUrl = data.pagination.previousPageUrl;
    this.calculateTotalPages();
    const keys = Object.keys(this.Register[0]);
    this.RegisterHeaders = keys;
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
    this.Register = data.data;
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
