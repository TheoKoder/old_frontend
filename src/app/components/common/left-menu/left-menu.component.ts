import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { NavNode } from '../tree-view/tree-view.component';


const TREE_DATA: NavNode[] = [
  {
    name: 'Home',
    route: '/assets'
  },
  { name:'Laptop',route:'/laptopList'
  },
  {
    name:'Laptop Tags',
    children:[
      {
        name:'Tagging',
        children:[
          {
            name:'Add Tag',route:'/tagging'
          },
          {
            name:'Validate Tag',route:'/taggingValidation'
          },
        ]
      },
      {
        name:'Insert/update Laptop',
        children:[
          {
            name:'Update Laptop',route:'/laptoplistC'
          },
          {
            name:'Insert Laptop',route:'/insertTag'
          }
        ]
      },
     ],
  },
  {
    name: 'Automations',
    children: [
      { name: 'Automations', route: '/automations' },
      { name: 'Control Zone', route: '/control-zones' },
    ]
  },
  {
    name:'Reports',
    children:[
      { name: 'Device Daily Report', route: '/DeviceDailyReport' },
      { name: 'Device Daily Location Report', route: '/DeviceDailyExceptionReport' },
      { name: 'All Device Missing Reports', route: '/AllReports' },
    ]
  },
  { name:'Logout',route:'/logout'}
];
@Component({
  selector: 'sp-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrl: './left-menu.component.scss'
})
export class LeftMenuComponent {
 
  //Control the Menu's OPEN/CLOSE
  menuOpen : boolean= false;
  
  treeData: NavNode[] = TREE_DATA;


  constructor(){
    console.log("left menu")
  }
  ngOnInit(): void {
    console.log("left menu nginit")
  }

  toggleMenu(){

    this.menuOpen = !this.menuOpen;
  }

}
