import { Component, Input } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { UrlService } from '../../services/url.service';


@Component({
  selector: 'app-access-dialog',
  //standalone: true,
  //imports: [],
  templateUrl: './access-dialog.component.html',
  styleUrl: './access-dialog.component.scss'
})
export class AccessDialogComponent {
  visible: boolean = true
  position: Dialog["position"] = "center"
  
  @Input()
  previousURL!: string;

  onCancel() {
    console.log("cancel")
    console.log(this.previousURL)
  }


}
