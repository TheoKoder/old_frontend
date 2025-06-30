import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { SharedService } from '../../../services/shared.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../components/device/confirmation-dialog/confirmation-dialog.component';
import { TableComponent } from '../../../components/utils/TableComponent';
import { UIService } from '../../../components/utils/ui.service';
import { MesgDialogComponent } from '../../../components/dialogs/mesg-dialog/mesg-dialog.component';
import { AssetData, VerificationDialogComponent } from '../../../components/dialogs/verification-dialog/verification-dialog.component';
import { AddTagComponent } from '../../../components/dialogs/add-tag/add-tag.component';
import { DeviceDetailsComponent } from '../../../components/device/device-details/device-details.component';

@Component({
  selector: 'app-laptoplist',
  templateUrl: './laptoplist.component.html',
  styleUrl: './laptoplist.component.scss',
})
export class LaptoplistComponent extends TableComponent {
  searchName: string = '';
  searchSurname: string = '';
  searchPestal: string = '';


  searchValue: string = '';
  serialNumber: string = '';
  selectedDate: Date = new Date();
  csvReport: any;
  searchBlock: string = ''

  constructor(
    private mainSnackbar: SnackbarService,
    private service: ApiService,
    private _shared: SharedService,
    private mainService: UIService,
    private uiDialog: MatDialog,
    private verificationDialog: MatDialog,
    private dialog: MatDialog
  ) {
    super(service, uiDialog, mainService, mainSnackbar);
  }
  override onComplete(): string {
    return "";
  }
  performOwnerSearch() {
    this.searchBlock = "Owner"
    this.loadItems('laptopData', {
      searchName: this.searchName,
      searchSurname: this.searchSurname,
      searchPestal: this.searchPestal,
    })
  }

  performLaptopSearch() {
    this.searchBlock = "Laptop"
    this.loadItems('laptopData', {
      serialNumber: this.serialNumber,
    })
  }

  reload() {
    switch (this.searchBlock) {
      case "Laptop":
        this.performLaptopSearch()
        break;
      case "Owner":
        this.performOwnerSearch()
        break;
    }
  }

  sendMessage(device_id: any) {
    const body = {
      command: 'start',
      action_name: 'alert',
      options: {
        close_apps: 'true',
        alert_message: 'Tracking Software Activated: Click Close and Have a Good Day'
      }
    }
    this.service.putApiKot(`device/${device_id}/message`, body).subscribe({
      next: (data: any) => {
        this.mainSnackbar.openSnackbar('Message has been sent', data)
      }
    })
  }
  verifyTracking(SERIAL_NUMBER: string) {
    console.log("in verifying");
    const info: AssetData = new AssetData()
    info.laptopID = 0;
    info.serial_no = SERIAL_NUMBER;
    const dialogRef = this.verificationDialog.open(VerificationDialogComponent, {
      width: '500px',
      height: '500px',
      disableClose: true,
      data: info
    });
  }

  check(active: number, tag: string): boolean {
    //console.log(" active " + active)
    //console.log(" tag #" + tag + "#")
    if (active == 0) {
      return true;
    } else {
      if (tag != null) {
        return true;
      } else {
        return false;
      }
    }
  }
  checkTag(active: number, tag: string): boolean {
    //console.log(" tag " + tag)
    if (active == 0) {
      return true;
    } else {
      if (tag == "" || tag == null) {
        return false;
      } else {
        return true;
      }
    }
  }

  checkTracking(active: number, tag: string): boolean {
    //console.log(" active " + active)
    if (active == 0) {
      return true;
    } else {
      if (tag == null) {
        return true;
      } else {
        return false;
      }
    }
  }
  addTag(id: number) {
    console.log("adding tag to " + id)
    const info: AssetData = new AssetData()
    info.laptopID = id;
    info.serial_no = "";
    const addTagDialogRef = this.dialog.open(AddTagComponent, {
      width: '500px',
      height: '400px',
      disableClose: true,
      data: info
    });
    addTagDialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result == "Success") {
        this.reload();
      }
    });
  }
  deactivate(id: any) {
    console.log("deactivate " + id)
    const dialogRef = this.uidialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.postLaravel(`laptop/set-not-active/${id}`, {}).subscribe(
          (data: any) => {
            this.mainSnackbar.openSnackbar('Status has been changed and logged under your name', 'Changed')
            //window.location.reload();
            this.reload()
          },
          (error: any) => {
            // this.handleError(error);
            console.log(error)
          }
        );
        console.log("confirm yes")
      } else {
        this.mainSnackbar.openSnackbar('No Changes have been made', 'Changed')
      }
    });
  }



  tagentry(DeviceID: any) {
    console.log(DeviceID);

    const device = this.result.find((d: any) => d.DeviceID === DeviceID);
    if (device) {
      this._shared.setDeviceDetails(device.id);
      //this._router.navigate(['laptopTag']);
    }
  }
  deviceDetails(serial_no: any) {
    console.log("deviceDetails")
    console.log(serial_no)
    console.log("device details ------------------------------------")


    this.service.getApiLaravel(`/device/${serial_no}`).subscribe((data: any) => {
      console.log(data)
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
      console.log(data.data)
      let devices = data.data
      console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
      if (devices.length > 0) {
        console.log(devices.length)
        console.log(devices[0])
        console.log(devices[0].DeviceID)
        let DeviceID = devices[0].DeviceID
        this.service.getApiKot(`/Device/${DeviceID}`).subscribe((data: any) => {
          const mapData = {
            id: data.id,
            lat: data.location.lat,
            lng: data.location.lng
          };
          this._shared.setMapData(mapData);
          this._shared.setDeviceDetails(data);
          console.log(data)
          const dialogConfig = new MatDialogConfig();
          dialogConfig.autoFocus = false;
          dialogConfig.height = '500px';
          dialogConfig.width = '200px';
          const dialogRef = this.uidialog.open(
            DeviceDetailsComponent,
            dialogConfig
          );
          dialogRef.afterClosed().subscribe((data) => {
            console.log('dialog closed', data);
          });

        })
      }
    })

    // this.service.getApiKot(`/Device/${DeviceID}`).subscribe((data: any) => {
    //   const mapData = {
    //     id: data.id,
    //     lat: data.location.lat,
    //     lng: data.location.lng
    //   };



    //   //this._router.navigate(['deviceDetails']);
    // });
  }

}
