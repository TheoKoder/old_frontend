import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from '../services/api.service';
import { RoleService } from './role.service';
import { Roles } from '../classes/roles.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  localToken!: string | null;
  nullToken!: [];
  redirectUrl!: string;

  /*
  private url ='http://localhost:8081/'

  private iss = {
    login: 'http://0.0.0.0:8081/login',
    register: 'http://localhost:8081/register',
    admin: 'http://0.0.0.0:8081/admin',
  };
*/
  private signedIn = new BehaviorSubject<boolean>(false);
  authStatus = this.signedIn.asObservable();

  get token(){
    this.localToken = localStorage.getItem('token');
    if (this.localToken == null) {
       return this.nullToken = [];
    }
    else{
      return this.localToken;
    }
  }

  constructor(private _http:HttpClient,private _service: ApiService,private _roleService: RoleService) {
      this.signedIn.next(!!this.token);
  }
  
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  login(empNumber:any, Empassword:any){
    return this._service.login(empNumber, Empassword).pipe(
      tap((response: any) =>{
        console.log(response)
        this.signedIn.next(true);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user',empNumber)
        this._roleService.setRole(response.userRole);
      })
    )
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  admin(AdminEmail:any, AdminPassword:any){
    return this._service.admin(AdminEmail, AdminPassword).pipe(
      tap((response: any) =>{
        console.log(response)
        this.signedIn.next(true);
        localStorage.setItem('token', response)
      })
    )
  }


  register(data:any){
  //   return this._http.post(this.url+'admin/register',data,this.options);
  }

  removeToken(){
    localStorage.removeItem('token');
  }

  changeAuthStatus(value: boolean){
    this.signedIn.next(value);
  }

  // handleToken(token: any){
  //   this.set(token);
  //   // console.log(this.isValid());
  // }

  // set(token: any){
  //   localStorage.setItem('token', token);
  // }

  // get(){
  //   return localStorage.getItem('token');
  // }

  // decode(payload: any){
  //   return JSON.parse(atob(payload));

  // }

  // payload(token: any){
  //   const payload = token.split('.')[1];
  //   return this.decode(payload);
  // }

  // isValid(){
  //   const token = this.get();
  //   if (token) {
  //     const payload = this.payload(token);
  //     if (payload) {
  //       return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
  //     }
  //   }

  //   return false;

  // }

  // loggedIn(){
  //   return this.isValid();
  // }
}
