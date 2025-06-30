import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Notifications } from '../../../classes/notifications';
import { ActionsComponent } from '../../deviceActions/actions/actions.component';
import { ApiService } from '../../../services/api.service';
import { SharedService } from '../../../services/shared.service';
import { SnackbarService } from '../../../services/snackbar.service';
import * as mapboxgl from 'mapbox-gl';
import { NotificationsComponent } from '../../deviceActions/notifications/notifications.component';
import { Router } from '@angular/router';




@Component({
  selector: 'app-create-zone',
  // standalone: true,
  // imports: [],
  templateUrl: './create-zone.component.html',
  styleUrl: './create-zone.component.scss'
})
export class CreateZoneComponent implements OnInit{

  zoneForm = new UntypedFormGroup({});
  sizes: any[] = ['Small', 'Medium', 'Large'];
  devices: any[] = [];
  selectedDevices: any;
  selectedSize: any;
  page_size: number = 10;
  color = "#000000";
  totalRecords!: any;
  selectedRow: Set<any> = new Set();
  page: number = 1;
  selectedRows:any[]=[];
  notification: Notifications = new Notifications();
  notifications: Notifications[] = [];
  actions: any[] = [];
  map!: mapboxgl.Map;
  radius:number  = 1;
  lat:any;
  lng:any;

  constructor(private _service: ApiService,private router :Router,
    private _shared: SharedService,
    private _snackbar: SnackbarService,
    private _formBuilder: UntypedFormBuilder,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this._service.getApiKot('all',{page:this.page,page_size:this.page_size}).subscribe((data:any)=>{
      this.devices = data;
    },error=>{
      this._snackbar.openSnackbar("Error loading server, please try again later", error);
    });
    this.map = new mapboxgl.Map({
    accessToken:'pk.eyJ1IjoibmVvemEiLCJhIjoiY2xvZnkwOTRiMHh1YTJrcndmam82em42aSJ9.DAxTwxCFRRjQ_BZ7y4ODgw',
     container: 'map', // container ID
     style: 'mapbox://styles/mapbox/streets-v12', // style URL
     center: [0,0], // starting position [lng, lat]
     zoom: 15, // starting zoom
     });
     this.map.on('load', () => {
      this.map.addControl(new mapboxgl.NavigationControl());
     navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        this.map.setCenter([longitude, latitude]);
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
     });
     this.map.on('click',async (e)=>{
      await this.zoneRadiusPrompt();
      if(this.radius !== null){
       this.addRadius(e.lngLat);
       console.log(e.lngLat)
       this.lat = e.lngLat.lat;
       this.lng = e.lngLat.lng
      }
     });

    this.zoneForm = new UntypedFormGroup({
      'name': new UntypedFormControl(),
      'address': new UntypedFormControl(),
      'radius': new UntypedFormControl(),
      'color': new UntypedFormControl(),
    })

  }

  onSubmit(form: UntypedFormGroup) {
        const rad = this.radius*100;
        const body = {
          name: form.value.name,
          lat: this.lat.toString(),
          lng: this.lng.toString(),
          radius: rad.toString(),
          color: this.color,
          devices: this.selectedRows,
          actions: this.actions,
          notifications: this.notifications[0]
        }

        console.log(body);

        this._service.postApiKot('Zone/post', body).subscribe(data => {
        this.router.navigate(['/control-zones']);
        },(error)=>{
          console.log(error);
        });
  }
  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = false;

    dialogConfig.data = this.notifications;

    const dialogRef = this.dialog.open(NotificationsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      console.log("Dialog output: ", data)

      let results: Notifications = new Notifications();
      results = data
      if (results) {
        if (this.notifications.length === 0) {
          this.notifications.push({
            when_in: data.when_in !== undefined ? data.when_in : 'off',
            when_out: data.when_out !== undefined ? data.when_out : 'off'
          });
        } else {
          this.notifications[0].when_in = data.when_in !== undefined ? data.when_in : 'off';
          this.notifications[0].when_out = data.when_out !== undefined ? data.when_out : 'off';
        }
      }


    });


  }


  actionDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = false;

    const dialogRef = this.dialog.open(ActionsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      console.log("Dialog output: ", data)

      let results: any
      results = data
      if(data){
        this.actions = [data];
      }
    });
  }


  // formatLabel(value: number): string {
  //   if (value >= 10000000) {
  //     this.radiusValue = Math.round(value / 1000000) + ' sq km';
  //     console.log(this.radiusValue)
  //   }
  //   this.radiusValue = value;
  //   console.log(this.radiusValue)

  //   return `${value}`;
  // }

  selectRow(device_id: any) {
    const rowIndex = this.devices.findIndex(row => row.device_id === device_id[0].id);

  if (rowIndex !== -1) {

    const isSelected = this.selectedRows.includes(device_id);

    if (isSelected) {

      this.selectedRows = this.selectedRows.filter(id => id !== device_id);
    } else {

      this.selectedRows.push(device_id);
    }
  } else {
    console.error(`Row with device_id ${device_id} not found. Available rows:`, this.devices);
  }
  }

  selectAll(event: any) {
    if (event.checked) {
      this.devices.forEach(row => this.selectedRows.push(row.device_id));
    } else {
      this.selectedRows = [];
    }
  }
  async zoneRadiusPrompt(){
    let userRadius:number=1;
    while(userRadius===1){
      const userInput = prompt('Enter Zone Radius in kilometers:');
      if(userInput===null){
        return;
      }
      userRadius = parseFloat(userInput);
      if(isNaN(userRadius)){
        alert('The zone has been set to 1Km');
      }
    }
    this.radius = userRadius;

  }
  addRadius(coordinates:mapboxgl.LngLat){
    const options ={
      steps:60,
      duration:2000,
      units:'kilometers'
    };
    this.map.addSource('radius',{
      type: 'geojson',
          data: {
              "type": "FeatureCollection",
              "features": [{
                  "type": "Feature",
                  "properties": {

                  },
                  "geometry": {
                      "type": "Point",
                      "coordinates":coordinates.toArray()
                  }
              }]
          }
      });
      this.map.addLayer({
        'id': 'radius',
        'type': 'circle',
        'source': 'radius',
        'paint': {
        'circle-color':'red',
        'circle-radius': {
          stops: [
            [0, 0],
            [20, this.radius * 100],
          ],
          base: 2,
        },
        "circle-opacity":0.5
        },

        });

        if(this.map.getSource('radius')){
          this.map.removeLayer('radius');
          this.map.removeSource('radius')
        }
        this.map.addSource('radius', {
          type: 'geojson',
          data: {
              "type": "FeatureCollection",
              "features": [{
                  "type": "Feature",
                  "properties": {

                  },
                  "geometry": {
                      "type": "Point",
                      "coordinates":coordinates.toArray()
                  }
              }]
          }
        });

        this.map.addLayer({
          id: 'radius',
          type: 'circle',
          source: 'radius',
          paint: {
            'circle-radius': {
              stops: [
                [15, this.radius * 100],
              ],
            },
            'circle-color': 'blue',
            'circle-stroke-width': 2,
            'circle-stroke-color': '#007BFF'
          }
        });

        this.map.setPaintProperty('radius', 'circle-radius', 10);

        this.map.easeTo({
          center: coordinates.toArray() as [number, number],
          duration: options.duration
        });

        setTimeout(() => {
          this.map.setPaintProperty('radius', 'circle-radius', this.radius*50);
        }, 100);
  }

}
