import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { SharedService } from '../../../services/shared.service';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-e-gov',
  //standalone: true,
 // imports: [],
  templateUrl: './e-gov.component.html',
  styleUrl: './e-gov.component.scss'
})
export class EGovComponent  {
  SearchParams: string = '';
  LaptopData!: any[];
  page: number = 1;
  totalRecords: any;

  constructor(private _snackbar: SnackbarService, private service :ApiService,private _shared:SharedService, private _router:Router) {}
  ngOnInit(): void {
    this.search();
  }
  search() {
      this.service.getApiKot('eGov',{txt50:this.SearchParams}).subscribe((data:any)=>{
        this.LaptopData = data;
      },error=>{
        this._snackbar.openSnackbar("Error loading server, please try again later", error);
      });
  }
  deviceDetails(Id: any) {
    this.service.getApiKot(`Device/${Id}`).subscribe((data) => {
      let mapData = {
        id: Id,
        lat: data.location.lat,
        lng: data.location.lng
      }
      this._shared.setMapData(mapData);
      this._shared.setDeviceDetails(data)
      this._router.navigate(['deviceDetails']);
      console.log(data);
    });
  }
  
}
