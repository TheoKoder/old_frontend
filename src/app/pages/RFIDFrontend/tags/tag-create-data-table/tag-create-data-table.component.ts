import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tag-create-data-table',
  templateUrl: './tag-create-data-table.component.html',
  styleUrl: './tag-create-data-table.component.scss'
})
export class TagCreateDataTableComponent implements OnInit{
  
  form: FormGroup = new FormGroup({});
  selectedTable!: string;
  formFields: any;
  constructor(private api:ApiService,private fb: FormBuilder,private router:Router){}
  ngOnInit(): void {
    this.selectedTable = 'itemTypes';
    this.loadItem();
  }
  loadItem(){
    this.api.getApiLaravel('create-tag').subscribe((data: any) => {
      const firstItemType = data[this.selectedTable][0];
      console.log(data)
      const keys = Object.keys(firstItemType);
      this.formFields = keys.length > 1 ? keys.slice(1) : keys;
      if (console && console.log) {
        console.log(this.formFields);
      }
      const formGroupConfig: { [key: string]: any } = {};
      this.formFields.forEach((field: any) => {
        formGroupConfig[field] = [firstItemType[field]]; 
      });
      this.form = this.fb.group(formGroupConfig);
    });
  }


  onSubmit() {

      const formData = { type: this.selectedTable, data: this.form.value };
      console.log(formData)
      this.api.postLaravel(`create-item/${this.selectedTable}`, formData).subscribe(
        response => {
          console.log(response);
          if(this.selectedTable =='itemTypes'){
            this.router.navigate(['/category-tag']);
          }else if(this.selectedTable == 'itemConditions'){
            this.router.navigate(['/condition-tag']);
          }
        },
        error => {
          console.log(error);
        }
      );
    
    
  }
  onTableSelectionChange(): void {
    this.loadItem();
    
  }
}
