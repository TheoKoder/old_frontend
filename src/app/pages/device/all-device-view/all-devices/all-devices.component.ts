import { Location } from './../../../../classes/location';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ApiService } from '../../../../services/api.service';
import { SnackbarService } from '../../../../services/snackbar.service';
import { SharedService } from '../../../../services/shared.service';
import { ngxCsv } from 'ngx-csv';
import { ProgressBarComponent } from '../../../../components/progress-bar/progress-bar.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { UIService } from '../../../../components/utils/ui.service';
import { TableComponent } from '../../../../components/utils/TableComponent';
import { DeviceDetailsComponent } from '../../../../components/device/device-details/device-details.component';

@Component({
  selector: 'app-all-devices',
  templateUrl: './all-devices.component.html',
  styleUrl: './all-devices.component.scss'
})

export class AllDevicesComponent extends TableComponent implements OnInit {
  serialNumber: string = '';
  constructor(
    private mainSnackbar: SnackbarService,
    private service: ApiService,
    private _shared: SharedService,
    private mainService: UIService,
    public mainDialog: MatDialog,
    private _router: Router
  ) {
    super(service, mainDialog, mainService, mainSnackbar)
  }



  searchQuery = '';


  // totalRecords!: any;
  // TheDevices: any[] = [];
  view = false
  // currentPage: number = 1;
  // hasNextPage = true;
  // deviceData: any;
  // showSpinner = true;
  // value = 50;



  ngOnInit(): void {

    //const dialogRef: MatDialogRef<ProgressBarComponent> =
    //this.loadItems('allDevices');
  }
  override onComplete(): string {
    // Use this function to do any additional work after loaditems
    this.calculateTotalPages()
    return ""
  }
  AllDevices(){
    this.loadItems('allDevices');
  }
  performDeviceSearch() {
    this.loadItems(`/device/${this.serialNumber}`)
  }


  deviceDetails(DeviceID: any) {
    console.log(DeviceID)

    const device = this.result.find((d: any) => d.DeviceID === DeviceID);

    if (device) {
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
        dialogConfig.data = {
          name: name,
        };
        const dialogRef = this.uidialog.open(
          DeviceDetailsComponent,
          dialogConfig
        );
        dialogRef.afterClosed().subscribe((data) => {
          console.log('dialog closed', data);
        });

        //this._router.navigate(['deviceDetails']);
      });
    }

  }
  tagentry(DeviceID: any) {
    console.log(DeviceID);
    const device = this.result.find((d: any) => d.DeviceID === DeviceID);
    if (device) {
      this._shared.setDeviceDetails(device.id);
      this._router.navigate(['laptopTag']);
    }
  }



  generateCsv() {

    const data: any = []

    this.result.forEach((device: any) => {
      console.log(device);
      let pdfData = {
        name: device.name,
        client_outdated: device.client_outdated,
        client_version: device.client_version,
        description: device.description,
        id: device.id,
        // labels: device.labels[0].name,
        missing: device.missing,
        os_details: device.os_details.os,
        type: device.type,
        user: device.user.email,
        last_seen_on: device.last_seen_on
      }

      data.push(pdfData);
    });

    console.log(data);

    let options = {
      title: 'Device Details',
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseperator: '.',
      showLabels: false,
      noDownload: false,
      showTitle: false,
      useBom: false,
      headers: ['name', 'client_outdated', 'client_version', 'description', 'id', 'missing', 'os_details', 'type', 'user', 'last_seen_on']
    };
    const currentTime = new Date().toLocaleString();
    new ngxCsv(data, `devices-report-${currentTime}`, options);

  }


  





}
