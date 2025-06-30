import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asset-view-test-page',
  templateUrl: './asset-view-test-page.component.html',
  styleUrls: ['./asset-view-test-page.component.scss'] // Fixed typo from `styleUrl` to `styleUrls`
})
export class AssetViewTestPageComponent implements OnInit {
  assetData = {
    asset_description: 'Laptop',
    asset_class: 'Electronics',
    inventory_number: '12345',
    serial_number: 'SN123456',
    purchase_price: 1200,
    location_code: 'L001',
    building_location: 'Building A, Floor 2',
    capitalisation_date: '2020-01-15',
    inventory_date: '2020-05-20',
    asset_condition: 'New',
    barcode: 'ABC123456',
    normal_gpn_asset: 'Yes',
    tagged: 'Yes'
  };

  isAssetDialog: boolean = false; // Correct naming and initial state

  ngOnInit(): void {
    console.log('Asset View Test Page Initialized');
  }

  showDialog(): void {
    console.log('Show Dialog Clicked');
    this.isAssetDialog = true;
  }

  hideDialog(): void {
    console.log('Hide Dialog Clicked');
    this.isAssetDialog = false;
  }
}
