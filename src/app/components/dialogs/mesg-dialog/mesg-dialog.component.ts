import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'sp-mesg-dialog',
  templateUrl: './mesg-dialog.component.html',
  styleUrl: './mesg-dialog.component.scss'
})
export class MesgDialogComponent {
  readonly dialog = inject(MatDialog);
  mesg: String = ""

  constructor(
    public dialogRef: MatDialogRef<MesgDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}


  ngOnInit() {
    this.mesg = this.data.mesg;
  }

  openDialog(enterAnimationDuration: string ="0ms", exitAnimationDuration: string="0ms"): void {
    this.dialog.open(MesgDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}
