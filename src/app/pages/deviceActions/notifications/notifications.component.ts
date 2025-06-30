import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup, FormBuilder, UntypedFormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface DailogData{
  when_in: string;
  when_out: string;
}
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})

export class NotificationsComponent implements OnInit{

  notificationForm = new UntypedFormGroup({});
  switches:any[]=['on','off'];
  when_in:any;
  when_out:any;

  constructor(public dialogRef: MatDialogRef<NotificationsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DailogData,
    private _fb: FormBuilder){}

  ngOnInit(): void {

    this.notificationForm = this._fb.group({
      'when_in': new UntypedFormControl(this.data.when_in),
      'when_out': new UntypedFormControl(this.data.when_out)
    });

    
  }

  cancel(){
    this.dialogRef.close();
  }

  onSubmit(){
    const body = {
      when_in: this.when_in,
      when_out: this.when_out
    }
    console.log(body);
    this.dialogRef.close(body)
  }
}
