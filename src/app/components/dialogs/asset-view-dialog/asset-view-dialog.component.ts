import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-asset-view-dialog',
  templateUrl: './asset-view-dialog.component.html',
  styleUrl: './asset-view-dialog.component.scss'
})

export class AssetViewDialogComponent {

  //Parsing the json data as "input " from TEST
  @Input() asset: any;

  constructor(){};

}
