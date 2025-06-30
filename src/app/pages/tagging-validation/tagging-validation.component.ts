import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-tagging-validation',
  templateUrl: './tagging-validation.component.html',
  styleUrl: './tagging-validation.component.scss'
})
export class TaggingValidationComponent {
  isLoading = false;
  SERIAL_NUMBER: string = '';
  LaptopsHeaders: any;
  Laptops: any;
  page: number = 1;
  per_page: number = 5;
  searchValue: string = '';
  totalItems: any;
  totalPages: any;
  nextPageUrl: any;
  isDataAvailable: boolean = false;
  previousPageUrl: any;
  csvReport: any;
  constructor(
    private _shared: SharedService,
    private _router: Router,
    private api: ApiService
  ) {}
  performSearch() {
    // this.resetSearch()
    this.loadItems();
  }

  loadItems() {
    this.isLoading = true;
    this.api
      .getApiLaravel('taggingValidation', {
        SERIAL_NUMBER: this.SERIAL_NUMBER,
      })
      .subscribe(
        (data: any) => {
          console.log('API Response:', data);
          this.Laptops = data.data;
          this.totalPages = data.pagination.pageCount;
          this.nextPageUrl = data.pagination.nextPageUrl;
          this.previousPageUrl = data.pagination.previousPageUrl;

          if (this.Laptops.length > 0) {
            const keys = Object.keys(this.Laptops[0]);
            this.LaptopsHeaders = keys;
          } else {
            this.LaptopsHeaders = [];
          }
          console.log(this.Laptops);
          this.isLoading = false;
        },
        (error) => {
          console.log(error);
          this.isLoading = false;
        }
      );
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
    this.api.getNextPage(url).subscribe(
      (data: any) => {
        this.Laptops = data.data;
        this.totalItems = data.pagination.total;
        this.nextPageUrl = data.pagination.nextPageUrl;
        this.previousPageUrl = data.pagination.previousPageUrl;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }


  resetSearch() {
    this.Laptops=[]
    }
}
