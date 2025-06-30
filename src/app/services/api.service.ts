import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


const adminServer = environment.AdminServerUrl;
const preyServer = environment.PreyServerUrl;
const LaravelGates = environment.LaravelGates;
const PreyFrontend = environment.PreyFrontend;


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  getCenterLat(): number {
    return environment.Map.centerLat;
  }
  getCenterLng(): number {
    return environment.Map.centerLng;
  }

  getNextPage(nextPageUrl: string): Observable<any> {
    return this._http.get(LaravelGates + nextPageUrl);
  }
  getApiLaravel(url: string, customParams: { [key: string]: any } = {}) {
    let params = new HttpParams();
    Object.keys(customParams).forEach(key => {
      params = params.set(key, customParams[key]);
    });
    console.log("url " + LaravelGates + url + { params })
    return this._http.get<any>(LaravelGates + url, { params });
  }
  putApiLaravel(url: string, body: any) {
    return this._http.put<any>(LaravelGates + url, body);
  }
  deleteLaravel(url: string) {
    return this._http.delete<any>(LaravelGates + url)
  }
  postLaravel(url: string, body: any, customParams: { [key: string]: any } = {}) {
    let params = new HttpParams();
    Object.keys(customParams).forEach(key => {
      params = params.set(key, customParams[key]);
    });
    console.log(LaravelGates + url)
    return this._http.post<any>(LaravelGates + url, body);
  }

  getApiKot(url: string, customParams: { [key: string]: any } = {}) {
    let params = new HttpParams();
    Object.keys(customParams).forEach(key => {
      params = params.set(key, customParams[key]);
    });
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    return this._http.get<any>(PreyFrontend + url, { headers, params });
  }
  getApiKotBE(url: string, customParams: { [key: string]: any } = {}) {
    let params = new HttpParams();
    Object.keys(customParams).forEach(key => {
      params = params.set(key, customParams[key]);
    });
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    return this._http.get<any>(preyServer + url, { headers, params });
  }



  putApiKot(url: string, body: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this._http.put<any>(PreyFrontend + url, body, { headers })
  }
  postApiKot(url: string, body: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this._http.post<any>(preyServer + url, body, { headers });
  }
  addTag(url: String, tagName: string, deviceId: string): Observable<any> {
    return this._http.post<any>(LaravelGates + url, { tagName, deviceId });
  }


  login(empNumber: string, Empassword: string) {
    console.log("AdminServer:" + adminServer + empNumber + Empassword)
    const loginData = "{\"id\":\"" + empNumber + "\",\"password\":\"" + Empassword + "\"}"
    console.log(loginData)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._http.post<any>(adminServer + `login`, loginData, { headers });
  }
  admin(AdminEmail: string, AdminPassword: string) {
    return this._http.post<any>(adminServer + `admin`, { AdminEmail, AdminPassword });
  }
  register(data: any) {
    return this._http.post(adminServer + 'admin/register', data);
  }
}
