import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-tag',
  templateUrl: './create-tag.component.html',
  styleUrl: './create-tag.component.scss'
})
export class CreateTagComponent implements OnInit {
selectedDate: any;
itemTypes:any;
itemConditions:any;
itemBrands:any;
locations:any;
disposal:any;
updateForm!: FormGroup;
  constructor(private api:ApiService,private formBuilder: FormBuilder){}
  ngOnInit(): void {
    this.loadItems();
    this.Form();
  }
  loadItems(){
    this.api.getApiLaravel('create-tag').subscribe((data:any)=>{
      this.itemTypes = data.itemTypes;
      this.itemConditions= data.itemConditions;
      this.itemBrands = data.itemBrands;
      this.locations = data.locations;
      this.disposal = data.disposals;
      console.log(this.disposal);
    });
  }
  Form(): void {
    this.updateForm = this.formBuilder.group({
      name: [null, Validators.required],
      itemSerialNumber: [null, Validators.required],
      itemDescription: [null, Validators.required],
      purchaseDate: [null, Validators.required], 
      purchasePrice: [null, Validators.required],
      itemTypeId: [null, Validators.required],
      itemConditionId: [null, Validators.required],
      itemBrandId: [null, Validators.required],
      locationId: [null, Validators.required],
      disposalId:[null,Validators.required]
    });
  }
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  onSubmit() {
    if (this.updateForm.valid) { 
      const formData = this.updateForm.value; 
      formData.purchaseDate = this.formatDate(new Date(formData.purchaseDate));
      this.api.postLaravel('AllItems/create', formData).subscribe(response => {
        console.log(response);
      });
      console.log(formData); 
    } else {
      console.error('Form is invalid', this.updateForm.errors);
      for (const control in this.updateForm.controls) {
        if (this.updateForm.controls.hasOwnProperty(control)) {
          console.error(control, this.updateForm.controls[control].errors);
        }
      }
    }
  }

}
