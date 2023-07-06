import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-devices-new-map',
  templateUrl: './devices-new-map.component.html',
  styleUrls: ['../../../../app.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class DevicesNewMapComponent implements AfterViewInit, OnDestroy{
  constructor(private rutaActiva: ActivatedRoute,private dataSharingService: DataSharingService) { }

  @ViewChild('map') divMap?: ElementRef;
  id_device: string = 'http://localhost:5172/api/id/device_configurations';
  max_device: string = 'http://localhost:5172/api/max/device_configurations';

  sharedLat: any = 38.3855908932305;
  sharedLon: any = -0.5098796883778505;
  public zoom: number = 10;
  public map?: mapboxgl.Map;
  public currentLngLat: mapboxgl.LngLat = new mapboxgl.LngLat(this.sharedLon, this.sharedLat);
  public markers: MarkerAndColor[] = [];
  state= 1;
  id= parseInt(this.rutaActiva.snapshot.params['id']);
  start= false;
  max= 1;
  
  ngOnInit(): void { // Inicializador
    fetch(this.max_device)
    .then(response => response.json())
    .then(data => {
      this.max= parseInt(data[0].id)+1;    
      if(this.id<this.max){
        this.state= 1;
      }
      if(this.id>=this.max){
        this.state= 0;
      }
    })
    this.dataSharingService.sharedLat$.subscribe(data => {
      this.sharedLat = data;
    });
    this.dataSharingService.sharedLon$.subscribe(data => {
      this.sharedLon = data;
    });
    setInterval(() => {
      if (this.map) 
        this.map.resize();
    }, 50);
  }

  showMap(){ // Redimesiona mapa
    if (this.map)
      this.map.resize();
  }

  createMap(lon: any, lat: any){ // Crear mapa
    if ( !this.divMap ) throw 'No hay mapa';

      if(this.start==false){
        this.ngOnDestroy();
        this.map = new mapboxgl.Map({
          container: this.divMap?.nativeElement,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [lon, lat],
          zoom: this.zoom,
      });
      }
      else{
        this.ngOnDestroy();
        this.map = new mapboxgl.Map({
          container: this.divMap.nativeElement, 
          style: 'mapbox://styles/mapbox/streets-v12', 
          center: this.currentLngLat,
          zoom: this.zoom,
        });

        this.mapListeners();
        this.currentLngLat= new mapboxgl.LngLat(this.sharedLon,this.sharedLat);
        const marker = new mapboxgl.Marker({
          color: '#0dcaf0',
          draggable: false
        }).setLngLat( this.currentLngLat ).addTo( this.map );
      
        setTimeout(() =>{this.flyTo( marker );}, 50);
      }
    return this.map;
  }
  
  updatesharedLat() { // Actualizar Latitud
    this.dataSharingService.updatesharedLat(this.sharedLat);
  }
  updatesharedLon() { // ctualizar Longitud
    this.dataSharingService.updatesharedLon(this.sharedLon);
  }

  ngAfterViewInit(): void { // Despues de ngOnInit
    if ( !this.divMap ) throw 'No hay mapa';
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => { 
          this.map= this.createMap(position.coords.longitude, position.coords.latitude);
          this.auxInit();
        },
        (error) => {
          this.map= this.createMap(-3.7034137886912504,40.41697654880073);
          console.log("Error geo", error);
          this.auxInit()
        }
      );
    } 
    else {
      this.map= this.createMap(-3.7034137886912504,40.41697654880073);
      console.log("Geo no compatible");
      this.auxInit();
    }
  }

  auxInit(){ // Auxiliar de ngAfterViewInit
    if(this.map!=undefined){
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
        this.start= true;
        this.ngAfterViewInit();
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
  }

  ngOnDestroy(): void { // Destructor del mapa
    this.map?.remove();
  }

  mapListeners() { // Zoom y Move del mapa
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

  /* /////////////////////////// */

  createMarker(marker: mapboxgl.LngLat) { // Añade chincheta 1
    if ( !this.map ) return;
    const color= '#0dcaf0';
    const lngLat = marker;
    this.addMarker( lngLat, color );
  }

  addMarker( lngLat: mapboxgl.LngLat, color: string ) { // Añade chincheta 2
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
    this.saveStorage();

    marker.on('dragend', () => this.saveStorage() );
    this.sharedLat= lngLat.lat;
    this.sharedLon= lngLat.lng;
    this.updatesharedLat();
    this.updatesharedLon();
  }

  deleteMarker( index: number ) { // Quita chincheta
    this.markers[index].marker.remove();
    this.markers= [];
    this.dataSharingService.updatesharedLat('');
    this.dataSharingService.updatesharedLon('');
  }

  flyTo( marker: mapboxgl.Marker ) { // Va a una localización
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    });
  }

  saveStorage() { // Guarda datos
    const plainMarkers: PlainMarker[] = this.markers.map( ({ color, marker }) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    });
    localStorage.setItem('plainMarkers', JSON.stringify( plainMarkers ));
  }

  readStorage() { // Recupera datos
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse( plainMarkersString );
    plainMarkers.forEach( ({ color, lngLat }) => {
      const [ lng, lat ] = lngLat;
      const coords = new mapboxgl.LngLat( lng, lat );
    })
  }
}
