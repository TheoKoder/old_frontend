import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Subscription } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

export interface NavNode {
  name: string;
  route?: string;
  children?: NavNode[];
}

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent implements OnInit, OnDestroy {
  
  
  @Input() treeData: NavNode[] = [];
  treeControl = new NestedTreeControl<NavNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<NavNode>();
  expandedNodes: Set<string> = new Set<string>();
  key = 'treeExpansionState';
  private subscription!: Subscription;
  constructor() {
    console.log("in treeview")
  }

  ngOnInit() {
    console.log("in treeview nginit")
    this.dataSource.data = this.treeData;
    this.loadExpansionState();
    this.subscribeToExpansionChanges();

  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  hasChild = (_: number, node: NavNode) => !!node.children && node.children.length > 0;

  private subscribeToExpansionChanges() {
    this.subscription = this.treeControl.expansionModel.changed.subscribe(change => {
      if (change.added) {
        change.added.forEach(node => this.expandedNodes.add(node.name));
      }
      if (change.removed) {
        change.removed.forEach(node => this.expandedNodes.delete(node.name));
      }
      this.saveExpansionState();
    });
  }
  private saveExpansionState() {
    localStorage.setItem(this.key, JSON.stringify(Array.from(this.expandedNodes)));
  }
  private loadExpansionState() {
    const savedState = localStorage.getItem(this.key);
    if (savedState) {
      const expandedNodeNames: string[] = JSON.parse(savedState);
      this.expandedNodes = new Set<string>(expandedNodeNames);
      this.expandNodesFromStorage();
    }
  }

  private expandNodesFromStorage() {
    const nodesToExpand = this.treeData.filter(node => this.expandedNodes.has(node.name));
    nodesToExpand.forEach(node => this.treeControl.expand(node));
  }
  getNodeIcon(node: NavNode): string {
    switch (node.route) {
      case '/assets':
        return 'home';
      case '/RFIDRegister':
        return 'storage';
      case '/all-tags':
        return 'label';
      case '/Existing-Tags':
        return 'label_off';
      case '/create-tag':
        return 'feed';
      case '/RFIDGate':
        return 'sensors';
      case '/RFIDGateReport':
        return 'summarize';
      case '/category-tag':
        return 'category';
      case '/condition-tag':
        return 'verified';
      case '/location-tag':
        return 'room';
      case '/disposal-tag':
        return 'remove_circle-outline';
      case '/brand-tag':
        return 'description';
      case '/createCategory':
        return 'create';
      case '/all-devices':
        return 'devices';
      case '/automations':
        return 'motion_photos_auto';
      case '/control-zones':
        return 'radar';
      case '/e-gov':
        return 'business';
      case '/e-govDatabase':
        return 'storage';
      case '/DeviceDaliyReport':
        return 'summarize';
      case '/AllReports':
        return 'report';
      case '/logout':
          return 'remove'
      default:
        return 'icon2';
    }
  }

}
