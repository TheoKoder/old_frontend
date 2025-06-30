import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { TableComponent } from '../../utils/TableComponent';
import { SnackbarService } from '../../../services/snackbar.service';
import { ApiService } from '../../../services/api.service';
import { SharedService } from '../../../services/shared.service';
import { UIService } from '../../utils/ui.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

export class TagData {
  id: number = 0;
  name: string = '';
}


@Component({
  selector: 'app-deactivate-tag',
  templateUrl: './deactivate-tag.component.html',
  styleUrl: './deactivate-tag.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeactivateTagComponent extends TableComponent implements OnInit {
  
  constructor(
    private mainSnackbar: SnackbarService,
    private service: ApiService,
    private mainService: UIService,
    public maindialog: MatDialog,
    public dialogRef: MatDialogRef<DeactivateTagComponent>, 
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: TagData
  ) { 
    super(service,maindialog,mainService,mainSnackbar)
  }

  isComplete: boolean = false;
  @Input() mesg = "";
  override onComplete(): string {
    this.cd.detectChanges();
    return "";
  }
  ngOnInit(): void {
    this.loadItems("tagLaptop/" + this.data.name);
    
  }
  
  
  accept(){
   console.log("deleting tag: " + this.data.name);
   this.service.getApiLaravel('setTagNotActive/' + this.data.name).subscribe({
    next: (data: any) => {
      console.log(data);
      let res = data;
      this.mesg = "The number of tags affected is " + res['tags']  + " and the number of devices affected is " + res["devices"];
      this.isComplete = true;
      this.cd.detectChanges();
    },
    complete: () => {
      console.log("in complete")
      this.isComplete = true;
      this.cd.detectChanges();
    }
   })
  }
}
