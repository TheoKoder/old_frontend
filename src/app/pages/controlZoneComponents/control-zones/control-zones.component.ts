import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../services/shared.service';
import { Zones } from '../../../classes/zones';
import { SnackbarService } from '../../../services/snackbar.service';
import { ApiService } from '../../../services/api.service';
import { UIService } from '../../../components/utils/ui.service';
import { MatDialog } from '@angular/material/dialog';
import { CZData, CZDetailDialogComponent } from '../../../components/dialogs/czdetail-dialog/czdetail-dialog.component';
import { radiusData } from '../../../components/map/map.component';
import { TableComponent } from '../../../components/utils/TableComponent';

@Component({
  selector: 'app-control-zones',
  templateUrl: './control-zones.component.html',
  styleUrl: './control-zones.component.scss'
})

export class ControlZonesComponent extends TableComponent implements OnInit {
  
  constructor(
    private mainSnackbar: SnackbarService,
    private service: ApiService,
    private _shared: SharedService,
    private mainService: UIService,
    public mainDialog: MatDialog
  ) {
    super(service, mainDialog, mainService, mainSnackbar)
  }

  readonly czDetailsDialog = inject(MatDialog);

  ngOnInit(): void {
    this.loadItems('ControlZone');
  }
  override onComplete(): string {
    // Use this function to do any additional work after loaditems
    return ""
  }
  // createZone() {
  //   this._shared.setZoneDetails([this.zones])
  //   this._router.navigate(['create-zone']);
  // }
  zoneDetails(control_zone_id: any, lat: any, lng: any, name: any, radius: any, color: any) {

    this.service.getApiLaravel(`control-zone/${control_zone_id}`).subscribe((data: any) => {
      console.log(data)
      const validLat = parseFloat(lat);
      const validLng = parseFloat(lng);

      if (isNaN(validLat) || isNaN(validLng)) {
        console.error('Invalid latitude or longitude values:', validLat, validLng);
        return;
      }


      let rd: radiusData = new radiusData();
      rd.id = control_zone_id.toString();
      rd.latitude = validLat;
      rd.longitude = validLng;
      rd.color = color;
      rd.radius = radius;

      let czData: CZData = {
        mapData: rd
      }

      let mapData = {
        id: control_zone_id.toString(),
        lat: validLat,
        lng: validLng,
        name: name,
        radius: radius,
        color: color,
        type: "radius"
      };
      console.log("not in dialog" + mapData);
      this._shared.setMapData(mapData)
      this._shared.setZoneDetails([data.zones[0]]);


      this.czDetailsDialog.open(CZDetailDialogComponent, {
        data: czData,
        width: '1000px',
        height: '800px',
        maxHeight: '90vh'
      });

      //this._router.navigate(['control-zone-details'])
    })
  }
}
