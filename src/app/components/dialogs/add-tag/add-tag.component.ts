import { Component, inject, Inject, OnInit } from '@angular/core';
import { SnackbarService } from '../../../services/snackbar.service';
import { ApiService } from '../../../services/api.service';
import { AssetData } from '../verification-dialog/verification-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrl: './add-tag.component.scss'
})
export class AddTagComponent implements OnInit {
  tagName: string = '';
  deviceId: any;
  done: boolean = false;

  private _formBuilder = inject(FormBuilder);
  public duration: string = "3000";

  firstFormGroup: FormGroup = this._formBuilder.group({ firstCtrl: [''] });
  
  constructor(
    private api: ApiService,
    public dialogRef: MatDialogRef<AddTagComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AssetData) {

  }
  

  ngOnInit(): void {
    this.deviceId = this.data.laptopID;
  }

  closeDialog() {
    if (this.done) {
      this.dialogRef.close('Success');
    } else {
      this.dialogRef.close('Failed');
    }
  }
  onSubmit(): void {
    this.tagName = this.firstFormGroup.controls['firstCtrl'].value
    console.log(this.tagName + " : device " + this.deviceId)
    let username = localStorage.getItem('user')
    if (this.tagName && this.deviceId) {
      this.api.postLaravel(`addTag/${this.tagName}/${this.deviceId}/${username}`, {}).subscribe(
        response => {
          console.log('Tag added successfully:', response);
          //this.snackbar.openSnackbar('Tag added successfully', response)
          this.tagName = '';
          this.deviceId = '';
          this.done = true;
          this.closeDialog();
        },
        error => {
          console.error('Error adding tag:', error);

        }
      );
    }
  }
}
