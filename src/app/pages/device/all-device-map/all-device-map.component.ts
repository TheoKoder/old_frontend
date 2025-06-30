import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ApiService } from '../../../services/api.service';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-all-device-map',
  // standalone: true,
  // imports: [],
  templateUrl: './all-device-map.component.html',
  styleUrl: './all-device-map.component.scss',
})
export class AllDeviceMapComponent implements OnInit {
  geoData: any;
  constructor(
    private _shared: SharedService,
    private _service: ApiService,
    private http: HttpClient
  ) { }
  isLoading = false;
  map!: mapboxgl.Map;
  id: any;
  lat: any;
  lng: any;
  mapData: any;
  radius: any;
  color: any;
  deviceData: any;

  ngOnInit(): void {
    this.isLoading = true;
    this.mapData = this._shared.getMapData();
    console.log("Map Data:" + this.mapData);
    this.id = this.mapData.id;
    this.lng = this.mapData.lng;
    this.lat = this.mapData.lat;
    this.map = new mapboxgl.Map({
      accessToken:
        'pk.eyJ1IjoibmVvemEiLCJhIjoiY2xvZnkwOTRiMHh1YTJrcndmam82em42aSJ9.DAxTwxCFRRjQ_BZ7y4ODgw',
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [this.lng, this.lat], // starting position [lng, lat]
      zoom: 15, // starting zoom
    });
    this._service
      .getApiKot('mapDecode', { longitude: this.lng, latitude: this.lat })
      .subscribe(
        (data: any) => {
          this.geoData = data[0];
          const popup = new mapboxgl.Popup({ offset: 100 })
            .setLngLat([this.lng, this.lat])
            .setHTML(`<h5 style="color: black;">${data[0].place_name}</h5>`);
          new mapboxgl.Marker()
            .setLngLat([this.lng, this.lat])
            .setPopup(popup)
            .addTo(this.map);

          this.map.on('click', (e) => {
            console.log('Map clicked at:', e.lngLat);
          });
          console.log(this.geoData);
        },
        (error) => {
          console.error('Error fetching data:', error);
          this.isLoading = false;
        }
      );
      this.isLoading = false;
  }
}
