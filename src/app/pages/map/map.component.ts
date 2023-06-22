import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Router } from '@angular/router';

interface MarkerAndColor {
  color: string;
  marker: mapboxgl.Marker;
  name: string;
  enable: number; 
}

interface PlainMarker {
  color: string;
  lngLat: number[]
}

(mapboxgl as any).accessToken= 'pk.eyJ1IjoiZGF2aWRzYWF2MyIsImEiOiJjbGl1cmZ4NG8wMTZqM2ZwNW1pcW85bGo4In0.ye1F3KfhnRZruosNYoAYYQ';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['../../app.component.css']
})
export class MapComponent implements AfterViewInit, OnDestroy{
  @ViewChild('map') divMap?: ElementRef;

  constructor(private router: Router) { }

  public zoom: number = 10;
  public map?: mapboxgl.Map;
  public currentLngLat: mapboxgl.LngLat = new mapboxgl.LngLat(-0.5098796883778505, 38.3855908932305);
  public markers: MarkerAndColor[] = [];

  public topLeftCoordinates: string= '';
  public topRightCoordinates: string= '';
  public bottomLeftCoordinates: string= '';
  public bottomRightCoordinates: string= '';

  timeout: any = null;
  dup_ok=false;
  dup_not=false;
  buscar='Buscar';
  buscar1= 'id';
  buscar2= 'id';
  buscar3= 'Nada';
  buscar4= 'Nada';
  private url: string = 'http://localhost:5172/api/get/device_configurations';
  data: any;

  x1= '0';
  x2= '0';
  y1= '0';
  y2= '0';

  busqueda = {
    value: '', 
    sel_type: 0,
    sel_enable: 2
  }

  contenido = {
    sensors : [{
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
      enable: 0,
      organizationid: '',
    }]
  }

  getCornerCoordinates() {
    let bounds;
    if(this.map!=null){
      bounds = this.map.getBounds();
    }
    if(bounds!=null){
      this.x1= bounds.getSouthWest().lng.toFixed(6);
      this.x2= bounds.getNorthEast().lng.toFixed(6);
      this.y1= bounds.getSouthWest().lat.toFixed(6);
      this.y2= bounds.getNorthEast().lat.toFixed(6);
    }
    console.log(this.x1)
    //console.log(this.x2)
    //console.log(this.y1)
    //console.log(this.y2)

    setTimeout(() => {
      this.llamada();
    }, 1000);
  }

  handleClick(event: any) {
    let features;
    if(this.map!=null){
      features = this.map.queryRenderedFeatures(event.point);
    }
    // Verificar si se hizo clic en un marcador
    let markerFeatures;
    if(features!=null){
      markerFeatures = features.filter(feature => feature.layer.type === 'symbol' && feature.layer.source === 'markers');
    }
    if (markerFeatures!=null && markerFeatures.length > 0) {
      // Se hizo clic en un marcador
      let marker = markerFeatures[0];
      // Realizar acciones con el marcador seleccionado
      let markerId;
      if(marker.properties!=null && marker.properties["id"]!=null){
        markerId = marker.properties["id"]; // Obtener el ID o información del marcador
        console.log('Clic en el marcador:', markerId);
      }

    }
  }

