import { Component, Input, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';


export interface mapData {
  type: string;
}

export class radiusData implements mapData {
  type: string = "radius";
  id!: string;
  longitude!: number;
  latitude!: number;
  color!: string;
  radius!: number;
}

export class markerData implements mapData {
  type: string = "marker";
  longitude: number = environment.Map.centerLng;
  latitude: number = environment.Map.centerLat;
}



@Component({
  selector: 'sp-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {

  @Input() centerLat: number = 0;
  @Input() centerLng: number = 0;
  @Input() mapData!: mapData;
  markerCount: number = 0;

  map: mapboxgl.Map | undefined;
  style = 'mapbox://styles/mapbox/streets-v11';
  mainData: mapboxgl.AnySourceData = {
    type: 'geojson',
    // Use a URL for the value for the `data` property.
    data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson'
  }
  mainLayer: mapboxgl.AnyLayer = {
    'id': 'earthquakes-layer',
    'type': 'circle',
    'source': 'earthquakes',
    'paint': {
      'circle-radius': 4,
      'circle-stroke-width': 2,
      'circle-color': 'red',
      'circle-stroke-color': 'white'
    }
  }
  pointLayer: mapboxgl.AnyLayer = {
    'id': 'points',
    'type': 'symbol',
    'source': 'point', // reference the data source
    'layout': {
      'icon-image': 'cat', // reference the image
      'icon-size': 0.25
    }
  }



  ngOnInit(): void {
    console.log("in map ngoninit" + this.mapData.type)
    this.create();

   
    //this.addRadius("1",28.1121857455,-25.9450622822,"#000000",300)
    // this.loadLayers();
    // const marker1 = new mapboxgl.Marker()
    //   .setLngLat([environment.Map.centerLng, environment.Map.centerLat])
    //   .setPopup(new mapboxgl.Popup().setHTML("<h1>Hello World!</h1>"))
    //   .addTo(this.map);
  }

  getCanvas(): HTMLCanvasElement{
    return this.map!.getCanvas()
  }

  resize(){
    this.map!.resize()
  }
  create(){
    switch (this.mapData.type) {
      case "radius": {
        console.log("in radius section");
        let rd: radiusData = this.mapData as radiusData;
        this.createMap(rd.longitude, rd.latitude)
        this.addRadius(rd.id, rd.longitude, rd.latitude, rd.color, rd.radius)
        this.disable();
        //console.log(rd.longitude + ":" + rd.latitude)
        //this.addRadius("1",28.1121857455,-25.9450622822,"#000000",300)
        break;
      }
      case "marker": {
        console.log("in marker section");
        let md: markerData = this.mapData as markerData;
        this.createMap(md.longitude, md.latitude)
      }
    }
    this.map!.resize()
  }

  createMap(centerLng: number, centerLat: number) {

    this.map = new mapboxgl.Map({
      accessToken: environment.Map.accessToken,
      container: 'map',
      style: this.style,
      zoom: 5,
      center: [centerLng, centerLat],
      preserveDrawingBuffer: true
    });
    

  }

  addMarker(Lng: number, Lat: number, desc: string) {
    console.log("calling addmarker " + desc)
    const popup = new mapboxgl.Popup({ offset: 25 }).setText(desc);

    const marker1 = new mapboxgl.Marker()
      .setLngLat([Lng, Lat])
      .setPopup(popup)
      .addTo(this.map!);
    this.markerCount = this.markerCount + 1
    console.log("NUmber of Markers " + this.markerCount)
    //this.countVisibleMarkers(this.map!);
  }

  addMarkerHTML(Lng: number, Lat: number, html: string) {
    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(html);

    const marker1 = new mapboxgl.Marker()
      .setLngLat([Lng, Lat])
      .setPopup(popup)
      .addTo(this.map!);
    this.markerCount = this.markerCount + 1
    console.log("NUmber of Markers " + this.markerCount)
    //this.countVisibleMarkers(this.map!);
  }

  countVisibleMarkers(_map: mapboxgl.Map) {
    var bounds = _map.getBounds();
    var count = 0;

    _map.getStyle().layers.map(l => { console.log(l.id + ":" + l.type) })
    //_map.getStyle().layers.filter(i => i.type === 'myTileSource')
    // map.eachLayer(function(layer) {
    //     if (layer instanceof L.Marker) {
    //         if (bounds.contains(layer.getLatLng())) count++;
    //      }
    // });
    return count;
  }

  private errorImage(error: any, image: any) {
    if (error) throw error;
    this.map?.addImage('cat', image);
  }

  private loadLayers() {
    this.map?.on('load', () => {
      //this.map?.loadImage('https://docs.mapbox.com/mapbox-gl-js/assets/cat.png',this.errorImage)
      this.map?.addSource('earthquakes', this.mainData);
      this.map?.addLayer(this.mainLayer)
      this.map?.on('click', (e) => {
        console.log(e);
      })
      //this.map?.addLayer(this.pointLayer);
    })
  }
  private addRadius(id: string, longitude: number, latitude: number, color: string, radius: number) {
    //console.log("addRadius " + ":" + id + ":" + longitude +":"+ latitude + ":" +color + ":" + radius)
    this.map!.on('load', () => {
      this.map!.addSource(id, {
        type: 'geojson',
        data: {
          "type": "FeatureCollection",
          "features": [{
            "type": "Feature",
            "properties": {

            },
            "geometry": {
              "type": "Point",
              "coordinates": [
                longitude,
                latitude
              ]
            }
          }]
        }
      });

      this.map!.addLayer({
        'id': id,
        'type': 'circle',
        'source': id,
        'paint': {
          'circle-color': color,
          'circle-radius': radius,
          "circle-opacity": 0.5
        },

      });

    });
  }
  private disable() {
    this.map!.scrollZoom.disable(); // Disable scroll zoom
    this.map!.boxZoom.disable(); // Disable box zoom
    this.map!.dragRotate.disable(); // Disable drag to rotate
    this.map!.dragPan.disable(); // Disable drag to pan
    this.map!.keyboard.disable(); // Disable keyboard navigation
    this.map!.doubleClickZoom.disable(); // Disable double click to zoom
    this.map!.touchZoomRotate.disable(); // Disable pinch to zoom/rotatemap.scrollZoom.disable(); // Disable scroll zoom
    this.map!.boxZoom.disable(); // Disable box zoom
    this.map!.dragRotate.disable(); // Disable drag to rotate
    this.map!.dragPan.disable(); // Disable drag to pan
    this.map!.keyboard.disable(); // Disable keyboard navigation
    this.map!.doubleClickZoom.disable(); // Disable double click to zoom
    this.map!.touchZoomRotate.disable(); // Disable pinch to zoom/rotate
  }
}
