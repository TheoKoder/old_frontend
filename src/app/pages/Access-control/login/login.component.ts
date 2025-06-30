import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isLoading= false;
  constructor(private authservice: AuthService,
    private _router: Router,
    private _snackbar: SnackbarService,
  private role_service:RoleService) { }
      form = new FormGroup({
        empNumber:  new FormControl(null, Validators.required),
        Empassword:  new FormControl(null, Validators.required),
      });


      onSubmit() {
        this.isLoading =true;

        if (this.form.invalid) {
          this.isLoading = false;
          return;
        }

        this.authservice.login(this.form.get('empNumber')?.value, this.form.get('Empassword')?.value).subscribe(
          (response) => {
            console.log(response)
            // this.handleResponse(response)
            this._snackbar.openSnackbar("Login successful...", response)
            this._router.navigate(['/assets']);
            this.isLoading = false;
          },error =>{
            this._snackbar.openSnackbar("Wrong Username or Password...", error)
            this.isLoading = false;
          }
        )
      }
}
