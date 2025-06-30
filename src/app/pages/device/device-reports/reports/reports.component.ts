import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from '../../../../services/api.service';
import { SharedService } from '../../../../services/shared.service';
import { SnackbarService } from '../../../../services/snackbar.service';

@Component({
  selector: 'app-reports',

  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent implements OnInit {
  isLoading=false;
  LaptopReports: any[] = [];
  details: any;
  mover: any
  currentPage:number = 1;
  hasNextPage = true;
  page_size: number = 5;
  totalRecords!: any;
  totalItems: any;
  nextPageUrl: any;
  previousPageUrl: any;
  page: any;
  TheDevices: any;
  totalPages: any;
  per_page: any;
  constructor(private _service: ApiService,
    private _shared: SharedService,
    private _router: Router,
    private _snackbar: SnackbarService,
    public dialog: MatDialog) { }
  ngOnInit(): void {
    this.mover = this._shared.getDeviceDetails();
    console.log(this.mover);
    this.loadItems();
  }
  reportDetails(reportkey: any) {
    this.isLoading=true;
    this._service.getApiLaravel(`reports/${this.mover.id}/${reportkey}`).subscribe((data: any) => {
      this._shared.setReportDetails(data.data);
      console.log(data.data);
      this.isLoading=false;
      this._router.navigate(['detailed-report']);
    });
  }
  loadItems() {
    this.isLoading=true;
    this._service.getApiLaravel(`reports/${this.mover.id}`).subscribe((data: any) => {
      this.isLoading=false;
      this.details = data.data;
      this.totalItems = data.pagination.pageCount;
      this.nextPageUrl = data.pagination.nextPageUrl;
      this.previousPageUrl = data.pagination.previousPageUrl;
      this.calculateTotalPages();
      this.hasNextPage = data.length === this.page_size;
    }, error => {
      this._snackbar.openSnackbar('Server error', error);
      this.isLoading=false;
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
    this._service.getNextPage(url).subscribe((data: any) => {
      this.TheDevices = data.data;
      this.totalItems = data.pagination.pageCount;
      this.nextPageUrl = data.pagination.nextPageUrl;
      this.previousPageUrl = data.pagination.previousPageUrl;
    }, (error: any) => {
      console.log(error);
    });
  }
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.totalItems / this.per_page);
  }

}
