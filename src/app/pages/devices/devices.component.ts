import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';

interface MarkerAndColor {
  color: string;
  marker: mapboxgl.Marker;
  name: string;
  enable: number; 
}

(mapboxgl as any).accessToken= 'pk.eyJ1IjoiZGF2aWRzYWF2MyIsImEiOiJjbGl1cmZ4NG8wMTZqM2ZwNW1pcW85bGo4In0.ye1F3KfhnRZruosNYoAYYQ';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['../../app.component.css']
})
export class DevicesComponent implements AfterViewInit, OnDestroy{

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

  geojson: any;
  x1= '0';
  x2= '0';
  y1= '0';
  y2= '0';

  /**/
  
  max_device: string = 'http://localhost:5172/api/max/device_configurations';
  duplicate_sensors_devices: string = 'http://localhost:5172/api/duplicate/sensors_devices';
  get_device: string = 'http://localhost:5172/api/get/device_configurations';
  url3: string = 'http://localhost:5172/api/duplicate/device_configurations';
  id_device_sensors_devices: string = 'http://localhost:5172/api/id_device/sensors_devices';
  get_sensors: string = 'http://localhost:5172/api/get/sensors_types';

  cargando= false;
  marcado= 'uid';
  totalPages = 5;
  currentPage = 1;
  cantPage = 10;
  data: any[]= [];
  page= 1;

  ruta='';
  id1= 'orden';
  mostrar=true;
  id= 1;
  data3: any;
  mostrar1= true;
  mostrar2= false;
  timeout: any = null;
  dup_ok=false;
  dup_not=false;
  buscar='Buscar';
  buscar1= 'id';
  buscar2= 'id';
  buscar3= 'Nada';
  buscar4= 'Nada';
  cont= true;
  ver_dup= 10000;
  pencil_dup= 10000;
  pencil_dup1= false;
  ver_list=false;
  ver_map=false;

  alt_1_a=true;
  alt_1_b=false;
  alt_2_a=true;
  alt_2_b=false;
  alt_3_a=true;
  alt_3_b=false;  
  alt_4_a=true;
  alt_4_b=false;  
  alt_5_a=true;
  alt_5_b=false;

  select_sensors_1 = {
    sensors : [{
      id: 1, 
      name: 'Todos los esnores',    
      metric: '', 
      description: '',
      errorvalue: 1,
      valuemax: 1,
      valuemin: 1,
    }]
  }

  select_sensors_2 = {
    sensors : [{
      id: -1, 
      name: 'Todos los Sensores',    
      metric: '', 
      description: '',
      errorvalue: 1,
      valuemax: 1,
      valuemin: 1,
    }]
  }

  aux1 = {
    id: '',
  }

  busqueda = {
    value: '', 
    sel_type: 0,
    sensors_2: 2,
    sel_enable: 2
  }

  ngOnInit(): void { // Inicialización
    this.getget();
    if(this.cont==true){
      this.get('uid','ASC');
    }
    else{
      this.getCornerCoordinates();
    }
  }
  
  clearSearch(){ // Eliminar filtros
    this.busqueda.value= '';
    this.totalPages = 5;
    this.currentPage = 1;
    this.cantPage = 15;
    this.page= 1;
    this.busqueda.value= '';
    this.select_sensors_2.sensors= [];
    this.select_sensors_2.sensors.push({
      id: -1, 
      name: 'Todos los Sensores',    
      metric: '', 
      description: '',
      errorvalue: 1,
      valuemax: 1,
      valuemin: 1,
    });
    this.busqueda.sel_enable= 2;
    this.busqueda.sensors_2= 2;
    this.Page(1);
  }

