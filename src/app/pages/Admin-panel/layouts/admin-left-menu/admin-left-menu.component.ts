import { Component } from '@angular/core';
import { NavNode } from '../../../../components/common/tree-view/tree-view.component';
const TREE_DATA: NavNode[] = [
  {name: 'Home',route: '/assets'},
  {
    name: 'Laptop',
    children: [
      {
        name: 'Devices', route: '/all-devices'
      },
      {
        name: 'Update Database', route: '/preybutton'
      },
      {
        name: 'Tag Management', route: '/tagpage'
      }
    ]
  },
  {
    name: 'Tag Customzation',
    children: [
      { name: 'Create Items', route: '/createCategory' },
      { name: 'Category', route: '/category-tag' },
      { name: 'Condition', route: '/condition-tag' },
      { name: 'CLASS_DESCRIPTION', route: '/brand-tag' },
      { name: 'Location', route: '/location-tag' },
      { name: 'Disposal', route: '/disposal-tag' },
    ]
  },
  { name: 'Logout', route: '/logout' }
];
@Component({
  selector: 'app-admin-left-menu',
  templateUrl: './admin-left-menu.component.html',
  styleUrl: './admin-left-menu.component.scss'
})
export class AdminLeftMenuComponent {
  treeData: NavNode[] = TREE_DATA;
}
