import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Automations } from '../../../classes/automations';
import { SharedService } from '../../../services/shared.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { ApiService } from '../../../services/api.service';
import { AutomationsDetailsComponent } from '../automations-details/automations-details.component';
import { UIService } from '../../../components/utils/ui.service';
import { TableComponent } from '../../../components/utils/TableComponent';

@Component({
  selector: 'app-automations',
  templateUrl: './automations.component.html',
  styleUrl: './automations.component.scss'
})
export class AutomationsComponent extends TableComponent implements OnInit {
  constructor(
    private mainSnackbar: SnackbarService,
    private service: ApiService,
    private _shared: SharedService,
    private mainService: UIService,
    public mainDialog: MatDialog
  ) { 
    super(service,mainDialog,mainService,mainSnackbar)
  }
  ngOnInit(): void {
    this.loadItems('Automation');
  }
  override onComplete(): string {
    // Use this function to do any additional work after loaditems
    return ""
  }
  /*
  loadItems() {
    this.isLoading = true;
    this.uiservice.openDialog(this.dialog);
    this.service.getApiLaravel('Automation').subscribe(
      (data: any) => {
        this.automations = data.data;
        this.totalItems = data.pagination.total;
        this.nextPageUrl = data.pagination.nextPageUrl;
        this.previousPageUrl = data.pagination.previousPageUrl;
        this.totalPages = data.pagination.pageCount;
        this.calculateTotalPages();
        console.log(data);
        this.hasNextPage = data.length === this.page_size;
        this.isLoading = false
        this.uiservice.closeDialog(this.dialog);
      },
      (error) => {
        this._snackbar.openSnackbar(
          'Error loading server, please try again later',
          error
        );
        this.isLoading = false;
        this.uiservice.closeDialog(this.dialog);
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
    this.isLoading = true
    this.uiservice.openDialog(this.dialog);
    this.service.getNextPage(url).subscribe(
      (data: any) => {
        this.automations = data.data;
        this.totalItems = data.pagination.total;
        this.nextPageUrl = data.pagination.nextPageUrl;
        this.previousPageUrl = data.pagination.previousPageUrl;
        this.isLoading = false
        this.uiservice.closeDialog(this.dialog);
      },
      (error: any) => {
        console.log(error);
        this.isLoading = false
        this.uiservice.closeDialog(this.dialog);
      }
    );
  }
  calculateTotalPages() {
    console.log(this.totalItems + "/" + this.page_size)
    if (this.totalItems < this.page_size) {
      this.totalPages = 1;
    } else {
      this.totalPages = Math.ceil(this.totalItems / this.page_size);
    }
    console.log(this.totalPages)
  }
  */
  automationDetails(id: string) {
    this.service.getApiLaravel(`automation/${id}`).subscribe((data: any) => {
      this._shared.setAutomationDetails(data);
      // this._router.navigate(['automations-details'])
      // console.log(name)
      // console.log(Auto)
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = false;
      dialogConfig.data = {
        name: name,
      };
      const dialogRef = this.uidialog.open(
        AutomationsDetailsComponent,
        dialogConfig
      );
      dialogRef.afterClosed().subscribe((data) => {
        console.log('dialog closed', data);
      });

    })
  }
}