  getget(){ 
    this.ruta= this.router.routerState.snapshot.url;
    this.get('uid','ASC');
    fetch(this.max_device)
    .then(response => response.json())
    .then(data => {
      this.id= parseInt(data[0].id)+1;
    })

    let buscar= 'Buscar';
    let ord= 'ASC';
    fetch(`${this.get_sensors}/${buscar}/${this.buscar2}/${ord}`)
    .then((response) => response.json())
    .then(data => {
      data.unshift({
        id: -1, 
        type: 'Todos los sensores',    
        metric: '', 
        description: '',
        errorvalue: 1,
        valuemax: 1,
        valuemin: 1,
      });

      data.unshift({
        id: -2, 
        type: 'Sin sensores',    
        metric: '', 
        description: '',
        errorvalue: 1,
        valuemax: 1,
        valuemin: 1,
      });

      this.select_sensors_1.sensors= data;
      for (let index = 0; index < data.length; index++) {
        this.select_sensors_1.sensors[index].name= data[index].type;
      }
    })
  }

  openMap(){ // Abrir mapa
    this.getCornerCoordinates();
    this.cont= false;
  }
  openList(){ // Abrir lista
    this.getget();
    this.get('uid','ASC');
    this.cont= true;
  }

  get(id: any, ord: any){ 
    this.marcado= id;
    setTimeout(() =>{
      if(id!='xd'){
        this.buscar1= id;
      }
      if(this.busqueda.value==''){
        this.buscar= 'Buscar';
      }
      else{
        this.buscar= this.busqueda.value;
      }
      let x1= '0';
      let x2= '0';
      let y1= '0';
      let y2= '0';

      let array= [];
      for (let index = 0; index < this.select_sensors_2.sensors.length; index++) {
        array.push(this.select_sensors_2.sensors[index].id);
      }
      var arrayString = array.join(',');
      //console.log(arrayString)
      let m1= 1;
      let m2= 100000;
      //console.log(this.select_sensors_2.sensors[0].id)
      this.cargando= true;
      fetch(`${this.get_device}/${this.buscar}/${this.buscar1}/${arrayString}/${this.busqueda.sel_enable}/${m1}/${m2}/${ord}/${x1}/${x2}/${y1}/${y2}/${this.busqueda.sensors_2}`)
      .then((response) => response.json())
      .then(data => {
        this.cargando= false;
        this.totalPages= Math.round(data.length/this.cantPage);
        //console.log(this.totalPages)
      })
      this.cargando= true;
      fetch(`${this.get_device}/${this.buscar}/${this.buscar1}/${arrayString}/${this.busqueda.sel_enable}/${this.currentPage}/${this.cantPage}/${ord}/${x1}/${x2}/${y1}/${y2}/${this.busqueda.sensors_2}`)
      .then((response) => response.json())
      .then(data => {
        this.cargando= false;
        this.data= data;
        for (let quote of this.data) {
            fetch(`${this.id_device_sensors_devices}/${quote.id}/${this.id1}`)
            .then(response => response.json())
            .then(data3 => {
              quote.sensor= data3;
            })
            .catch(error => {
              console.error(error); 
            });  
            //
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
    }, 10);
  }

  onKeySearch(event: any) { // Busqueda por texto
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      if (event.keyCode != 13) {
        $this.get('xd','ASC');
      }
    }, 500);
  }

  deleteText(){ // Limpiar cuadro de texto
    this.busqueda.value= '';
  }

  /**/

  firstPage(): void { // Primera pagina
    if(this.currentPage!=1){
      this.currentPage= 1;
      this.ngOnInit();
    }
  }

  previousPage10(): void { // 10 paginas mas
    if (this.currentPage-10 > 1) {
      this.currentPage= this.currentPage-10;
      this.ngOnInit();
    }
    else{
      this.currentPage= 1;
      this.ngOnInit();
    }
  }

  previousPage(): void { // Pagina anterior
    if (this.currentPage > 1) {
      this.currentPage--;
      this.ngOnInit();
    }
  }

  Page(num: any): void {
    this.currentPage= num;
    this.ngOnInit();
  }

  nextPage(): void { // Pagina siguiente
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.ngOnInit();
    }
  }

