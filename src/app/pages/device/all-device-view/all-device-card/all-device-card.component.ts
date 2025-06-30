import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-all-device-card',
  templateUrl: './all-device-card.component.html',
  styleUrl: './all-device-card.component.scss'
})
export class AllDeviceCardComponent {
  @Input() TheDevices: any;
}
