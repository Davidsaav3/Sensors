import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, Injectable,Renderer2  } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { ActivatedRoute } from '@angular/router';
import { DataSharingService } from '../../../../services/data_sharing.service';

interface MarkerAndColor {
  color: string;
  marker: mapboxgl.Marker;
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

  constructor(private rutaActiva: ActivatedRoute,private dataSharingService: DataSharingService,private renderer: Renderer2) {
    this.dataSharingService.sharedLat$.subscribe(data => {
      this.sharedLat = data;
    });
    this.dataSharingService.sharedLon$.subscribe(data => {
      this.sharedLon = data;
    }); 
    setTimeout(() => { this.currentLngLat= new mapboxgl.LngLat(this.sharedLon, this.sharedLat);}, 50);
   }

  @ViewChild('map') divMap?: ElementRef;
  id_device: string = 'http://localhost:5172/api/id/device_configurations';
  id= parseInt(this.rutaActiva.snapshot.params['id']);

  zoom: number = 10;
  map?: mapboxgl.Map;
  markers: MarkerAndColor[] = [];
  start= false;

  ngOnInit(): void { // Inicializador
    this.dataSharingService.sharedLat$.subscribe(data => {
      this.sharedLat = data;
    });
    this.dataSharingService.sharedLon$.subscribe(data => {
      this.sharedLon = data;
    });
    this.currentLngLat= new mapboxgl.LngLat(this.sharedLon, this.sharedLat);
    setInterval(() => {
      if(this.map!=undefined)
        this.map.resize();
    }, 50);
  }

  ngAfterViewInit(): void { // Despues de ngOnInit
    this.map= this.createMap();
    this.currentLngLat= new mapboxgl.LngLat(this.sharedLon,this.sharedLat);
    const marker = new mapboxgl.Marker({
      color: '#0dcaf0',
      draggable: false
    }).setLngLat( this.currentLngLat ).addTo( this.map );

    setTimeout(() =>{this.flyTo( marker );}, 50);

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
      this.start= true;
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

  updatesharedLat() { // Actualizar Latitud
    this.dataSharingService.updatesharedLat(this.sharedLat);
  }
  updatesharedLon() { // Actualizar Longitud
    this.dataSharingService.updatesharedLon(this.sharedLon);
  }

  createMap(){
    if ( !this.divMap ) throw 'No hay mapa';

    if(this.start==false){
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

  ngOnDestroy(): void { // Eliminar mapa
    this.map?.remove();
  }

  createMarker(marker: mapboxgl.LngLat) { // Crear chincheta 1
    if ( !this.map ) return;
    const color= '#0dcaf0';
    const lngLat = marker;
    this.addMarker( lngLat, color );
  }

  addMarker( lngLat: mapboxgl.LngLat, color: string ) { // Crear chincheta 2
    if ( !this.map ) return;

    this.markers = [];
    this.markers.splice( 0, 1 );
    const marker = new mapboxgl.Marker({
      color: '#0dcaf0',
      draggable: false
    })
    .setLngLat( lngLat )
    .addTo( this.map );

    this.markers.push({ color, marker, });
    this.sharedLat= lngLat.lat;
    this.sharedLon= lngLat.lng;

    this.updatesharedLat();
    this.updatesharedLon();
  }

  deleteMarker( index: number ) { // Eliminar chincheta
    this.markers[index].marker.remove();
    this.markers= [];
    this.dataSharingService.updatesharedLat('');
    this.dataSharingService.updatesharedLon('');
  }

  flyTo( marker: mapboxgl.Marker ) { // Ir a un punto del mapa
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    });
  }
}