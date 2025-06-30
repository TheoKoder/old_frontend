import { Component, Inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../../../services/api.service';
import { SnackbarService } from '../../../../services/snackbar.service';

export interface DailogData {
  id: any;
}
@Component({
  selector: 'app-lock',
  templateUrl: './lock.component.html',
  styleUrl: './lock.component.scss'
})

export class LockComponent {
  lockDeviceForm = new UntypedFormGroup({});
  locks: any[] = ['start', 'stop'];
  selectedCommand: any;

  constructor(private _service: ApiService, private snackbar: SnackbarService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DailogData) { }



  ngOnInit(): void {
    this.lockDeviceForm = new UntypedFormGroup({
      'command': new UntypedFormControl(),
      'password': new UntypedFormControl(),
    })

  }

  onSubmit(form: UntypedFormGroup) {
    let username = localStorage.getItem('user')
    const body = {
      command: this.selectedCommand,
      action_name: 'lock',
      options: {
        close_apps: 'true',
        unlock_pass: form.value.password
      }
    }

    const Pasbody = {
      name: this.data.id,
      password: form.value.password
    };

    this._service.postLaravel('devicePasswords', Pasbody).subscribe(
      response => {
        console.log('Success!', response);
      },
      error => {
        console.error('Error:', error);
      }
    );

    console.log(Pasbody)
    this._service.putApiKot(`device/${username}/${this.data.id}/lock`, body).subscribe(data => {
      console.log(data);
      this.snackbar.openSnackbar('The Device is locked', data)
    }, error => {
      this.snackbar.openSnackbar('The Device is not locked', error)
    })
    this.dialogRef.close(body)
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
