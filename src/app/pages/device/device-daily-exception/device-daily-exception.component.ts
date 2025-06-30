import { Component, ViewChild } from '@angular/core';
import { TableComponent } from '../../../components/utils/TableComponent';
import { SnackbarService } from '../../../services/snackbar.service';
import { ApiService } from '../../../services/api.service';
import { SharedService } from '../../../services/shared.service';
import { UIService } from '../../../components/utils/ui.service';
import { MatDialog } from '@angular/material/dialog';
import { MapComponent, markerData } from '../../../components/map/map.component';

@Component({
  selector: 'app-device-daily-exception',
  templateUrl: './device-daily-exception.component.html',
  styleUrl: './device-daily-exception.component.scss'
})
export class DeviceDailyExceptionComponent extends TableComponent {
  mapData: markerData = new markerData();
  isMap: boolean = false;
  selectedDate: Date = new Date();
  @ViewChild('spmap', { static: false }) spMap!: MapComponent;

  notFoundDevices: any[] = [];

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
    console.log(this.result);
    if (this.result.length == 0) {
      this.mainSnackbar.openSnackbar(
        'No Data Found, please contact PurpleWire Administration',
        ""
    );
    } else {
      let data = Object.values(this.result);
      data.map((it: any) => {
        console.log(it["longitude"], it["latitude"]);
        if (it["longitude"] != null && it["latitude"] != null) {
          this.spMap.addMarker(it["longitude"], it["latitude"], it["serial_number"]);
        } else {
          it["Last_Location"] = ""
          if (this.notFoundDevices.length == 0) {
            const keys = Object.keys(it);
            this.Headers = keys;
          }
          this.notFoundDevices.push(it)
        }
      })
    }
    this.nextPage()
    return ""
  }

  downloadReport() {
    this.genCSV(this.notFoundDevices, "DevicesMissingLocstion")
  }

  locationAnalysis() {
    this.notFoundDevices.map((it: any) => {
      let id = it["deviceid"]
      this.service.getApiKot(`deviceLocation/${id}`).subscribe((data: any) => {
        if (data.length == 0) {
          it["Last_Location"] = "Not Seen"
        } else {
          let res = "["
          data.forEach((location: any) => {
            res += "Lat: " + location["lat"] + " Lng: " + location["lng"] + ","
          });
          res += "]"
          it["Last_Location"] = res
        }
        
      })
    })
  }

  DateSearch() {
    if (this.selectedDate) {
      this.isMap = true;
      //this.spMap.create();
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
}
