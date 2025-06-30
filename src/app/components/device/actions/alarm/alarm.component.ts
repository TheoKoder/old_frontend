import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DailogData } from '../alert/alert.component';
import { ApiService } from '../../../../services/api.service';
import { SnackbarService } from '../../../../services/snackbar.service';
@Component({
  selector: 'app-alarm',

  templateUrl: './alarm.component.html',
  styleUrl: './alarm.component.scss'
})
export class AlarmComponent implements OnInit{


  alarmForm = new UntypedFormGroup({});
sounds: any[]=['ring','alarm','siren','modem'];
selectedSound: any;

  constructor(private _service: ApiService,private snackbar:SnackbarService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AlarmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DailogData){}



  ngOnInit(): void {
    this.alarmForm = new UntypedFormGroup({
      'sound': new UntypedFormControl()
    })
    
  }

  onSubmit(){
    let username = localStorage.getItem('user')
    const body = {
      command: 'start',
      action_name: 'alarm',
      options: {
        close_apps: 'true',
        sound: this.selectedSound
      }
    }
    console.log(this.data.id)
    this._service.putApiKot(`device/${username}/${this.data.id}/alarm`, body).subscribe(data =>{
      // console.log(data);
      this.snackbar.openSnackbar('Alarm has been activated',data)
    },error=>{
      this.snackbar.openSnackbar('Alarm has not been activated',error)
    });
    this.dialogRef.close(body)

    

  }

  cancel(): void{
    this.dialogRef.close();
  }

}
