import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { TableComponent } from '../../../components/utils/TableComponent';
import { SnackbarService } from '../../../services/snackbar.service';
import { SharedService } from '../../../services/shared.service';
import { UIService } from '../../../components/utils/ui.service';
import { MatDialog } from '@angular/material/dialog';
import { MapComponent, markerData } from '../../../components/map/map.component';

@Component({
  selector: 'app-device-daliy-report',
  templateUrl: './device-daliy-report.component.html',
  styleUrl: './device-daliy-report.component.scss'
})

export class DeviceDaliyReportComponent extends TableComponent {
  mapData: markerData = new markerData();
  isData: boolean = false;
  @ViewChild('spmap',{static: false}) spMap!: MapComponent;
  
  constructor(
    private mainSnackbar: SnackbarService,
    private service: ApiService,
    private _shared: SharedService,
    private mainService: UIService,
    public mainDialog: MatDialog
  ) {
    super(service, mainDialog, mainService, mainSnackbar)
  }

  //DeviceReport: any;
  tags: any;
  selectedDate: Date = new Date();

  csvReport: any;

  override onComplete(): string {
    this.isData = true;
    console.log(this.result);
    if (this.result.length == 0) {
      this.mainSnackbar.openSnackbar(
        'No Data Found, please contact PurpleWire Administration',
        ""
    );}
    return ""
  }

  downloadReport() {
    this.generateCSV();
  }
 
  DateSearch() {
    if (this.selectedDate) {
      this.page = 1;
      const year = this.selectedDate.getFullYear();
      const month = this.padZero(this.selectedDate.getMonth() + 1);
      const day = this.padZero(this.selectedDate.getDate());
      const formattedDate = `${year}-${month}-${day}`;
      this.search = formattedDate;
      console.log(this.search);
      this.loadItems('DeviceDailyReport', { search: this.search });
    } else {
      console.error('Invalid date input:', this.selectedDate);
    }
  }


  onLaptop() {
    this.loadLaptopList('laptopList');
  }
  onLaptopTags(){
    this.loadLaptopList('laptopListTag');
  }
  onLaptopDevice(){
    this.loadLaptopList('laptopListDeviceData');
  }
  onLaptopDeviceTags(){
    this.loadLaptopList('laptopListDeviceDataTag');
  }
  private loadLaptopList(url:string) {
    this.service.getApiLaravel(url).subscribe(
      (data: any) => {
        console.log(data)
        this.csvReport = JSON.parse(data.data);
        console.log(this.csvReport)
        this.generateCSV();
        this.mainSnackbar.openSnackbar('complete','')
      },
      (error: any) => {}
    );
  }

  generateCSV(): void {
    console.log(this.csvReport.length)
    if (!(this.csvReport && this.csvReport.length > 0)) {
      console.error('No data available for the CSV report.');
      return;
    }
    let csvContent =this.convertToCSV(this.csvReport)
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `data.csv`
    );
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
  }
  private convertToCSV(arr:any) {
    const array = [Object.keys(arr[0])].concat(arr)
  
    return array.map(it => {
      return Object.values(it).toString()
    }).join('\n')
  }

}
