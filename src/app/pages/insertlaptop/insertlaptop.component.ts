import { th } from 'date-fns/locale';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insertlaptop',
  templateUrl: './insertlaptop.component.html',
  styleUrl: './insertlaptop.component.scss'
})
export class InsertlaptopComponent {
  laptopForm!: FormGroup;
  searchTerm: string = '';

  constructor(private fb: FormBuilder, private api: ApiService, private router:Router) { }

  ngOnInit(): void {
    this.laptopForm = this.fb.group({
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
    // if (this.laptopForm.invalid) {
    //   this.laptopForm.markAllAsTouched();
    //   return;
    // }

    const formData = this.laptopForm.value;
    this.api.postLaravel('laptops', formData).subscribe(
      response => {
        console.log(formData)
        console.log('Success:', response);
       this.router.navigate(['laptopList'])
      },
      error => {
        console.log('Error:', error);
      }
    );
  }
}