  ngAfterViewInit(): void {

    if ( !this.divMap ) throw 'El elemento HTML no fue encontrado';

    navigator.geolocation.getCurrentPosition(position => { 
      this.map = new mapboxgl.Map({
          container: this.divMap?.nativeElement, // container ID
          style: 'mapbox://styles/mapbox/streets-v12', // style URL
          center: [position.coords.longitude, position.coords.latitude],
          zoom: this.zoom, // starting zoom
      });

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
    this.map.on('click', this.handleClick);


    /*this.map.on('moveend', () => {
      this.getCornerCoordinates();
    });
    this.map.on('zoom', () => {
      this.getCornerCoordinates();
    });*/
    this.map.on('zoomend', () => {
      this.getCornerCoordinates();
    });
    /*this.map.on('move', () => {
      this.getCornerCoordinates();
    });*/


    this.map.on('style.load', () => {
      // Insert the layer beneath any symbol layer.
      let layers;
      if (this.map != null) {
        layers = this.map.getStyle().layers;
      }
      let labelLayerId;
      if (layers !== undefined) {
        const labelLayer = layers.find(
          (layer) => layer.type === 'symbol' && layer.layout && layer.layout['text-field']
        );
        if (labelLayer) {
          labelLayerId = labelLayer.id;
        }
      } 

      // The 'building' layer in the Mapbox Streets
      // vector tileset contains building height data
      // from OpenStreetMap.
      if(this.map!=null){
        this.map.addLayer(
        {
        'id': 'add-3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
        'fill-extrusion-color': '#aaa',
        
        // Use an 'interpolate' expression to
        // add a smooth transition effect to
        // the buildings as the user zooms in.
        'fill-extrusion-height': [
        'interpolate',
        ['linear'],
        ['zoom'],
        15,
        0,
        15.05,
        ['get', 'height']
        ],
        'fill-extrusion-base': [
        'interpolate',
        ['linear'],
        ['zoom'],
        15,
        0,
        15.05,
        ['get', 'min_height']
        ],
        'fill-extrusion-opacity': 0.6
        }
        },
        labelLayerId
        );
      }
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

    this.mapListeners();
    })
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
    let enable=1;
    if ( !this.map ) return;

    let color= '#198754';
    if(enable==0){
      color= '#dc3545';
    }

    const lngLat = marker;
    let name='Punto nuevo';
    this.addMarker( lngLat, color ,name,enable);
  }

  function(){
    console.log("Hola")
  }


  addMarker( lngLat: mapboxgl.LngLat, color: string , name: string, enable: number) {
    if ( !this.map ) return;

    

    const marker = new mapboxgl.Marker({
      color: color,
      draggable: false,
    })
      .setLngLat( lngLat )
      .addTo( this.map );  
      marker.on('click', function() {
        console.log("Hola")
      });


      const geojson = {
        'type': 'FeatureCollection',
        'features': [
        {
        'type': 'Feature',
        'properties': {
          'id': enable,
          'color': color,
          'name': name
        },
        'geometry': {
        'type': 'Point',
        'coordinates1': lngLat.lng,
        'coordinates2': lngLat.lat,
        }
        }
        ]
        };
         
        // Add markers to the map.
        for (const marker of geojson.features) {
        // Create a DOM element for each marker.
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundSize = '100%';
        el.style.marginTop = '10px';
        el.innerHTML= `<p class="p-0 m-0">${marker.properties.name}</p>`;
         
        el.addEventListener('click', () => {
          this.router.navigate(['/devices/edit/', marker.properties.id]);
        });
         
        const coords = new mapboxgl.LngLat( marker.geometry.coordinates1, marker.geometry.coordinates2 );
        // Add markers to the map.
        new mapboxgl.Marker(el)
        .setLngLat(coords)
        .addTo(this.map);
      }

    
    this.markers.push({ color, marker, name, enable});
    //this.saveToLocalStorage();

    marker.on('dragend', () => this.saveToLocalStorage() );

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
      let name='David';
      let enable=1;
      this.addMarker( coords,color,name,enable);
    })

  }

  ngOnInit(): void {
    this.getCornerCoordinates();
  }

  llamada(){
    let m1= 1;
    let m2= 100000;
    let m3= 'asc';
    fetch(`${this.url}/${this.buscar}/${this.buscar1}/${this.busqueda.sel_type}/${this.busqueda.sel_enable}/${m1}/${m2}/${m3}/${this.x1}/${this.x2}/${this.y1}/${this.y2}`)    
    .then((response) => response.json())
    .then(data => {
      this.contenido.sensors= data;
      for(let quote of this.contenido.sensors) {
        let color= '#198754';
        if(quote.enable==0){
          color= '#dc3545';
        }
        if(quote.enable==1){
          color= '#198754';
        }
        let coords = new mapboxgl.LngLat( quote.lon, quote.lat );
        let name=quote.uid;
        let enable=parseInt(quote.id);
        this.addMarker( coords, color , name, enable);
      }
    })
  }

}
