import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseChartDirective } from 'ng2-charts';
import { StackedChartComponent } from './stacked-chart.component';



@NgModule({
  declarations: [
    StackedChartComponent
  ],
  imports: [
    CommonModule,
    BaseChartDirective
  ],
  exports:[
    StackedChartComponent
  ]
})
export class GraphModule { }
