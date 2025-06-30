import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { SnackbarService } from '../../../services/snackbar.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  loginHeader: string = "Welcome Back"
  constructor(private authservice: AuthService,
    private _router: Router,
    private _snackbar: SnackbarService) {

    }

    doLogin(data: string){
      console.log("LoginPage ")
      console.log(data)
      const loginData = JSON.parse(data)
      this.authservice.login(loginData.login,loginData.password).subscribe({
        next: (response) => {this._snackbar.openSnackbar("Login successful...", response);this._router.navigate(['/assets']);},
        error: (e) => this._snackbar.openSnackbar("Wrong Username or Password...", e)
      })
    }
}
