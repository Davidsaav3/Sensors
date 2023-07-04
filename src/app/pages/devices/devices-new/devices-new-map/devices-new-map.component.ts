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
  selector: 'app-devices-new-map',
  templateUrl: './devices-new-map.component.html',
  styleUrls: ['../../../../app.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class DevicesNewMapComponent implements AfterViewInit, OnDestroy{
  constructor(private rutaActiva: ActivatedRoute,private router: Router,private dataSharingService: DataSharingService) { }

  @ViewChild('map') divMap?: ElementRef;
  sharedLat: any = 38.3855908932305;
  sharedLon: any = -0.5098796883778505;

  public zoom: number = 10;
  public map?: mapboxgl.Map;
  public currentLngLat: mapboxgl.LngLat = new mapboxgl.LngLat(this.sharedLon, this.sharedLat);
  public markers: MarkerAndColor[] = [];
  state= 1;

  id_device: string = 'http://localhost:5172/api/id/device_configurations';
  max_device: string = 'http://localhost:5172/api/max/device_configurations';

  id= parseInt(this.rutaActiva.snapshot.params['id']);
  no_inicia= false;
  max= 1;

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
    lat: 0,
    lon: 0,
    cota: 10,
    timezone: '+01:00',
    organizationid: '',
    enable: 0,
  }

  ngOnInit(): void {
    fetch(this.max_device)
    .then(response => response.json())
    .then(data => {
      this.max= parseInt(data[0].id)+1;    
      console.log(this.id)
      console.log(this.max)
    
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
      this.map?.resize();
    }, 10);
  
  }

  ampliar(){
    this.map?.resize();
  }

  
  create(lon: any, lat: any){
    if ( !this.divMap ) throw 'El elemento HTML no fue encontrado';

      if(this.no_inicia==false){
        this.ngOnDestroy();
        this.map = new mapboxgl.Map({
          container: this.divMap?.nativeElement, // container ID
          style: 'mapbox://styles/mapbox/streets-v12', // style URL
          center: [lon, lat],
          zoom: this.zoom, // starting zoom
      });
      }
      else{
        this.ngOnDestroy();
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
          draggable: false
        }).setLngLat( this.currentLngLat ).addTo( this.map );
        
        setTimeout(() =>{this.flyTo( marker );}, 50);
        console.log(this.currentLngLat)
      }

    return this.map;
  }
  

  updatesharedLat() {
    this.dataSharingService.updatesharedLat(this.sharedLat);
  }
  updatesharedLon() {
    this.dataSharingService.updatesharedLon(this.sharedLon);
  }

  ngAfterViewInit(): void {

    if ( !this.divMap ) throw 'El elemento HTML no fue encontrado';

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => { 
          this.map= this.create(position.coords.longitude, position.coords.latitude);
          this.aux();
        },
        (error) => {
          this.map= this.create(-3.7034137886912504,40.41697654880073);
          console.log("Error al obtener la ubicación:", error);
          this.aux()
        }
      );
    } 
    else {
      this.map= this.create(-3.7034137886912504,40.41697654880073);
      console.log("Geolocalización no compatible con el navegador.");
      this.aux();
    }

    
  }

  aux(){
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
        this.no_inicia= true;
        this.ngAfterViewInit();
      });
  
      let layerList = document.getElementById('menu');
      if (layerList != null) {
        let inputs = layerList.getElementsByTagName('input');
        if (inputs != null) {
          const inputArray = Array.from(inputs); // Convertir a array
          
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
      draggable: false
    })
      .setLngLat( lngLat )
      .addTo( this.map );

    this.markers.push({ color, marker, });
    this.saveToLocalStorage();

    marker.on('dragend', () => this.saveToLocalStorage() );

    this.sharedLat= lngLat.lat;
    this.sharedLon= lngLat.lng;

    this.updatesharedLat();
    this.updatesharedLon();
    // dragend
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

      //this.addMarker( coords, color );
    })

  }


}
