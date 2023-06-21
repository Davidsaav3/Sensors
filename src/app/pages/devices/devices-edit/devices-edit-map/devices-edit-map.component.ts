import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataSharingService } from '../../../../services/data_sharing.service';

interface MarkerAndColor {
  color: string;
  marker: mapboxgl.Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[]
}

(mapboxgl as any).accessToken= 'pk.eyJ1IjoiZGF2aWRzYWF2MyIsImEiOiJjbGl1cmZ4NG8wMTZqM2ZwNW1pcW85bGo4In0.ye1F3KfhnRZruosNYoAYYQ';

@Component({
  selector: 'app-devices-edit-map',
  templateUrl: './devices-edit-map.component.html',
  styleUrls: ['../../../../app.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class DevicesEditMapComponent implements AfterViewInit, OnDestroy{

  sharedLat: any = 38.3855908932305;
  sharedLon: any = -0.5098796883778505;
  public currentLngLat: mapboxgl.LngLat= new mapboxgl.LngLat(this.sharedLon, this.sharedLat);

  constructor(private rutaActiva: ActivatedRoute,private router: Router,private dataSharingService: DataSharingService) {
    this.dataSharingService.sharedLat$.subscribe(data => {
      this.sharedLat = data;
    });
    this.dataSharingService.sharedLon$.subscribe(data => {
      this.sharedLon = data;
    }); 
    //this.recargar()
    setTimeout(() => { this.currentLngLat= new mapboxgl.LngLat(this.sharedLon, this.sharedLat);}, 50);
   }

  @ViewChild('map') divMap?: ElementRef;
  public zoom: number = 10;
  public map?: mapboxgl.Map;
  public markers: MarkerAndColor[] = [];
  id_device: string = 'http://localhost:5172/api/id/device_configurations';
  id= parseInt(this.rutaActiva.snapshot.params['id']);

  id_actual= 1;
  contenido = {    
    id: '',    
    uid: '',    
    alias: '', 
    origin: '',
    description_origin: '',
    application_id: '',
    topic_name: '',
    typemeter: '',
    lat: 1,
    lon: 1,
    cota: 10,
    timezone: '+01:00',
    organizationid: '',
    enable: 0,
  }

  ngOnInit(): void {
    this.dataSharingService.sharedLat$.subscribe(data => {
      this.sharedLat = data;
    });
    this.dataSharingService.sharedLon$.subscribe(data => {
      this.sharedLon = data;
    });
    this.currentLngLat= new mapboxgl.LngLat(this.sharedLon, this.sharedLat);
  }

  recargar(){
    const id_actual= this.rutaActiva.snapshot.params['id']
    fetch(`${this.id_device}/${id_actual}`)
    .then(response => response.json())
    .then(data => {
      this.contenido= data;
      this.sharedLat= data[0].lat;
      this.sharedLon= data[0].lon;
      this.currentLngLat= new mapboxgl.LngLat(this.sharedLon, this.sharedLat);
    })
    .catch(error => {
      console.error(error); 
    });
  }

  ampliar(){
    console.log('HOLA');
    this.map?.resize();
  }

  updatesharedLat() {
    this.dataSharingService.updatesharedLat(this.sharedLat);
  }
  updatesharedLon() {
    this.dataSharingService.updatesharedLon(this.sharedLon);
  }

  ngAfterViewInit(): void {

    if ( !this.divMap ) throw 'El elemento HTML no fue encontrado';

    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat,
      zoom: this.zoom, // starting zoom
    });

    this.mapListeners();
    console.log(this.sharedLon)
    this.currentLngLat= new mapboxgl.LngLat(this.sharedLon,this.sharedLat);
    console.log(this.currentLngLat)
    const marker = new mapboxgl.Marker({
      color: '#0dcaf0',
      draggable: true
    }).setLngLat( this.currentLngLat ).addTo( this.map );

    setTimeout(() =>{this.flyTo( marker );}, 50);
    console.log(this.currentLngLat)
    //this.readFromLocalStorage();

    
    this.map.addControl(
      new mapboxgl.GeolocateControl({
      positionOptions: {
      enableHighAccuracy: true
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true
      })
    );
    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('click', (e) => {
      this.createMarker(e.lngLat.wrap());
    });



    // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML = 'Fernando Herrera'
    // const marker = new Marker({
    //   // color: 'red',
    //   element: markerHtml
    // })
    //   .setLngLat( this.currentLngLat )
    //   .addTo( this.map );
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListeners() {
    if ( !this.map ) throw 'Mapa no inicializado';

    this.map.on('zoom', (ev) => {
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (ev) => {
      if ( this.map!.getZoom() < 18 ) return;
      this.map!.zoomTo(18);
    });

    this.map.on('move', () => {
      this.currentLngLat = this.map!.getCenter();
    });

  }

  zoomIn() {
    this.map?.zoomIn();
  }

  zoomOut() {
    this.map?.zoomOut();
  }

  zoomChanged( value: string ) {
    this.zoom = Number(value);
    this.map?.zoomTo( this.zoom );
  }

  /* /////////////////////////// */

  createMarker(marker: mapboxgl.LngLat) {
    if ( !this.map ) return;

    //const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const color= '#0dcaf0';
    const lngLat = marker;
    this.addMarker( lngLat, color );
  }


  addMarker( lngLat: mapboxgl.LngLat, color: string ) {
    if ( !this.map ) return;

    this.markers = [];
    //this.markers[0].marker.remove();
    this.markers.splice( 0, 1 );

    const marker = new mapboxgl.Marker({
      color: '#0dcaf0',
      draggable: true
    })
      .setLngLat( lngLat )
      .addTo( this.map );

    this.markers.push({ color, marker, });
    //this.saveToLocalStorage();

    //marker.on('dragend', () => this.saveToLocalStorage() );

    this.sharedLat= lngLat.lat;
    this.sharedLon= lngLat.lng;

    this.updatesharedLat();
    this.updatesharedLon();
    // dragend
  }

  deleteMarker( index: number ) {
    this.markers[index].marker.remove();
    this.markers.splice( index, 1 );
  }

  flyTo( marker: mapboxgl.Marker ) {

    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    });

  }


  saveToLocalStorage() {
    const plainMarkers: PlainMarker[] = this.markers.map( ({ color, marker }) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    });

    localStorage.setItem('plainMarkers', JSON.stringify( plainMarkers ));

  }

  readFromLocalStorage() {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse( plainMarkersString ); //! OJO!

    plainMarkers.forEach( ({ color, lngLat }) => {
      const [ lng, lat ] = lngLat;
      const coords = new mapboxgl.LngLat( lng, lat );

      this.addMarker( coords, color );
    })

  }


}