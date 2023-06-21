import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

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

  public zoom: number = 10;
  public map?: mapboxgl.Map;
  public currentLngLat: mapboxgl.LngLat = new mapboxgl.LngLat(-0.5098796883778505, 38.3855908932305);
  public markers: MarkerAndColor[] = [];

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


    this.map.on('load', () => { if(this.map!=null){
      this.map.addSource('places', {
      'type': 'geojson',
      'data': {
      'type': 'FeatureCollection',
      'features': [
      {
      'type': 'Feature',
      'properties': {
      'description':
      '<strong>Make it Mount Pleasant</strong><p>Make it Mount Pleasant is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>'
      },
      'geometry': {
      'type': 'Point',
      'coordinates': [-77.038659, 38.931567]
      }
      },
      {
      'type': 'Feature',
      'properties': {
      'description':
      '<strong>Mad Men Season Five Finale Watch Party</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a Mad Men Season Five Finale Watch Party, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>'
      },
      'geometry': {
      'type': 'Point',
      'coordinates': [-77.003168, 38.894651]
      }
      },
      {
      'type': 'Feature',
      'properties': {
      'description':
      '<strong>Big Backyard Beach Bash and Wine Fest</strong><p>EatBar (2761 Washington Boulevard Arlington VA) is throwing a Big Backyard Beach Bash and Wine Fest on Saturday, serving up conch fritters, fish tacos and crab sliders, and Red Apron hot dogs. 12:00-3:00 p.m. $25.</p>'
      },
      'geometry': {
      'type': 'Point',
      'coordinates': [-77.090372, 38.881189]
      }
      },
      {
      'type': 'Feature',
      'properties': {
      'description':
      '<strong>Ballston Arts & Crafts Market</strong><p>The Ballston Arts & Crafts Market sets up shop next to the Ballston metro this Saturday for the first of five dates this summer. Nearly 35 artists and crafters will be on hand selling their wares. 10:00-4:00 p.m.</p>'
      },
      'geometry': {
      'type': 'Point',
      'coordinates': [-77.111561, 38.882342]
      }
      },
      {
      'type': 'Feature',
      'properties': {
      'description':
      "<strong>Seersucker Bike Ride and Social</strong><p>Feeling dandy? Get fancy, grab your bike, and take part in this year's Seersucker Social bike ride from Dandies and Quaintrelles. After the ride enjoy a lawn party at Hillwood with jazz, cocktails, paper hat-making, and more. 11:00-7:00 p.m.</p>"
      },
      'geometry': {
      'type': 'Point',
      'coordinates': [-77.052477, 38.943951]
      }
      },
      {
      'type': 'Feature',
      'properties': {
      'description':
      '<strong>Capital Pride Parade</strong><p>The annual Capital Pride Parade makes its way through Dupont this Saturday. 4:30 p.m. Free.</p>'
      },
      'geometry': {
      'type': 'Point',
      'coordinates': [-77.043444, 38.909664]
      }
      },
      {
      'type': 'Feature',
      'properties': {
      'description':
      '<strong>Muhsinah</strong><p>Jazz-influenced hip hop artist Muhsinah plays the Black Cat (1811 14th Street NW) tonight with Exit Clov and Gods’illa. 9:00 p.m. $12.</p>'
      },
      'geometry': {
      'type': 'Point',
      'coordinates': [-77.031706, 38.914581]
      }
      },
      {
      'type': 'Feature',
      'properties': {
      'description':
      "<strong>A Little Night Music</strong><p>The Arlington Players' production of Stephen Sondheim's <em>A Little Night Music</em> comes to the Kogod Cradle at The Mead Center for American Theater (1101 6th Street SW) this weekend and next. 8:00 p.m.</p>"
      },
      'geometry': {
      'type': 'Point',
      'coordinates': [-77.020945, 38.878241]
      }
      },
      {
      'type': 'Feature',
      'properties': {
      'description':
      '<strong>Truckeroo</strong><p>Truckeroo brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>'
      },
      'geometry': {
      'type': 'Point',
      'coordinates': [-77.007481, 38.876516]
      }
      }
      ]
      }
      });
      // Add a layer showing the places.
      this.map.addLayer({
      'id': 'places',
      'type': 'circle',
      'source': 'places',
      'paint': {
      'circle-color': '#4264fb',
      'circle-radius': 6,
      'circle-stroke-width': 2,
      'circle-stroke-color': '#ffffff'
      }
      });
       
      // Create a popup, but don't add it to the map yet.
      const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
      });
       
      this.map.on('mouseenter', 'places', (e) => {
      // Change the cursor style as a UI indicator.
      if(this.map!=null){
        this.map.getCanvas().style.cursor = 'pointer';
      }
       
      // Copy coordinates array.
      if(e.features!=null && e.features[0]!=null && e.features[0].properties!=null){
        //const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties["description"];
        
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        //while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        //  coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        //}
        
        // Populate the popup and set its coordinates
        // based on the feature found.
        if(this.map!=null){
        //  popup.setLngLat(coordinates).setHTML(description).addTo(this.map);
        }
      }
      });
       
      this.map.on('mouseleave', 'places', () => {
      if(this.map!=null){
        this.map.getCanvas().style.cursor = '';
      }
      
      popup.remove();
      });
    }});

    this.mapListeners();
    //this.readFromLocalStorage();
    // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML = 'Fernando Herrera'

    // const marker = new Marker({
    //   // color: 'red',
    //   element: markerHtml
    // })
    //   .setLngLat( this.currentLngLat )
    //   .addTo( this.map );
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


  addMarker( lngLat: mapboxgl.LngLat, color: string , name: string, enable: number) {
    if ( !this.map ) return;

    const marker = new mapboxgl.Marker({
      color: color,
      draggable: false,
    })
      .setLngLat( lngLat )
      .addTo( this.map );  

    
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
    let x1= 1;
    let x2= 100000;
    let x3= 'asc';
    fetch(`${this.url}/${this.buscar}/${this.buscar1}/${this.busqueda.sel_type}/${this.busqueda.sel_enable}/${x1}/${x2}/${x3}`)    
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
