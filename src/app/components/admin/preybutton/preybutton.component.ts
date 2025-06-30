import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-preybutton',
  templateUrl: './preybutton.component.html',
  styleUrl: './preybutton.component.scss'
})
export class PreybuttonComponent {
  page: number = 1;
page_size: number = 20;
isDataAvailable: boolean = true;

constructor(private api: ApiService, private snackbar: SnackbarService) {}

triggerPreyWebService() {
  this.page = 1; 
  this.isDataAvailable = true;

  this.fetchData();
}

private fetchData() {
  if (!this.isDataAvailable) return;

  this.api.getApiKotBE('all', { page: this.page, page_size: this.page_size }).subscribe(
    (data: any) => {
      if (data && data.length > 0) {
        this.snackbar.openSnackbar('Successfully updated page ' + this.page, 'Update');
        this.page++;
        this.fetchData(); 
      } else {
        this.isDataAvailable = false; 
        this.snackbar.openSnackbar('No more data to update', 'Complete');
      }
    },
    (error: any) => {
      this.snackbar.openSnackbar('Failed to update', error);
      this.isDataAvailable = false; 
    }
  );
}

}
