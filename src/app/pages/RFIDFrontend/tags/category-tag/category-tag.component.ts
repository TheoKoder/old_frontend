import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-tag',
  templateUrl: './category-tag.component.html',
  styleUrl: './category-tag.component.scss'
})
export class CategoryTagComponent implements OnInit {
  itemTypes: any;
  itemTypesHeaders: any;
   type = 'itemType';
  constructor(private api:ApiService, private router:Router){}
  ngOnInit(): void {
    this.api.getApiLaravel('create-tag').subscribe((data: any) => {
      this.itemTypes = data.itemTypes;
      const keys = Object.keys(this.itemTypes[0]);
      const columnToSkip = 'itemTypeId';
      this.itemTypesHeaders = keys.filter(key => key !== columnToSkip);
      
    });
  }
  delete(itemTypeId: any) {
   this.api.deleteLaravel(`deleteData/${this.type}/${itemTypeId}`).subscribe(response =>{
    this.router.navigate(['/category-tag']);
   },error =>{
    console.log(error)
   });
  }

    update(itemTypeId: any) {

      this.router.navigate(['/update',this.type, itemTypeId]);
    }

}
