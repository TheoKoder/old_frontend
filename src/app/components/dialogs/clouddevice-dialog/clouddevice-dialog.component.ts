import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../services/api.service';


export class pageData{
  name: string = ""
  state: string = ""
  constructor(name: string,state: string){
    this.name = name
    this.state = state
  }
}

@Component({
  selector: 'sp-clouddevice-dialog',
  templateUrl: './clouddevice-dialog.component.html',
  styleUrl: './clouddevice-dialog.component.scss'
})
export class ClouddeviceDialogComponent {
  readonly dialog = inject(MatDialog);
  listData: pageData[] = []
  serialNumber: string = ""
  devFinal: null = null
  resFinal = false

  constructor(
    private api: ApiService,
    public dialogRef: MatDialogRef<ClouddeviceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.serialNumber = data.serial_no
      console.log(this.serialNumber)
  
  }

  ngOnInit() {
    this.process()
  }

  openDialog(enterAnimationDuration: string ="0ms", exitAnimationDuration: string="0ms"): void {
    this.dialog.open(ClouddeviceDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  closeDialog() {      
    this.dialogRef.close('Success');
  }

  closeDialogData(){
    if (this.resFinal){
      this.dialogRef.close({event:"Found",data: this.devFinal});
    } else {
      this.dialogRef.close({event:"Not Found",data: this.devFinal});
    }
  }

 

  process(){
    this.listData.push(new pageData("Page 1","Searching"))
    this.api.getApiKotBE(`newDeviceSetup`, { serialNumber: this.serialNumber, pageNo: 1, pageSize: 20 })
        .subscribe({
          next: (data: any) => {
            console.log(data)
            let totalPages = data.total_pages
            let pageSize = data.page_size
            let pageNo = 1
            this.checkDeviceExists(this.data.serial_no || '', data.devices)
            if (this.resFinal) {
              this.closeDialogData()
            } else {
              this.checkAll(totalPages, pageSize, pageNo)
            }
          }
        })
  }

  checkDeviceExists(serialNumber: string, devices: any[]) {
    //val serialNumber = dev.device_details.hardware.firstOrNull()?.data?.firstOrNull()?.serial_number
    for (const dev of devices) {
      // console.log(dev)
      // console.log(dev.device_details)
      // console.log(dev.device_details.hardware)
      // console.log(dev.device_details.hardware[0])
      console.log(dev.device_details.hardware[0].data[0].serial_number + " : " + serialNumber)
      if (dev.device_details.hardware[0].data[0].serial_number == null) {
        console.log(dev)
      } else {
        if (serialNumber.trim() === dev.device_details.hardware[0].data[0].serial_number.trim()) {
          console.log("++++++++++++++++++++++++++++++++++++found++++++++++++++++++++++++++++++++++++++++++++++")
          this.devFinal = dev
          this.resFinal = true
        }
      }
    }
  }
 

  checkAll(totalPages: number, pageSize: number, pageNo: number) {
    pageNo = pageNo + 1
    var notFound = true
    

    this.listData.push(new pageData(`Page ${pageNo}`,"Searching" ))
    this.api.getApiKotBE(`newDeviceSetup`, { serialNumber: this.data.serial_no, pageNo: pageNo, pageSize: pageSize })
      .subscribe({
        next: (data: any) => {
          console.log(data)
          let totalPages = data.total_pages
          let pageSize = data.page_size
          this.checkDeviceExists(this.data.serial_no || '', data.devices)
          if (this.resFinal) {
            notFound = false
          }
        },
        complete: () => {
          if (notFound){
            this.checkAll(totalPages,pageSize,pageNo)
          } else {
            this.closeDialogData()
          }
        }
      })
    console.log("out of loop")
  }
}
