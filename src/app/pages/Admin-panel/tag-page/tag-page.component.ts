import { Component, inject } from '@angular/core';
import { TableComponent } from '../../../components/utils/TableComponent';
import { SnackbarService } from '../../../services/snackbar.service';
import { ApiService } from '../../../services/api.service';
import { UIService } from '../../../components/utils/ui.service';
import { MatDialog } from '@angular/material/dialog';
import { DeactivateTagComponent, TagData } from '../../../components/dialogs/deactivate-tag/deactivate-tag.component';
import { TableComponent2 } from '../../../components/utils/TableComponent2';

@Component({
  selector: 'app-tag-page',
  templateUrl: './tag-page.component.html',
  styleUrl: './tag-page.component.scss'
})
export class TagPageComponent extends TableComponent2 {
  readonly dialog = inject(MatDialog);
  tagNumber: string = ''

  constructor(
    private mainSnackbar: SnackbarService,
    private service: ApiService,
    private mainService: UIService,
  ) {
    super(service, mainService, mainSnackbar)
  }
  override onComplete(): string {
    return "";
  }
  performSearch(){
    console.log("search on:" + this.tagNumber)
    this.loadItems('tagName/' + this.tagNumber);
  }
  performSearchAll(){
    console.log("search on:" + this.tagNumber)
    this.loadItems('tagName/');
    //this.loadItems('getTagLaptop/');
  }
  deactivate(id: number,tag: string) {
    console.log("deactivate the following: " + id) 
    const info: TagData = new TagData()
    info.id = id;
    info.name = tag;
    const dialogRef = this.dialog.open(DeactivateTagComponent,{
      width: '500px',
      height: '400px',
      disableClose: true,
      data: info
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }
  
}
