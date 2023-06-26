import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild,OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['../../../app.component.css']
})
export class DevicesListComponent implements AfterViewInit, OnDestroy{
  @ViewChild('map') divMap?: ElementRef;

  constructor(private router: Router) {
  }

  public zoom: number = 10;
  public map?: mapboxgl.Map;
  public currentLngLat: mapboxgl.LngLat = new mapboxgl.LngLat(-0.5098796883778505, 38.3855908932305);
  public markers: MarkerAndColor[] = [];

  public topLeftCoordinates: string= '';
  public topRightCoordinates: string= '';
  public bottomLeftCoordinates: string= '';
  public bottomRightCoordinates: string= '';

  private url: string = 'http://localhost:5172/api/get/device_configurations';
  data4: any;

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
  showToastFlag1: boolean = false;
  showToastFlag2: boolean = false;

  totalPages = 5;
  currentPage = 1;
  cantPage = 16;
  data: any[]= [];
  page= 1;

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
  cont=true;

  ver_dup= 10000;
  pencil_dup= 10000;
  pencil_dup1= false;

  ver_list=false;
  ver_map=false;

  contenido = {
    sensors : [
      {
        id: '',    
        enable: '', 
        id_device: '',
        id_type_sensor: '',
        datafield: '',
        nodata: '',
        orden: '',
        createdAt: '',        
        updatedAt: '',
        type_name: '',
        sensor : [
          {
            id: '1',    
            enable: 1, 
            type_name: '',
          },
        ]
      }]
  }

