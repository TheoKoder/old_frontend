import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { ApiService } from '../../../services/api.service';
import { TreeModule } from 'primeng/tree';
import { ClouddeviceDialogComponent } from '../clouddevice-dialog/clouddevice-dialog.component';


export class AssetData {
  laptopID: number | undefined;
  serial_no: string | undefined
}


@Component({
  selector: 'app-verification-dialog',
  templateUrl: './verification-dialog.component.html',
  styleUrl: './verification-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerificationDialogComponent {
  private _formBuilder = inject(FormBuilder);
  public duration: string = "3000";
  //public TagInfo: string = "Checking for Tag"
  @ViewChild('stepper', { static: false }) step!: MatStepper

  firstFormGroup: FormGroup = this._formBuilder.group({ firstCtrl: ['Checking for Tag Information'] });
  secondFormGroup: FormGroup = this._formBuilder.group({ firstCtrl: ['Checking if device is on Platform'] });
  thirdFormGroup: FormGroup = this._formBuilder.group({ firstCtrl: ['Checking if device is in the Cloud'] });
  fourthFormGroup: FormGroup = this._formBuilder.group({ firstCtrl: ['Updating Platform'], secondCtrl: ['Recorded'] });


  private cloudDevice: any
  public mesgRec = true;
  mesg: String = ""
  verified = false;
  bypassCloudSearch = false;
  canCancel = true;

  tagComplete = false;
  tagEditable = true;

  platformComplete = true;
  platformEditable = true;


  constructor(
    private api: ApiService,
    public dialogRef: MatDialogRef<VerificationDialogComponent>,
    private cloudDeviceDialog: MatDialog,
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: AssetData) {

  }

  ngOnInit() {
    this.bypassCloudSearch = false;
    this.cloudDevice = ""



  }
  ngAfterViewInit(): void {
    // console.log(this.step.selectedIndex);
    // this.runStep();
    // console.log(this.step.selectedIndex);
    this.step.selectionChange.subscribe(selection => {
      console.log("selection change")
      console.log(selection.selectedStep)
      console.log(selection.previouslySelectedStep)
    })
  }
  checkCancel() {
    //return null;
    return !this.canCancel;
  }
  start() {
    this.canCancel = false;
    this.cd.detectChanges();
    this.runStep();
  }
  complete() {
    this.verified = true;
    this.closeDialog()
  }
  closeDialog() {
    if (this.verified) {
      this.dialogRef.close('Success');
    } else {
      this.dialogRef.close('Failed');
    }
  }
  runStep() {
    switch (this.step.selectedIndex) {
      case 0:
        this.TagValidation()
        break;
      case 1:
        this.PlatformValidation()
        break;
      case 2:
        console.log("in step 3")
        this.CloudValidation()
        break;
      case 3:
        console.log("step 3 update")
        this.UpdatePlatform()
        break;
    }
  }
  sendMessage(device_id: any) {
    let username = localStorage.getItem('user')
    console.log(device_id)
    const body = {
      command: 'start',
      action_name: 'alert',
      options: {
        close_apps: 'true',
        alert_message: 'Tracking Software Activated: Click Close and Have a Good Day'
      }
    }
    this.api.putApiKot(`device/${username}/${device_id}/message`, body).subscribe({
      next: (data: any) => {
        console.log(data)
        this.mesgRec = false
        this.cd.detectChanges()
      }
    })
    // this.mesgRec = false;
    // this.step.next()
    // this.runStep()
  }
  mesgReceived() {
    this.step.next();
    this.runStep();
  }
  reset() {
    this.bypassCloudSearch = false;
    this.cloudDevice = ""
  }
  UpdatePlatform() {
    let user = localStorage.getItem('user')
    console.log(this.bypassCloudSearch + "bypasscloud")
    if (!this.bypassCloudSearch) {
      console.log(this.cloudDevice);
      console.log("User Login: ")
      this.api.postApiKot('newDevice/post', this.cloudDevice).subscribe({
        next: (data: any) => {
          console.log(data);
          this.fourthFormGroup.patchValue({
            firstCtrl: ["Platform Updated..."],
            secondCtrl: ["Transaction recorded under " + user]
          })
          this.reset();
          this.step.next();
        }
      })
    } else {
      this.fourthFormGroup.patchValue({
        firstCtrl: ["No Platform Updates..."],
        secondCtrl: ["Transaction recorded under " + user]
      })
      this.reset();
      this.step.next();
    }

  }




  CloudValidation() {
    if (!this.bypassCloudSearch) {

      console.log("in cloud verification");
      const info: AssetData = new AssetData()
      info.laptopID = 0;
      info.serial_no = this.data.serial_no;
      const dialogRef = this.cloudDeviceDialog.open(ClouddeviceDialogComponent, {
        width: '500px',
        height: '500px',
        disableClose: true,
        data: info
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(result)
        console.log("============================================================================")
        if (result.event === "Found") {
          this.cloudDevice = result.data
          this.thirdFormGroup.patchValue({
            firstCtrl: ["Found Device in Cloud, Sending Mesg..."]
          })
          this.sendMessage(this.cloudDevice.id)
        } else {
          this.thirdFormGroup.patchValue({
            firstCtrl: ["Not Finding Device in Cloud, Please check Software"]
          })
          this.canCancel = true;
        }
      })

    }
  }
  CloudValidationOld() {
    if (!this.bypassCloudSearch) {
      this.api.getApiKotBE(`newDeviceSetup`, { serialNumber: this.data.serial_no })
        .subscribe({
          next: (data: any) => {
            console.log(data);
            if (data.length > 0) {
              this.cloudDevice = data[0]
              this.thirdFormGroup.patchValue({
                firstCtrl: ["Found Device in Cloud, Sending Mesg..."]
              })
              this.sendMessage(data[0]['id'])
            } else {
              this.thirdFormGroup.patchValue({
                firstCtrl: ["Not Finding Device in Cloud, Please check Software"]
              })
              this.canCancel = true;
            }
          }
        })
    }
  }
  PlatformValidation() {
    this.api.getApiLaravel(`device/${this.data.serial_no}`).subscribe({
      next: (data: any) => {
        console.log("----------------------------------------------------------------")
        console.log(data);
        console.log(data.data)
        try {
          let obj = JSON.parse(data.data);
          console.log(obj.length)
          if (obj.length > 0) {
            console.log(obj[0]['DeviceID']);
            let deviceID = obj[0]['DeviceID'];
            this.secondFormGroup.patchValue({
              firstCtrl: ["Found Device:" + deviceID + " ByPassing Cloud Continuing ..."]
            })
            this.thirdFormGroup.patchValue({
              firstCtrl: ["Found Device on Platform, Sending Mesg..."]
            })
            this.bypassCloudSearch = true;
            this.sendMessage(deviceID)
            if (this.step.selected) {
              this.step.selected.completed = true;
              this.step.selected.editable = false;
            }
            this.step.next()
            this.runStep()
          } else {
            this.secondFormGroup.patchValue({
              firstCtrl: ["Device Not Found on Platform"]
            })
            this.step.next()
            this.runStep()
          }
        } catch (error) {
          this.secondFormGroup.patchValue({
            firstCtrl: ["Device Not Found on Platform"]
          })
          this.step.next()
          this.runStep()
        }
      },
      error: (err: any) => {
        console.log(err)
      }
    })

  }
  TagValidation() {
    this.api.getApiLaravel('taggingValidation', { SERIAL_NUMBER: this.data.serial_no }).subscribe({
      next: (res: any) => {
        console.log(res["data"])
        if (res["data"].length > 0) {
          let tag = res["data"][0]["name"]
          this.firstFormGroup.patchValue({
            firstCtrl: [tag]
          })
          //this.tagComplete = true;
          //this.tagEditable = false;
          this.step.next()
          this.runStep()
        } else {
          this.firstFormGroup.patchValue({
            firstCtrl: ['Tag Not Found, Please Check']
          })
        }
      },
      error: (err: any) => {
        console.log(err)
      }
    }
    )
  }
}
