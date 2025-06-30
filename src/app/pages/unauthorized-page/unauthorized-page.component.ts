import { Component } from '@angular/core';
import { UrlService } from '../../services/url.service';
import { Dialog } from 'primeng/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized-page',
  templateUrl: './unauthorized-page.component.html',
  styleUrl: './unauthorized-page.component.scss'
})
export class UnauthorizedPageComponent {
  visible: boolean = true
  position: Dialog["position"] = "center"
  previousUrl: string = '';
  
  constructor(private urlService: UrlService,private router: Router){
    console.log("In UnAuthorized Page")
    this.urlService.previousUrl$
      .subscribe((previousUrl: string) => {
        this.previousUrl = previousUrl
      });
    console.log(this.previousUrl)
  }

  onCancel() {
    console.log("cancel")
    console.log(this.previousUrl)
    this.router.navigate([this.previousUrl])
  }
}
