import { Component } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Output,Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'sp-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  @Input() header: string = "Login"
  @Output() newLoginEvent = new EventEmitter<string>();
  loginForm: FormGroup = new FormGroup({
    'login': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required)
  });

  submitted = false;

  ngOnInit() {

  }

  onSubmit() {
    this.submitted = true;
    //alert(JSON.stringify(this.loginForm!.value));
    this.newLoginEvent.emit(JSON.stringify(this.loginForm!.value));
  }
}
