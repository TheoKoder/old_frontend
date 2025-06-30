import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-condition-tag',
  templateUrl: './condition-tag.component.html',
  styleUrl: './condition-tag.component.scss'
})
export class ConditionTagComponent implements OnInit{

  itemConditions: any;
  itemConditionsHeaders: any;
  type = 'itemCondition';
  constructor(private api:ApiService, private router:Router){}
  ngOnInit(): void {
    this.api.getApiLaravel('create-tag').subscribe((data: any) => {
      this.itemConditions = data.itemConditions;
      const keys = Object.keys(this.itemConditions[0]);
      const columnToSkip = 'itemConditionId';
      this.itemConditionsHeaders = keys.filter(key => key !== columnToSkip);
    });
  }
  delete(itemConditionId: any) {
    this.api.deleteLaravel(`deleteData/${this.type}/${itemConditionId}`).subscribe(response =>{
      this.router.navigate(['/condition-tag']);
     },error =>{
      console.log(error)
     });
    }
    update(itemConditionId: any) {
      
      this.router.navigate(['/update',this.type, itemConditionId]);
    }
}
