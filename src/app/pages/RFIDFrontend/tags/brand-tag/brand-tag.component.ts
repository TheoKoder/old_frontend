import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brand-tag',
  templateUrl: './brand-tag.component.html',
  styleUrl: './brand-tag.component.scss'
})
export class BrandTagComponent implements OnInit{

  itemBrands: any;
  itemBrandsHeaders: any;
  type = 'itemBrand';
  constructor(private api:ApiService, private router:Router){}
  ngOnInit(): void {
    this.api.getApiLaravel('create-tag').subscribe((data: any) => {
      this.itemBrands = data.itemBrands;
      const keys = Object.keys(this.itemBrands[0]);
      const columnToSkip = 'itemBrandId';
      this.itemBrandsHeaders = keys.filter(key => key !== columnToSkip);

    });
  }
  delete(itemBrandId: any) {
    
   this.api.deleteLaravel(`deleteData/${this.type}/${itemBrandId}`).subscribe(response =>{
    
   },error =>{

   });
    }
    update(itemBrandId: any) {
      this.router.navigate(['/update',this.type, itemBrandId]);
    }
}
