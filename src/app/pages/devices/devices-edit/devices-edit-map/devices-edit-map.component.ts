import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, Injectable,Renderer2  } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataSharingService } from '../../../../services/data_sharing.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

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
  currentLngLat: mapboxgl.LngLat= new mapboxgl.LngLat(this.sharedLon, this.sharedLat);

  constructor(private rutaActiva: ActivatedRoute,private router: Router,private dataSharingService: DataSharingService,private renderer: Renderer2) {
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
  id_device: string = 'http://localhost:5172/api/id/device_configurations';
  id= parseInt(this.rutaActiva.snapshot.params['id']);

  zoom: number = 10;
  map?: mapboxgl.Map;
  markers: MarkerAndColor[] = [];
  no_inicia= false;
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

  ngOnInit(): void { // Inicializador
    this.dataSharingService.sharedLat$.subscribe(data => {
      this.sharedLat = data;
    });
    this.dataSharingService.sharedLon$.subscribe(data => {
      this.sharedLon = data;
    });
    this.currentLngLat= new mapboxgl.LngLat(this.sharedLon, this.sharedLat);

    setInterval(() => {
      this.map?.resize();
    }, 10);
  }

  recargar(){ // 
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
    this.map?.resize();
  }

  updatesharedLat() {
    this.dataSharingService.updatesharedLat(this.sharedLat);
  }
  updatesharedLon() {
    this.dataSharingService.updatesharedLon(this.sharedLon);
  }

  create(){
    if ( !this.divMap ) throw 'El elemento HTML no fue encontrado';

    if(this.no_inicia==false){
      this.ngOnDestroy();
      this.map = new mapboxgl.Map({
        container: this.divMap.nativeElement,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: this.currentLngLat,
        zoom: this.zoom,
      });
      this.currentLngLat= new mapboxgl.LngLat(this.sharedLon, this.sharedLat);
      this.createMarker(this.currentLngLat);

      return this.map;
    }
    else{
      this.ngOnDestroy();
      this.map = new mapboxgl.Map({
        container: this.divMap.nativeElement,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: this.currentLngLat,
        zoom: this.zoom,
      });
      return this.map;
    }
  }

  ngAfterViewInit(): void {
    this.map= this.create();

    this.mapListeners();
    //this.sharedLon)
    this.currentLngLat= new mapboxgl.LngLat(this.sharedLon,this.sharedLat);
    //console.log(this.currentLngLat)
    const marker = new mapboxgl.Marker({
      color: '#0dcaf0',
      draggable: false
    }).setLngLat( this.currentLngLat ).addTo( this.map );

    setTimeout(() =>{this.flyTo( marker );}, 50);
    //console.log(this.currentLngLat)
    //this.readFromLocalStorage();
    this.map.addControl(
      new mapboxgl.GeolocateControl({
      positionOptions: {
      enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true
      })
    );
    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('click', (e) => {
      this.createMarker(e.lngLat.wrap());
      this.ngAfterViewInit();
      this.no_inicia= true;
    });

    let layerList = document.getElementById('menu');
    if (layerList != null) {
      let inputs = layerList.getElementsByTagName('input');
      if (inputs != null) {
        const inputArray = Array.from(inputs);
        
        for (const input of inputArray) {
          input.onclick = (layer: any) => {
            const layerId = layer.target.id;
            if (this.map != null) {
              this.map.setStyle('mapbox://styles/mapbox/' + layerId);
            }
          };
          
        }
      }
    }

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
      draggable: false
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
  }

  deleteMarker( index: number ) {
    this.markers[index].marker.remove();
    this.markers= [];
    this.dataSharingService.updatesharedLat('');
    this.dataSharingService.updatesharedLon('');
  }

  flyTo( marker: mapboxgl.Marker ) {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    });
  }

  saveToLocalStorage() {
    /*const plainMarkers: PlainMarker[] = this.markers.map( ({ color, marker }) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    });
    localStorage.setItem('plainMarkers', JSON.stringify( plainMarkers ));*/
  }

  readFromLocalStorage() {
    /*const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse( plainMarkersString ); //! OJO!
    plainMarkers.forEach( ({ color, lngLat }) => {
      const [ lng, lat ] = lngLat;
      const coords = new mapboxgl.LngLat( lng, lat );
      //this.addMarker( coords, color );
    })*/
  }


}