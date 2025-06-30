import { Injectable } from '@angular/core';
import { Automations } from '../classes/automations';
import { Departments } from '../classes/departments';
import { Devices } from '../classes/devices';
import { Zones } from '../classes/zones';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  departmentDevices: Devices[] = [];
  allDevices!: any[];
  departments: Departments[] = [];
  zone: any;
  automation:any;
  departmentDetails: Departments[] = []
  deviceDetails: Devices[] = [];
  mapData:any;
  hardware:any[]=[];
  reportDetails:any[]=[];
  report:any[]=[];
  lastLocation:any[]=[];
  GeoDetails:any[]=[];
  chartData:any[]=[];
  constructor() { }
setlastLocation(data:any){
  this.lastLocation = data;
}
getlastLocation(){
  return this.lastLocation;
}
setGeoDetails(data:any){
this.GeoDetails = data;
}
getGeoDetails(){
  return this.GeoDetails;
}

  setReport(data:any){
    this.report = data;
  }
  getReport(){
    return this.report;
  }
  setReportDetails(data:any){
    this.reportDetails = data;
  }
  getReportDetails(){
    return this.reportDetails;
  }


  setDeviceHardware(data: any){
    this.hardware = data;
  }

  getDeviceHardware(){
    return this.hardware;
  }

  getMapData(){
    return this.mapData;
  }
  setMapData(data:any){
    this.mapData = data;
  }
  getAutomationDetails(){
    return this.automation
  }
  setAutomationDetails(data:any){
    this.automation=data;
  }
  setDevices(devices: any){
    this.departmentDevices = devices;
  }

  getDevices(){
    return this.departmentDevices;
  }

  setAllDevices(depDevices: any){
    this.allDevices = depDevices[0];
  }

  getAllDevices(){
    return this.allDevices;
  }

  setDepartments(data: any){
    this.departments = data;
  }

  getDepartments(){
    return this.departments;
  }

  setZoneDetails(data: any){
    this.zone = data;
  }

  getZonesDetails(){
    return this.zone;
  }

  setDepartmentDetails(data: any){
    this.departmentDetails = data;
  }

  getDepartmentDetails(){
    return this.departmentDetails;
  }

  setDeviceDetails(data: any){
    this.deviceDetails = data;
  }

  getDeviceDetails(){
    return this.deviceDetails;
  }
}
