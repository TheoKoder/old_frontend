import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-laptoplistdata',
  templateUrl: './laptoplistdata.component.html',
  styleUrl: './laptoplistdata.component.scss'
})
export class LaptoplistdataComponent implements OnInit{
  laptopForm!: FormGroup;
  searchTerm: string = '';
  searchActive: boolean = false;

  constructor(private fb: FormBuilder, private api: ApiService,private bar:SnackbarService, private _router:Router) { }

  ngOnInit(): void {
    this.laptopForm = this.fb.group({
      searchTerm: [''], 
      organisationDescription: ['', Validators.required],
      componentDescription: ['', Validators.required],
      postJobTitleDescription: ['', Validators.required],
      businessUnit: ['', Validators.required],
      postStatusDescription: ['', Validators.required],
      postTypeDescription: ['', Validators.required],
      persalNumber: ['', Validators.required],
      surname: ['', Validators.required],
      initials: ['', Validators.required],
      fullNames: ['', Validators.required],
      gender: ['', Validators.required],
      computerName: ['', Validators.required],
      type: ['', Validators.required],
      operatingSystem: ['', Validators.required],
      version: ['', Validators.required],
      serialNumber: ['', Validators.required],
      warrantyStartDate: [''],
      warrantyEndDate: [''],
      location: ['', Validators.required],
      active: [true, Validators.required]
    });
  }

  onSubmit(): void {
    let username = localStorage.getItem('user')
    const searchTerm = this.laptopForm.get('searchTerm')?.value; 
    console.log(searchTerm)
    if (this.laptopForm.invalid) {
      this.laptopForm.markAllAsTouched();
      return;
    }
    const formData = this.laptopForm.value;
    formData.persalNumber = formData.persalNumber ? parseInt(formData.persalNumber, 10).toString() : '';
    formData.active = formData.active === '1' ? 1 : 0;
    if (formData.serialNumber) {
      this.api.putApiLaravel(`laptops/update/${username}/${searchTerm}`, formData).subscribe(
        response => {
          console.log('Update Success:', response);
          this._router.navigate(['laptopList']);
        },
        error => {
          console.log('Error:', error);
        }
      );
    }
  }

  reset(){
    this.laptopForm.get('searchTerm')?.enable();
    this.laptopForm.get('searchButton')?.enable();
    this.laptopForm.reset(); 
  }
  onSearch(): void {
    const searchTerm = this.laptopForm.get('searchTerm')?.value; 
    if (searchTerm) {
      this.api.getApiLaravel(`laptopData/bySerialNo/${searchTerm}`).subscribe(
        data => {
          console.log(data);
          if (data) {
            this.laptopForm.patchValue({
              organisationDescription: data.ORGANISATION_DESCRIPTION,
              componentDescription: data.COMPONENT_DESCRIPTION,
              postJobTitleDescription: data.POST_JOB_TITLE_DESCRIPTION,
              businessUnit: data.BUSINESS_UNIT,
              postStatusDescription: data.POST_STATUS_DESCRIPTION,
              postTypeDescription: data.POST_TYPE_DESCRIPTION,
              persalNumber: data.PERSAL_NUMBER,
              surname: data.SURNAME,
              initials: data.INITIALS,
              fullNames: data.FULL_NAMES,
              gender: data.GENDER,
              computerName: data.COMPUTER_NAME,
              type: data.TYPE,
              operatingSystem: data.OPERATING_SYSTEM,
              version: data.Version,
              serialNumber: data.SERIAL_NUMBER,
              warrantyStartDate: data.WARRANTY_START_DATE,
              warrantyEndDate: data.WARRANTY_END_DATE,
              location: data.LOCATION,
              active: data.active
            });
            this.laptopForm.get('searchTerm')?.disable();
            this.laptopForm.get('searchButton')?.disable();      
          } else {
            this.bar.openSnackbar('Laptop not found','search')
          }
        },
        error => {
          console.error('Error fetching data', error);
        }
      );
    } else {
      this.bar.openSnackbar('Please enter a serial number to search','search')
    }
  }
}

