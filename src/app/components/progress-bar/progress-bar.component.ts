import { Component, Inject, Input } from '@angular/core';
import { MatDialog,MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

// @Component({
//   selector: 'app-progress-bar',
//   templateUrl: './progress-bar.component.html',
//   styleUrl: './progress-bar.component.scss'
// })
// export class ProgressBarComponent {
// @Input() isLoading:Boolean =false;
// }


//import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent {
  @Input() isLoading:Boolean =true;
//  // @Input() percent: number;
//   data
//   constructor(
//      private dialogRef: MatDialogRef<ProgressbarComponent>,
//      @Inject(MAT_DIALOG_DATA) data
//   ) {
//      this.data=data;
//       console.log(data);
//    }
}
