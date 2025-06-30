import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { NavNode } from '../../../../components/common/tree-view/tree-view.component';

const TREE_DATA: NavNode[] = [
  {
    name: 'Home',
    route: '/assets'
  },
  {
    name: 'Assigned Tags', route: '/all-tags'
  },
  {
    name: 'Unassigned Tags', route: '/Existing-Tags' 
  },
  { name: 'SAP Register', route: '/RFIDRegister' },
  { name: 'Register Asset', route: '/create-tag' },
  {
    name: 'Gates',
    children: [
      { name: 'Entry/Exit Movement', route: '/RFIDGate' },
      { name: 'Gate Movement Daily Report', route: '/RFIDGateReport' }
    ]
  },
  {
    name:'Fixed Reader',
    children:[
      {
        name:'New Tags',route:'/newTag'
      },
      {name:'Tags Inuse',route:'/Inuse'}
      ,
      {name:'Tag Status',route:'/status'}
      ,
    ]
  },
  { name:'Logout',route:'/logout'}
];

@Component({
  selector: 'app-tag-left-menu',
  templateUrl: './tag-left-menu.component.html',
  styleUrl: './tag-left-menu.component.scss'
})
export class TagLeftMenuComponent {
  treeData: NavNode[] = TREE_DATA; 
}
