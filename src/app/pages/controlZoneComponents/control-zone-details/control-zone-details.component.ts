import { Component, OnInit } from '@angular/core';
import { Actions } from '../../../classes/actions';
import { ZoneDevices } from '../../../classes/zone-devices';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-control-zone-details',
  templateUrl: './control-zone-details.component.html',
  styleUrl: './control-zone-details.component.scss'
})

export class ControlZoneDetailsComponent implements OnInit {
  id:any;
  details!: any;
  devices: ZoneDevices[] = [];
  actions: Actions[] = [];
  totalRecords!: any;
  page: number = 1;
  viewsView: [number, number] = [250, 250];
  radius!: any
  cardColor: string = '#0000ff';
  totalActions!: any;
  totalDevices!: any;
  constructor(private _shared: SharedService) { }
  ngOnInit(): void {
    this.details = this._shared.getMapData();
    const zonesDetails = this._shared.getZonesDetails();
  // this.details = zonesDetails.length > 0 ? zonesDetails[0] : {}; 
  this.id = this.details.control_zone_id;
  this.radiusCard(zonesDetails);
  this.zoneDevices(zonesDetails);
  this.zoneActions(zonesDetails);

  console.log('zone details', this.details);
  console.log(this.id);
  }
  zoneDevices(data: any) {
    if (data[0].devices) {
      this.devices = data[0].devices;
      this.totalDevices = this.devices.length;
      console.log('devices', this.devices);
    }

  }

  zoneActions(data: any) {
    if (data[0].actions) {
      this.actions = data[0].actions;
      this.totalActions = this.actions.length;
      console.log('actions', this.actions);
    }

  }

  radiusCard(data: any) {
    if (data.radius) {
      let radius = data.radius
      // data.forEach((ele: any) => {
      //   radius = ele.radius
      // });

      // console.log(data[0]);

      const radiusObj = [{
        name: 'Radius',
        value: radius
      }]

      console.log(radiusObj);

      this.radius = radiusObj;
    }

  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

}
