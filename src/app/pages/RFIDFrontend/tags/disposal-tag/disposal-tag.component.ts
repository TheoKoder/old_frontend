import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-disposal-tag',
  templateUrl: './disposal-tag.component.html',
  styleUrl: './disposal-tag.component.scss'
})
export class DisposalTagComponent implements OnInit{
disposalHeaders: any;
disposal: any;
type = 'disposal';
constructor(private api:ApiService, private router:Router){}

ngOnInit(): void {
 this.loadItems();
}
delete(disposalId: any) {
  this.api.deleteLaravel(`deleteData/${this.type}/${disposalId}`).subscribe(response =>{
    this.router.navigate(['/condition-tag']);
   },error =>{
    console.log(error)
   });
}
  update(disposalId: any) {
    this.router.navigate(['/update',this.type, disposalId]);
}
loadItems(){
  this.api.getApiLaravel('create-tag').subscribe((data: any) => {
    this.disposal = data.disposals;
    const keys = Object.keys(this.disposal[0]);
    const columnToSkip = 'disposalId';
    this.disposalHeaders = keys.filter(key => key !== columnToSkip);
    console.log(this.disposal)
  });
}
}
