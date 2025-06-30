import { Component } from '@angular/core';

@Component({
  selector: 'app-three-layer-layout',
  templateUrl: './three-layer-layout.component.html',
  styleUrl: './three-layer-layout.component.scss'
})
export class ThreeLayerLayoutComponent {
  constructor(){
    console.log("Three layer")
  }
  ngOnInit(){
    console.log("oninit")
  }
}
