import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { SharedService } from '../../../services/shared.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { TableComponent } from '../../../components/utils/TableComponent';
import { UIService } from '../../../components/utils/ui.service';
import { ReportsDetailsComponent } from '../../../components/device/reports-details/reports-details.component';

@Component({
  selector: 'app-database-reports',
  templateUrl: './database-reports.component.html',
  styleUrl: './database-reports.component.scss'
})
export class DatabaseReportsComponent extends TableComponent implements OnInit {
  
  currentPage: number = 1;
  hasNextPage = true;
  AllReports: any;
  itemCount: any;


  constructor(
    private mainSnackbar: SnackbarService,
    private service: ApiService,
    private _shared: SharedService,
    private mainService: UIService,
    public mainDialog: MatDialog
  ) {
    super(service, mainDialog, mainService, mainSnackbar)
  }

  override onComplete(): string {
    return "";
  }
  
  ngOnInit(): void {
    this.loadItems(`reports`);
  }
  
 

  reportDetails(device_id: any, reportkey: any) {
    this.isLoading = true;
    this.service.getApiLaravel(`reports/${device_id}/${reportkey}`).subscribe((data: any) => {
      this._shared.setReportDetails(data.data);
      console.log(data.data);
      this.isLoading = false;
      //this._router.navigate(['detailed-report']);
    });


    this.service.getApiLaravel(`reports/${device_id}/${reportkey}`).subscribe((data: any) => {
      this._shared.setReportDetails(data.data);
      const dialogRef = this.uidialog.open(
        ReportsDetailsComponent,
        {
          height: '800px',
          width: '1000px',
        }
      );
      dialogRef.afterClosed().subscribe((data) => {
        console.log('dialog closed', data);
      });

    })
  }
}
