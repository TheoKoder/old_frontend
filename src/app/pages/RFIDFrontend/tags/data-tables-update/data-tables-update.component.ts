import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../services/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-data-tables-update',
  templateUrl: './data-tables-update.component.html',
  styleUrl: './data-tables-update.component.scss'
})
export class DataTablesUpdateComponent implements OnInit{
  itemId: any; 
  itemData: any = {}; 
  itemDataKeys: string[] = []; 
  theItemType:any;

  constructor(private route: ActivatedRoute, private api: ApiService, private http:HttpClient) { }

  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('id');
    this.theItemType =this.route.snapshot.paramMap.get('type');
    this.api.getApiLaravel(`show/${this.theItemType}/${this.itemId}`).subscribe((data: any) => {
    this.itemData = data;
    this.itemDataKeys = Object.keys(this.itemData).slice(1); 
  });
  }
onSubmit() {
  console.log(this.itemData)
  console.log(this.theItemType)
  const itemId = this.itemId
  const requestData = {
    ...this.itemData,
    itemTypeId: itemId 
  };
  this.api.putApiLaravel(`updateData/${this.theItemType}`,requestData).subscribe(response =>{
    console.log(response);
  },error =>{
    console.log(error)
  })
  }
}
