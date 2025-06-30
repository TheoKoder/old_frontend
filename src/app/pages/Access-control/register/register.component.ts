import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  public form = new UntypedFormGroup({})
  selectedRole: string = '2';

  constructor(private authService: AuthService,
    private _router: Router,private snackbar:SnackbarService,private api:ApiService) { }

  ngOnInit(): void {
    this.form = new UntypedFormGroup({
      'EmpNumber': new UntypedFormControl(),
      'Name': new UntypedFormControl(),
      'MiddleName': new UntypedFormControl(),
      'Surname': new UntypedFormControl(),
      'email': new UntypedFormControl(),
      'phoneNumber': new UntypedFormControl(),
      'password': new UntypedFormControl(),
      'role': new UntypedFormControl('2')
    })
   
  }

  register(form: UntypedFormGroup) {
    console.log('Role:', this.selectedRole);
    const body = {
      EmpNumber: form.value.EmpNumber,
      Name: form.value.Name,
      MiddleName: form.value.MiddleName,
      Surname: form.value.Surname,
      email: form.value.email,
      phoneNumber: form.value.phoneNumber,
      password: form.value.password,
      role: form.value.role
    }

    this.api.register(body).subscribe((response) => {
      // console.log(response);
      // this.handleResponse(response);
      this.snackbar.openSnackbar("User Created successfully", response.toString())
    }, (error) => {
      this.snackbar.openSnackbar("User not created", error)
      console.log(error);
    });
  }
}
