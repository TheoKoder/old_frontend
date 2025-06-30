import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AutomationActions } from '../../../classes/automation-actions';
import { AutomationDevices } from '../../../classes/automation-devices';
import { AutomationEvents } from '../../../classes/automation-events';
import { Automations } from '../../../classes/automations';
import { SharedService } from '../../../services/shared.service';
import { ApiService } from '../../../services/api.service';
export interface DailogData {
  name: string;
}
@Component({
  selector: 'app-automations-details',
  
  templateUrl: './automations-details.component.html',
  styleUrl: './automations-details.component.scss'
})
export class AutomationsDetailsComponent {
  automation_devices:any;
  automation_events:any;
  automation_actions:any;
  automation :any;
  theAutomation:any;
  totalRecords!: any;
  page: number = 1;

  constructor(private _shared:SharedService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AutomationsDetailsComponent>,@Inject(MAT_DIALOG_DATA) public data: DailogData,
  private service :ApiService){}


  ngOnInit(): void {
    this.automation = this._shared.getAutomationDetails();
    console.log(this.automation)
    this.automation_devices = [this.automation.data.automation_devices];
    this.automation_events = [this.automation.data.automation_events];
    this.automation_actions = [this.automation.data.automation_actions];


    // this.automationDevice(this._shared.getAutomationDetails());
    // this.automationEvents(this._shared.getAutomationDetails());
    // this.automationActions(this._shared.getAutomationDetails());
    
  }
  // automationDevice(data: any) {
  //   if (data[0].automation_devices) {
  //     this.automation_devices = data[0].automation_devices;
  //     this.totalRecords = this.automation_devices.length;
  //     console.log('devices', data[0].automation_devices);
  //   }
  // }
  // automationEvents(data: any) {
  //   if (data[0].automation_events) {
  //     this.automation_events = data[0].automation_events;
  //     this.totalRecords = this.automation_events.length;
  //     console.log('Events', data[0].automation_events);
  //   }
  // }
  // automationActions(data: any) {
  //   if (data[0].automation_actions) {
  //     this.automation_actions = data[0].automation_actions;
  //     this.totalRecords = this.automation_actions.length;
  //     console.log('Actions', data[0].automation_actions);
  //   }
  // }
  
}
 

