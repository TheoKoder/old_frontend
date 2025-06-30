import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { SharedService } from '../../../services/shared.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { jsPDF } from 'jspdf';
import mapboxgl from 'mapbox-gl';
import { MapComponent, markerData } from '../../map/map.component';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-reports-details',
  templateUrl: './reports-details.component.html',
  styleUrl: './reports-details.component.scss'
})
export class ReportsDetailsComponent implements OnInit {
  mapData: markerData = new markerData();
  isMap = true;
  isData = false;
  DeviceID = ""
  @ViewChild('spmap', { static: false }) spMap!: MapComponent;

  constructor(private service: ApiService,
    private _shared: SharedService,
    public dialog: MatDialog,
    private bar: SnackbarService
  ) { }
  
  
  isLoading = false;
  details: any;
  geoData: any;
  lat: any;
  lng: any;
  LaptopDetailedReports: any;
  testData: any;
  placeNameReady: boolean = false;
  map!: mapboxgl.Map;
  
  
  ngOnInit(): void {
    console.log(this._shared.getReportDetails())
    this.details = this._shared.getReportDetails()[0];
    console.log(this.details);
    // this.LaptopDetailedReports = this._shared.getDeviceDetails();
    // console.log("laptop details " + this.LaptopDetailedReports)
    this.lat = this.details.lat;
    this.lng = this.details.lng;
    
    this.DeviceID = this.details.device_id;
    this.getDeviceDetails();
  }
  
  getDeviceDetails(){
    console.log(this.DeviceID)
    this.service.getApiKot(`Device/${this.DeviceID}`).subscribe({
      next: (data: any) => {
        this.isData = true
        this.LaptopDetailedReports = data;
      },
      error: (error: any) => {
        this.bar.openSnackbar("Cannot find Device Details","")
      }
    });
  }

  ngAfterViewInit() {
    this.loadMap()
  }

  loadMap(){
    this.isMap = true;
    this.spMap.create()
    this.service.getApiKot('mapDecode', { longitude: this.details.lng, latitude: this.details.lat }).subscribe((data: any) => {
      this.testData = data[0]
      console.log(this.testData)
      this.spMap.addMarkerHTML(this.lng, this.lat, `<h5 style="color: black;">${data[0].place_name}</h5>`);
      //this.spMap.addMarker(this.lng, this.lat, `test`);
    })
  }


  async generatePDF() {
    this.isLoading = true;

    // Create a new instance of jsPDF
    const pdf = new jsPDF({
      orientation: 'landscape'
    });

    pdf.text(`Report Number : ${this.details.reportkey}`, 20, 20);


    const imgWidth = 80;
    const imgHeight = 80;
    pdf.addImage('data:image/jpeg;base64,' + this.details.picture, 'JPEG', 10, 30, imgWidth, imgHeight);
    pdf.addImage('data:image/jpeg;base64,' + this.details.screenshot, 'JPEG', 10 + imgWidth + 10, 30, imgWidth, imgHeight);
    var img = this.spMap.getCanvas().toDataURL('image/png')
    pdf.addImage(img, 'JPEG', 10 + imgWidth*2 + 20, 30, imgWidth, imgHeight);
    

    const infoText = `
      -----------------------------------------------------------------------------------------------------------------------------
      Physical Address  :${this.testData.place_name}
      Coordinates       :Latitude: ${this.details.lat} & Longitude: ${this.details.lng}
      -----------------------------------------------------------------------------------------------------------------------------
      WIFI              : ${this.details.ssid}
      Gateway IP        : ${this.details.gateway_ip}
      Name              : ${this.LaptopDetailedReports.name}
      Description       : ${this.LaptopDetailedReports.description}
      Operating System  : ${this.LaptopDetailedReports.os_details.os} ${this.LaptopDetailedReports.os_details.os_version_name} Version: ${this.LaptopDetailedReports.os_details.os_version}
      Serial Number     : ${this.LaptopDetailedReports.device_details.hardware[0].data[0].serial_number}
      Logged in User    : ${this.LaptopDetailedReports.logged_user}
      Class Description : ${this.LaptopDetailedReports.type}
      ------------------------------------------------------------------------------------------------------------------------------
      Report generated on:${this.details.created_at}
      ------------------------------------------------------------------------------------------------------------------------------



    `;

    pdf.text(infoText, 20, 110);

    // var lineHeight = pdf.getLineHeight();
    // var mapY = 30 + 15*lineHeight;
    // console.log(mapY)
    // var img = this.spMap.getCanvas().toDataURL('image/png')
    // pdf.addImage(img, 'JPEG', 10, mapY, 200, 100);

    pdf.save(`${this.details.reportkey}.pdf`);
    this.isLoading = false;
  }

}
