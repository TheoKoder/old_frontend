import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-egov-database',
  //standalone: true,
  //imports: [],
  templateUrl: './egov-database.component.html',
  styleUrl: './egov-database.component.scss'
})
export class EGovDatabaseComponent implements OnInit {
  LaptopData!: any[];
  SearchParams: string = '';
  itemCount:any;
  page: number = 1;
  page_size:number=10;
  totalPages!: number;
  constructor(private service:ApiService,private _snackbar: SnackbarService){}
  ngOnInit(): void {
   this.loadItems();
  //  this.search();
  }
  loadItems(){
    this.service.getApiKot('e-gov',{page:this.page,page_size:this.page_size}).subscribe((data: any) => {
      this.LaptopData = data.egov;
      this.itemCount = data.count;
      this.calculateTotalPages();
      console.log(this.itemCount);
      console.log(this.LaptopData);
    },error=>{
      this._snackbar.openSnackbar("Error loading server, please try again later", error);
    });
  }
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.itemCount / this.page_size);
  }
  nextPage(){
      this.page++;
      this.loadItems();
  }
  previousPage(){
    if(this.page>1){
      this.page--;
      this.loadItems();
    }
  }
  search() {
    this.service.getApiKot('e-gov',{page:1,page_size:this.itemCount,search:this.SearchParams}).subscribe((data:any)=>{
      this.LaptopData = data.egov;
    },error=>{
      this._snackbar.openSnackbar("Error loading server, please try again later", error);
    });
}
}
