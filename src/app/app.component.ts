import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { filter } from 'rxjs';
import { UrlService } from './services/url.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'AssetTrackingSystem';
  currentUrl: string = "/";

  public loggedIn: boolean = false;

  constructor(private _service: AuthService,
    private _router: Router, private primengConfig: PrimeNGConfig,private _url: UrlService) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.primengConfig.zIndex = {
      modal: 1100,    // dialog, sidebar
      overlay: 1000,  // dropdown, overlaypanel
      menu: 1000,     // overlay menus
      tooltip: 1100   // tooltip
    };
    this._router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((res) => {
      console.log("Page Url" + res)
      this._url.setPreviousUrl(this.currentUrl)
      this.currentUrl = (res as NavigationEnd).url
      
    })
    
    this._service.authStatus.subscribe(value => {
      this.loggedIn = value
    });
    // this._router.navigate(['/assets']);
  }
}
