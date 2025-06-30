import { Component } from '@angular/core';

@Component({
  selector: 'app-laptop-register-link',
  templateUrl: './laptop-register-link.component.html',
  styleUrl: './laptop-register-link.component.scss'
})
export class LaptopRegisterLinkComponent {
  RegisterDevice():void{
    const preyUrl = 'https://prey.io/dl/oXAEXB6ztL6L_Dl_';
    const link = document.createElement('a');
    link.href = preyUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert('The software file has been downloaded. Please open it from your downloads folder to install.');
  }
  RegisterARMMac():void{
    const url = '/assets/software/prey-mac-1.13.4-arm64.pkg';
    const link = document.createElement('a');
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert('The software file has been downloaded. Please open it from your downloads folder to install and run the following command: API_KEY=37bd1de6b87d924d3eab2773 sudo -E installer -pkg prey-mac-1.13.4-arm64.pkg -target /');
  }
  RegisterIntelMac():void{
    const url = '/assets/software/prey-mac-1.13.4-x64.pkg';
    const link = document.createElement('a');
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert('The software file has been downloaded. Please open it from your downloads folder to install and run the following command:  API_KEY=37bd1de6b87d924d3eab2773 sudo -E installer -pkg prey-mac-1.13.4-x64.pkg -target /');
  }
  SetupGuide():void{
    const url = '/assets/software/MacSetup.pdf';
    const link = document.createElement('a');
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert('The  file has been downloaded.');
  }
}
