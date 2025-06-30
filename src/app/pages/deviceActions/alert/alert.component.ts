import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../../services/api.service';
import { SnackbarService } from '../../../services/snackbar.service';
export interface DailogData {
  id: any;
}
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent implements OnInit {
  isLoading = false;
  alertMessageForm = new UntypedFormGroup({});

  constructor(private _service: ApiService,private snackbar:SnackbarService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DailogData){}



  ngOnInit(): void {
    this.alertMessageForm = new UntypedFormGroup({
      'message': new UntypedFormControl()
    })
    
  }

  onSubmit(form: UntypedFormGroup){
    this.isLoading = true;
    const body = {
      command: 'start',
      action_name: 'alert',
      options: {
        close_apps: 'true',
        alert_message: form.value.message
      }
    }

    console.log(this.data.id)
    this._service.putApiKot(`device/${this.data.id}/message`, body).subscribe(data =>{
      // console.log(data);
      this.snackbar.openSnackbar('Message has been activated',data)
      this.isLoading = false;
    },error=>{
      this.snackbar.openSnackbar('Message has not been activated',error)
      this.isLoading = false;
    })
    this.dialogRef.close(body)

    

  }

  cancel(): void{
    this.dialogRef.close();
  }
}
