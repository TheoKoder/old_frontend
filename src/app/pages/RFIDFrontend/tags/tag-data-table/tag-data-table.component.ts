import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { TagCreateDataTableComponent } from '../tag-create-data-table/tag-create-data-table.component';

@Component({
  selector: 'app-tag-data-table',
  templateUrl: './tag-data-table.component.html',
  styleUrl: './tag-data-table.component.scss'
})
export class TagDataTableComponent implements OnInit {

  itemTypes: any;
  itemTypesHeaders: any;
  itemConditions:any;
  itemConditionsHeaders:any;
  itemBrands:any;
  locations:any;
  selectedTable: any;
  
  tableNames:any = {
    itemTypes: 'Category',
    itemConditions: 'Conditions',
    itemBrands: 'Brands',
    locations: 'Location'
  };

  constructor(private api:ApiService ,private formBuilder: FormBuilder,private router:Router, private dialog:MatDialog){}
  ngOnInit(): void {
  this.selectedTable = 'itemTypes';
   this.loadData();
  }
  loadData(){
    this.api.getApiLaravel('create-tag').subscribe((data:any)=>{
      this.itemTypes = data.itemTypes;
      this.itemTypesHeaders = Object.keys(this.itemTypes[0]);
      this.itemConditions= data.itemConditions;
      this.itemConditionsHeaders = Object.keys(this.itemConditions[0]);
      this.itemBrands = data.itemBrands;
      this.locations = data.locations;
      console.log(this.itemTypes)
    });
  }

  objects(obj:any): any[] {
    return Object.entries(obj)
    }
    formData: any;
    createRecord(arg0: string,arg1: any) {
    throw new Error('Method not implemented.');
    }
    delete(arg0: any) {
    throw new Error('Method not implemented.');
    }
    update(arg0: any) {
    throw new Error('Method not implemented.');
    }
}