  nextPage10(): void { // 10 paginas menos
    if (this.currentPage+10 < this.totalPages) {
      this.currentPage= this.currentPage+10;
      this.ngOnInit();
    }
    else{
      this.currentPage= this.totalPages;
      this.ngOnInit();
    }
  }

  lastPage(): void { // Ultima pagina
    if(this.currentPage!=this.totalPages){
      this.currentPage= this.totalPages;
      this.ngOnInit();
    }
  }

  /**/

  ngAfterViewInit(): void { // Después de ngOnInit
    if ( !this.divMap ) throw 'No hay mapa';
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => { 
          this.map = new mapboxgl.Map({
              container: this.divMap?.nativeElement, 
              style: 'mapbox://styles/mapbox/streets-v12',
              center: [position.coords.longitude, position.coords.latitude],
              zoom: this.zoom, 
          });
          this.auxInit();
        },
        (error) => {
          this.map = new mapboxgl.Map({
            container: this.divMap?.nativeElement, 
            style: 'mapbox://styles/mapbox/streets-v12', 
            center: [-3.7034137886912504,40.41697654880073],
            zoom: this.zoom, 
        });
          console.log("Error geo", error);
          this.auxInit()
        }
      );
    } 
    else {
      this.map = new mapboxgl.Map({
        container: this.divMap?.nativeElement, 
        style: 'mapbox://styles/mapbox/streets-v12', 
        center: [-3.7034137886912504,40.41697654880073],
        zoom: this.zoom, 
    });      
      console.log("Geo no compatible");
      this.auxInit();
    }
  }

  getCornerCoordinates() { // Obtener cordenadas
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
    setTimeout(() => {
      this.getDevices();
    }, 1000);
  }

  handleClick(event: any) { // Marcar posición
    let features;
    if(this.map!=null){
      features = this.map.queryRenderedFeatures(event.point);
    }
    let markerFeatures;
    if(features!=null){
      markerFeatures = features.filter(feature => feature.layer.type === 'symbol' && feature.layer.source === 'markers');
    }
    if (markerFeatures!=null && markerFeatures.length > 0) {
      let marker = markerFeatures[0];
      let markerId;
      if(marker.properties!=null && marker.properties["id"]!=null){
        markerId = marker.properties["id"]; 
      }
    }
  }

  auxInit(){ // Auxiliar de Init
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
      this.map.on('click', this.handleClick);

      /*this.map.on('moveend', () => {
        this.getCornerCoordinates();
      });
      this.map.on('zoom', () => {
          this.getCornerCoordinates();
      });      
      this.map.on('zoom', () => {
          this.getCornerCoordinates();
      });*/
      if(this.busqueda.value=='' && this.select_sensors_2.sensors[0].id==-1 && this.busqueda.sel_enable==2){
        this.map.on('zoomend', () => {
          this.getCornerCoordinates();
        });
      }
      /*this.map.on('move', () => {
        this.getCornerCoordinates();
      });*/

      this.map.on('style.load', () => {

        if(this.map!=null){
        this.map.addSource('places', {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': [
              {
                'type': 'Feature',
                'properties': {
                  'description': 
                  `
                    <strong>Dispositivo 1</strong>
                    <p>Uid: Hola</p>
                    <p>Uid: Hola</p>
                    <div style="display: inline-block; height: min-content;">
                      <span class="badge rounded-pill text-bg-success d-inline-block me-2">
                        <p class="mb-0 d-none d-md-none d-lg-block">Disp 1</p>
                      </span>
                      <span class="badge rounded-pill text-bg-success d-inline-block me-2">
                        <p class="mb-0 d-none d-md-none d-lg-block">Disp 1</p>
                      </span>
                      <span class="badge rounded-pill text-bg-success d-inline-block me-2">
                        <p class="mb-0 d-none d-md-none d-lg-block">Disp 1</p>
                      </span>
                    </div>
                  `
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-0.509498,38.385271]
                }
              }

            ]
          }
        });
        }

        if(this.map!=null){
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
          /*if(this.map!=null){
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
        }*/
        }
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
    }
  }

  ngOnDestroy(): void { // Elimina mapa
    this.map?.remove();
  }

  mapListeners() { // Listeners del mapa
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
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });
      
    if(this.map!=null){
      this.map.on('mouseenter', 'places', (e) => {
      if(this.map!=undefined){
          this.map.getCanvas().style.cursor = 'pointer';
          
          if(e!=null && e.features!=null && e.features[0]!=null && e.features[0].geometry!=null && e.features[0].properties!=null){
            const coordinates: mapboxgl.LngLatLike = [-0.509498,38.385271];
            const description = e.features[0].properties["description"];
            //console.log(this.geojson.features[0].coordinates1)
            //const coordinates: mapboxgl.LngLatLike = [this.geojson.features[0].coordinates1,this.geojson.features[0].coordinates2];
            //const description = this.geojson.features[0].properties.description;
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            popup.setLngLat(coordinates).setHTML(description).addTo(this.map);
          }
        }
      });
      this.map.on('mouseleave', 'places', () => {
        if(this.map!=undefined){
          this.map.getCanvas().style.cursor = '';
          popup.remove();
        }
      });
    }
  }

  /* */

  addMarker( lngLat: mapboxgl.LngLat, color: string , name: string, enable: number) { // Añadir chincheta
    if ( !this.map ) return;
    const marker = new mapboxgl.Marker({
      color: color,
      draggable: false,
    })
    .setLngLat( lngLat )
    .addTo( this.map );  
    marker.on('click', function() {
    });

      this.geojson = {
        'id': 'FeatureCollection',
        'type': 'FeatureCollection',
        'features': [
          {
          'type': 'Feature',
          'properties': {
            'id': enable,
            'color': color,
            'name': name,
            'description': 
                  `<strong>Dispositivo 1</strong>
                    <p>Uid: Hola</p>
                    <p>Uid: Hola</p>
                    <div style="display: inline-block; height: min-content;">
                      <span class="badge rounded-pill text-bg-success d-inline-block me-2">
                        <p class="mb-0 d-none d-md-none d-lg-block">Disp 1</p>
                      </span>
                      <span class="badge rounded-pill text-bg-success d-inline-block me-2">
                        <p class="mb-0 d-none d-md-none d-lg-block">Disp 1</p>
                      </span>
                      <span class="badge rounded-pill text-bg-success d-inline-block me-2">
                        <p class="mb-0 d-none d-md-none d-lg-block">Disp 1</p>
                      </span>
                    </div>
                  `
          },
          'geometry': {
          'type': 'Point',
          'coordinates1': lngLat.lng,
          'coordinates2': lngLat.lat,
          }
          }
          ]
        };
         
        for (const marker of this.geojson.features) {
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundSize = '100%';
        el.style.marginTop = '10px';
        el.innerHTML= `<p class="p-0 m-0">${marker.properties.name}</p>`;
         
        el.addEventListener('click', () => {
          const url = `/devices/edit/${marker.properties.id}`; 
          window.open(url, '_blank');
        });
         
        const coords = new mapboxgl.LngLat( marker.geometry.coordinates1, marker.geometry.coordinates2 );
        new mapboxgl.Marker(el)
        .setLngLat(coords)
        .addTo(this.map);
      }
    this.markers.push({ color, marker, name, enable});
  }

  deleteMarker( index: number ) { // Eliminar chincheta
    this.markers[index].marker.remove();
    this.markers.splice( index, 1 );
  }

  getDevices(){ // Obtener dispositivos
    let m1= 1;
    let m2= 100000;
    let m3= 'asc';
    fetch(`${this.get_device}/${this.buscar}/${this.buscar1}/${this.select_sensors_2.sensors[0].id}/${this.busqueda.sel_enable}/${m1}/${m2}/${m3}/${this.x1}/${this.x2}/${this.y1}/${this.y2}/${this.busqueda.sensors_2}`)   
    .then((response) => response.json())
    .then(data4 => {
      this.data= data4;
      for(let quote of this.data) {
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
