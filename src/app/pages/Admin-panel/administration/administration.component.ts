import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrl: './administration.component.scss',
})
export class AdministrationComponent {
  csvReport='[]';

  constructor(private api: ApiService, private bar:SnackbarService) {}
  onLaptop() {
    this.loadLaptopList('laptopList');
  }
  onLaptopTags(){
    this.loadLaptopList('laptopListTag');
  }
  onLaptopDevice(){
    this.loadLaptopList('laptopListDeviceData');
  }
  onLaptopDeviceTags(){
    this.loadLaptopList('laptopListDeviceDataTag');
  }
  private loadLaptopList(url:string) {
    this.api.getApiLaravel(url).subscribe(
      (data: any) => {
        console.log(data)
        this.csvReport = JSON.parse(data.data);
        console.log(this.csvReport)
        this.generateCSV();
        this.bar.openSnackbar('complete','')
      },
      (error: any) => {}
    );
  }
  generateCSV(): void {
    console.log(this.csvReport.length)
    if (!(this.csvReport && this.csvReport.length > 0)) {
      console.error('No data available for the CSV report.');
      return;
    }
    let csvContent =this.convertToCSV(this.csvReport)
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `laptopList.csv`
    );
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
  }
  private convertToCSV(arr:any) {
    const array = [Object.keys(arr[0])].concat(arr)
  
    return array.map(it => {
      return Object.values(it).toString()
    }).join('\n')
  }
}
