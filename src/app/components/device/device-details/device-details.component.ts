import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { SharedService } from '../../../services/shared.service';
import { DeviceHardwareComponent } from '../../../pages/device/device-details/device-hardware/device-hardware.component';
import { SnackbarService } from '../../../services/snackbar.service';
import { AlarmComponent } from '../actions/alarm/alarm.component';
import { LockComponent } from '../actions/lock/lock.component';
import { AlertComponent } from '../actions/alert/alert.component';
import { ActionsComponent } from '../actions/actions/actions.component';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-all-device-details',
  // standalone: true,
  // imports: [],
  templateUrl: './device-details.component.html',
  styleUrl: './device-details.component.scss'
})
export class DeviceDetailsComponent implements OnInit {
  deviceInfos!: any[];
  isLoading = false;
  details: any;
  locations: any[] = [];
  locationData: any;
  

  constructor(private _service: ApiService,
    private _shared: SharedService,
    private _router: Router,
    public dialog: MatDialog, private snackbar: SnackbarService) { }

  ngOnInit(): void {
    this.details = this._shared.getDeviceDetails();
    console.log(this.details);
  }

  lock(id: any) {
    console.log(id)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      id: id
    }
    dialogConfig.autoFocus = false;
    const dialogRef = this.dialog.open(LockComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      console.log("dialog closed", data);
    })

  }

  alert(id: any) {
    console.log(id)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      id: id
    }
    dialogConfig.autoFocus = false;
    const dialogRef = this.dialog.open(AlertComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      console.log("dialog closed", data);
    })

  }

  alarm(id: any) {
    console.log(id)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      id: id
    }
    dialogConfig.autoFocus = false;
    const dialogRef = this.dialog.open(AlarmComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      console.log("dialog closed", data);
    })

  }

  missing(id: any) {
    let username = localStorage.getItem('user')
    this.isLoading = true;


    let body = {
      missing: true,
      options: {
        report_frequency: "2"
      }
    }
    this._service.putApiKot(`device/${username}/${id}/missing`, body).subscribe({
      next: data => {
        this.snackbar.openSnackbar('Missing Activated ', data)
        console.log(data)
        this.isLoading = false;
      },
      error: err => {
          this.snackbar.openSnackbar(
              'Not Activated',
              err
          );
          console.log(err.error.message)
      }
  })
    
    // if (this.details.missing == false) {
    //   let body = {
    //     missing: true,
    //     options: {
    //       report_frequency: "2"
    //     }
    //   }
    //   this._service.putApiKot(`admin/device/${id}/missing`, body).subscribe(data => {
    //     console.log(data);
    //     this.snackbar.openSnackbar('Missing Activated ', data)
    //     this.isLoading = false;
    //   })

    // } else if (this.details.missing == true) {
    //   let body = {
    //     missing: false
    //   }
    //   console.log(body)
    //   this._service.putApiKot(`device/${username}/${id}/missing`, body).subscribe(data => {
    //     this.snackbar.openSnackbar('Missing Deactivated ', data)
    //     console.log(data)
    //     this.isLoading = false;
    //   });
    // }
  }

  hardware() {
    this.isLoading = true;
    // console.log(this.details.device_details.hardware);
    this._shared.setDeviceHardware(this.details.device_details.hardware)
    // this._router.navigate(['device-hardware']);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = false;

    const dialogRef = this.dialog.open(DeviceHardwareComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      console.log("dialog closed", data);
    })
    this.isLoading = false;
  }
  reports() {
    this._router.navigate(['report']);
  }
  location(id: any) {
    console.log(id)
    this.isLoading = true;
    this._service.getApiKot(`deviceLocation/${id}`).subscribe((data: any) => {
      this.locations = data;
      this._shared.setlastLocation(data)
      this._router.navigate(['last-location'])
      this.isLoading = false;
      this.dialog.closeAll();
    });
  }
}
