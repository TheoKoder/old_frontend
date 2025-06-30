import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-tags',
  templateUrl: './all-tags.component.html',
  styleUrl: './all-tags.component.scss'
})
export class AllTagsComponent implements OnInit {
  allTags:any;
  page :number = 1;
  totalPages: any;
  totalItems: any;
  nextPageUrl: any;
  previousPageUrl: any;
  per_page:number = 5;
  constructor(private api:ApiService ,private router:Router){}
  ngOnInit(): void {
    this.loadItem()
  }
  loadItem(){
    this.api.getApiLaravel('all-tags').subscribe((data:any)=>{
      this.allTags = data.data;
      console.log(data);
      this.totalItems = data.pagination.total;
    this.nextPageUrl = data.pagination.nextPageUrl;
    this.previousPageUrl = data.pagination.previousPageUrl;
    this.calculateTotalPages();
    });
  }
  update(name:any){
    this.router.navigate(['/update-tag', name]);
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
      this.allTags = data.data;
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
}
