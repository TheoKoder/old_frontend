import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MapComponent,radiusData } from '../../map/map.component';

export interface CZData {
  mapData: radiusData;
}


@Component({
  selector: 'app-czdetail-dialog',
  templateUrl: './czdetail-dialog.component.html',
  styleUrl: './czdetail-dialog.component.scss'
})
export class CZDetailDialogComponent {
  readonly dialogRef = inject(MatDialogRef<CZDetailDialogComponent>);
  readonly data = inject<CZData>(MAT_DIALOG_DATA);

  mapData!: radiusData;

  ngOnInit(): void {
    this.mapData = this.data.mapData; //this.createRadiusData();
    console.log(this.mapData.color + " in Dialog")
  }

  createRadiusData(): radiusData {
    var rd: radiusData = new radiusData();
    // rd.longitude = this.data.lng;
    // rd.latitude = this.data.lat;
    // rd.color = this.data.color;
    // rd.radius = this.data.radius;
    // rd.id = this.data.id.toString();
    return rd;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}


