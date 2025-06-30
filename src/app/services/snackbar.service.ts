import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar'; 

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackbar: MatSnackBar) { }

  openSnackbar(message: string, action: string){
    if (action === 'error') {
      this._snackbar.open(message, '',{
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 4000,
        panelClass: ['red-snackbar'],
        
      });
    }
    else{
      this._snackbar.open(message, '',{
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 4000,
        panelClass: ['green-snackbar']
      });
    }
  }
}
