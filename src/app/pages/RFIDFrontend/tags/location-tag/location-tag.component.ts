import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-location-tag',
  templateUrl: './location-tag.component.html',
  styleUrl: './location-tag.component.scss',
})
export class LocationTagComponent implements OnInit {
  locations: any;
  locationsHeaders: any;
  type ='location';
  constructor(private api: ApiService, private router: Router) {}
  ngOnInit(): void {
    this.api.getApiLaravel('create-tag').subscribe((data: any) => {
      this.locations = data.locations;
      const keys = Object.keys(this.locations[0]);
      const columnToSkip = 'locationId';
      this.locationsHeaders = keys.filter((key) => key !== columnToSkip);
    });
  }
  delete(locationId: any) {
    this.api.deleteLaravel(`deleteData/${this.type}/${locationId}`).subscribe(response =>{
      this.router.navigate(['/condition-tag']);
     },error =>{
      console.log(error)
     });
  }
  update(locationId: any) {
    this.router.navigate(['/update',this.type, locationId]);
  }
}
