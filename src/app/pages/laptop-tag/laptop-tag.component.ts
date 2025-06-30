import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-laptop-tag',
  templateUrl: './laptop-tag.component.html',
  styleUrl: './laptop-tag.component.scss'
})
export class LaptopTagComponent implements OnInit{
  tagName: string = '';
  deviceId: any;

  constructor(private api:ApiService,
    private _shared: SharedService,
    private snackbar:SnackbarService, private router:Router){}
  ngOnInit(): void {
    this.deviceId = this._shared.getDeviceDetails();
  }

  onSubmit(): void {
    if (this.tagName.trim() && this.deviceId) {
      this.api.postLaravel(`addTag/${this.tagName}/${this.deviceId}`,{}).subscribe(
        response => {
          console.log('Tag added successfully:', response);
          this.snackbar.openSnackbar('Tag added successfully',response)
          this.router.navigate(['taggingValidation'])
          this.tagName = '';
          this.deviceId = '';
        },
        error => {
          console.error('Error adding tag:', error);

        }
      );
    }
  }

}
