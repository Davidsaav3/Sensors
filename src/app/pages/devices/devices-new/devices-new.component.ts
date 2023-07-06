import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataSharingService } from './../../../services/data_sharing.service';
import { ActivatedRoute } from '@angular/router';
import { DevicesNewMapComponent } from './devices-new-map/devices-new-map.component';

@Component({
  selector: 'app-devices-new',
  templateUrl: './devices-new.component.html',
  styleUrls: ['../../../app.component.css']
})
export class DevicesNewComponent  implements OnInit{

  sharedLat: any = '';
  sharedLon: any = '';
  state= 0; //0 new //1 duplicate

  constructor(private router: Router, private dataSharingService: DataSharingService,private rutaActiva: ActivatedRoute,private DevicesNewMapComponent: DevicesNewMapComponent) { 
    this.createDate();
  }

  post_device: string = 'http://localhost:5172/api/post/device_configurations';
  delete_all_sensors_devices: string = 'http://localhost:5172/api/delete_all/sensors_devices';
  post_sensors_devices: string = 'http://localhost:5172/api/post/sensors_devices';
  max_device: string = 'http://localhost:5172/api/max/device_configurations';
  id_device: string = 'http://localhost:5172/api/id/device_configurations';
  get_device: string = 'http://localhost:5172/api/get/device_configurations';
  id= parseInt(this.rutaActiva.snapshot.params['id']);

  data: any;
  activeLang='en';
  show=true;
  show3= true;
  change= false;
  max= 2;

  device = {
    uid: '',    
    alias: '', 
    origin: '',
    description_origin: '',
    application_id: '',
    topic_name: '',
    typemeter: '',
    lat: this.sharedLat,
    lon: this.sharedLon,
    cota: 10,
    timezone: '+01:00',
    enable: 0,
    organizationid: '',
    createdAt: '',
    updatedAt: '',
  }

  sensors = {
    sensors : [
      {
        id: 1, 
        enable: 0, 
        id_device: this.id,
        id_type_sensor: 1,
        datafield: '',
        nodata: true,
        orden: 1,
        type_name: 1,
      }]
  }

  select_sensors = {
    sensors : [
      {
        id: -1, 
        name: 'Todos los Sensores',    
        metric: '', 
        description: '',
        errorvalue: 1,
        valuemax: 1,
        valuemin: 1,
      }]
  }

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

      if(this.state==1){
        fetch(`${this.id_device}/${this.id}`)
        .then(response => response.json())
        .then(data => {
          this.device= data[0];
        })
        .catch(error => {
          console.error(error); 
        }); 
        this.change= true;
        //
        fetch(`${this.get_device}/Buscar/uid/-1/2/1/100000/ASC/0/0/0/0/2`)
        .then((response) => response.json())
        .then(data => {
          let contador = 1;
          let nombresExistentes = new Set();
          for (let index = 0; index < data.length; index++) {
            nombresExistentes.add(data[index].uid);
          }
    
          let uid_2= this.device['uid'];
          while(nombresExistentes.has(uid_2)) {
            uid_2 = `${this.device['uid']}_${contador}`;
            contador++;
          }
          this.device.uid= uid_2;
        })
      }
    })
    this.dataSharingService.updatesharedAmp(false);
    this.dataSharingService.sharedLat$.subscribe(data => {
      this.device.lat = data;
    });
    this.dataSharingService.sharedLon$.subscribe(data => {
      this.device.lon = data;
    });
    this.dataSharingService.sharedList$.subscribe(data => {
      this.sensors.sensors= data;
    });
    this.createDate();
  }
  
  showMap(){ // Ampliar mapa
    this.show3=true;
    this.DevicesNewMapComponent.showMap();
  }
  hideMap(){ // Desamplair mapa
    this.show3=false;
    this.DevicesNewMapComponent.showMap();
  }
  showForm(){ // Ampliar formulario
    this.dataSharingService.updatesharedAmp(true);
    this.show=false;
  }
  hideForm(){ // Desamplair formulario
    this.show=true;
    this.dataSharingService.updatesharedAmp(false);
  }
  
  updatesharedLat() { // Actualiza Latitud
    this.dataSharingService.updatesharedLat(this.device.lat);
  }
  updatesharedLon() { // Actualiza Longitud
    this.dataSharingService.updatesharedLon(this.device.lon);
  }

  newSensor() { // Guardar sensores
      var select_sensors = {
        id: this.id,   
      }
      if(this.state==0){
        fetch(this.delete_all_sensors_devices, {
          method: "POST",
          body: JSON.stringify(select_sensors),
          headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json()) 
      }

      if(this.state==0){
        for(let quote of this.sensors.sensors) {
          fetch(this.post_sensors_devices, {
            method: "POST",
            body: JSON.stringify(quote),
            headers: {"Content-type": "application/json; charset=UTF-8"}
          })
          .then(response => response.json()) 
        }
      }
      if(this.state==1){
        for(let quote of this.sensors.sensors) {
          quote.id_device= this.max;
          fetch(this.post_sensors_devices, {
            method: "POST",
            body: JSON.stringify(quote),
            headers: {"Content-type": "application/json; charset=UTF-8"}
          })
          .then(response => response.json()) 
        }
      }
      this.router.navigate(['/devices']);
      return;
  }

  newDevice(loginForm: any) { // Guardar Dispositivos
    this.dataSharingService.sharedLat$.subscribe(data => {
      this.device.lat = data;
    });
    this.dataSharingService.sharedLon$.subscribe(data => {
      this.device.lon = data;
    });
    this.dataSharingService.sharedList$.subscribe(data => {
      this.sensors.sensors= data;
    });
    
    if (loginForm.valid) {
      fetch(this.post_device, {
        method: "POST",
        body: JSON.stringify(this.device),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json()) 
    }
    this.newSensor();
  }

  createDate(){ // Formato de fecha
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    this.device.createdAt= `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
}