  contenido2 = {
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

  data2 = {
    sensors : [
      {
        id: '1',    
        enable: 1, 
        type_name: '',
      },
    ]
  }

  contenido1 = {
    sensors : [
      {
        id: 1, 
        name: '',    
        metric: '', 
        description: '',
        errorvalue: 1,
        valuemax: 1,
        valuemin: 1,
      }]
  }

  busqueda = {
    value: '', 
    sel_type: 0,
    sel_enable: 2
  }


  update = {
    id_device: '1'
  };

  contenido3 = {
    id: '',
  }

  contenido4 = {
    sensors : [
      {
        id: 0, 
        name: 'Todos los Sensores',    
        metric: '', 
        description: '',
        errorvalue: 1,
        valuemax: 1,
        valuemin: 1,
      }]
  }
  
  //selected = [{ id: 0, name: "Seleccionar" }];

  borrartodo(){
    this.busqueda.value= '';
    this.totalPages = 5;
    this.currentPage = 1;
    this.cantPage = 15;
    this.page= 1;
    this.busqueda.value= '';
    this.contenido4.sensors[0].id= 0;
    //this.busqueda.sel_type= 0;
    this.busqueda.sel_enable= 2;
    this.Page(1);
  }

  getget(){
    this.ruta= this.router.routerState.snapshot.url;
    this.get('uid','ASC');
    fetch(this.max_device)
    .then(response => response.json())
    .then(data => {
      this.id= parseInt(data[0].id)+1;
      ////console.log(this.id);
    })

    let buscar= 'Buscar';
    let ord= 'ASC';
    fetch(`${this.get_sensors}/${buscar}/${this.buscar2}/${ord}`)
    .then((response) => response.json())
    .then(data => {
      this.contenido1.sensors= data;
      for (let index = 0; index < data.length; index++) {
        this.contenido1.sensors[index].name= data[index].type;
      }
    })
  }

  ngOnInit(): void {
    this.getget();

    if(this.cont==true){
      this.get('uid','ASC');
    }
    else{
      this.getCornerCoordinates();
    }
  
    
    /**/

  }


  c1(){
    this.cont= false;
  }
  c2(){
    this.cont= true;
  }
  


  get(id: any, ord: any){
    
    this.marcado= id;

    setTimeout(() =>{
      //console.log(this.currentPage)
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
      for (let index = 0; index < this.contenido4.sensors.length; index++) {
        array.push(this.contenido4.sensors[index].id);
      }
      var arrayString = array.join(',');
      console.log(arrayString)

      let m1= 1;
      let m2= 100000;
      console.log(this.contenido4.sensors[0].id)
      this.cargando= true;
      fetch(`${this.get_device}/${this.buscar}/${this.buscar1}/${arrayString}/${this.busqueda.sel_enable}/${m1}/${m2}/${ord}/${x1}/${x2}/${y1}/${y2}`)
      .then((response) => response.json())
      .then(data => {
        this.cargando= false;
        this.totalPages= Math.round(data.length/this.cantPage);
        //console.log(this.totalPages)
      })
      this.cargando= true;
      fetch(`${this.get_device}/${this.buscar}/${this.buscar1}/${arrayString}/${this.busqueda.sel_enable}/${this.currentPage}/${this.cantPage}/${ord}/${x1}/${x2}/${y1}/${y2}`)
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

  get pageRange(): number[] {
    return Array(this.totalPages).fill(0).map((_, index) => index + 1);
  }

  previousPage0(): void {
    if(this.currentPage!=1){
      this.currentPage= 1;
      this.ngOnInit();
    }
  }

  previousPage1(): void {
    if (this.currentPage-10 > 1) {
      this.currentPage= this.currentPage-10;
      this.ngOnInit();
    }
    else{
      this.currentPage= 1;
      this.ngOnInit();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.ngOnInit();
    }
  }

  Page(num: any): void {
    this.currentPage= num;
    this.ngOnInit();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.ngOnInit();
    }
  }

  nextPage1(): void {
    if (this.currentPage+10 < this.totalPages) {
      this.currentPage= this.currentPage+10;
      this.ngOnInit();
    }
    else{
      this.currentPage= this.totalPages;
      this.ngOnInit();
    }
  }

  nextPage0(): void {
    if(this.currentPage!=this.totalPages){
      this.currentPage= this.totalPages;
      this.ngOnInit();
    }
  }


  duplicate(num: any,uid: any){
    this.contenido3 = {
      id: num,    
    }
    let x1= 1;
    let x2= 100000;
    this.buscar= 'Buscar';
    fetch(`${this.get_device}/${this.buscar}/${this.buscar1}/${this.contenido4.sensors[0].id}/${this.busqueda.sel_enable}/${x1}/${x2}`)
    .then((response) => response.json())
    .then(data => {
      let contador = 1;
      let nombresExistentes = new Set();
      for (let index = 0; index < data.length; index++) {
        nombresExistentes.add(data[index].uid);
      }

      let uid_2= uid;
      while(nombresExistentes.has(uid_2)) {
        uid_2 = `${uid}_${contador}`;
        contador++;
      }
      //console.log(data);

      this.contenido3 = {
        id: num,    
      }
      fetch(`${this.url3}/${num}/${uid_2}`, {
        method: "POST",
        body: JSON.stringify(this.contenido3),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json())
  
      fetch(this.max_device)
      .then(response => response.json())
      .then(data => {
        fetch(`${this.duplicate_sensors_devices}/${num}/${parseInt(data[0].id)+1}`)
        .then((response) => response.json())
        .then(data => {
          this.data= data;
        })
      })
      this.dup_ok=true;
      this.router.navigate(['/devices/edit/', this.id]);

    })

  }

  obtener(id_actual: any){
    fetch(`${this.id_device_sensors_devices}/${id_actual}/${this.id1}`)
    .then(response => response.json())
    .then(data3 => {
      this.contenido.sensors[id_actual].sensor.push(data3);
    })
    .catch(error => {
      console.error(error); 
    });

  }

  onKeySearch(event: any) {
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      if (event.keyCode != 13) {
        $this.get('xd','ASC');
      }
    }, 500);
  }

  borrar(){
    this.busqueda.value= '';
  }


  /**/


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
    if(this.busqueda.value=='' && this.contenido4.sensors[0].id==0 && this.busqueda.sel_enable==2){
      this.map.on('zoomend', () => {
        this.getCornerCoordinates();
      });
    }
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

  llamada(){
    let m1= 1;
    let m2= 100000;
    let m3= 'asc';
    fetch(`${this.url}/${this.buscar}/${this.buscar1}/${this.contenido4.sensors[0].id}/${this.busqueda.sel_enable}/${m1}/${m2}/${m3}/${this.x1}/${this.x2}/${this.y1}/${this.y2}`)    
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
