import { Component , OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataSharingService } from './../../../services/data_sharing.service';
import { DevicesEditMapComponent } from './devices-edit-map/devices-edit-map.component';

@Component({
  selector: 'app-devices-edit',
  templateUrl: './devices-edit.component.html',
  styleUrls: ['../../../app.component.css']
})
export class DevicesEditComponent implements OnInit{

  sharedLat: any = '';
  sharedLon: any = '';
  fecha= '';

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    window.resizeBy(-1, 0);
  }

  constructor(private rutaActiva: ActivatedRoute,private router: Router, private dataSharingService: DataSharingService,private DevicesEditMapComponent: DevicesEditMapComponent) { 
    this.date();
  }

  delete_device: string = 'http://localhost:5172/api/delete/device_configurations';
  update_device: string = 'http://localhost:5172/api/update/device_configurations';
  id_device: string = 'http://localhost:5172/api/id/device_configurations';
  delete_all_sensors_devices: string = 'http://localhost:5172/api/delete_all/sensors_devices';
  post_sensors_devices: string = 'http://localhost:5172/api/post/sensors_devices';
  id= parseInt(this.rutaActiva.snapshot.params['id']);

  id_actual= 1;
  activeLang='en';
  width: any;

  mostrar=true;
  mostrar3= true;
  ver_rec= false;
  guardado= false;
  act_ok= false;
  act_not= false;
  change= false;

  devices = {    
    id: '',    
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
    organizationid: '',
    enable: 0,
    updatedAt: ''
  }

  sensors = {
    sensors : [{
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

  ngOnInit(): void { // Inicializador
    this.dataSharingService.updatesharedAmp(false);
    this.getDevices()
    this.getShsareSensors();

    this.dataSharingService.sharedLat$.subscribe(data => {
      this.devices.lat = data;
    });
    this.dataSharingService.sharedLon$.subscribe(data => {
      this.devices.lon = data;
    });
    this.updatesharedLat();
    this.updatesharedLon();
  }

  restore(){ // Recargar
    this.ngOnInit()
    this.change= false;
  }

  expandForm(){ // Expandir formulario
    this.mostrar3=true;
    this.dataSharingService.updatesharedAmp(true);
    this.onResize(0);
  }
  contractForm(){ // Contrarer formulario
    this.mostrar3=false;
    this.dataSharingService.updatesharedAmp(false);
    this.onResize(0);
  }
  expandMap(){ // Expandir mapa
    this.dataSharingService.updatesharedAmp(true);
    this.mostrar=false;
  }
  contractMap(){ // Contrarer mapa
    this.mostrar=true;
    this.dataSharingService.updatesharedAmp(false);
  }

  getShsareSensors(){  // Obtener sensores de otro componente
    this.dataSharingService.sharedList$.subscribe(data => {
      this.sensors.sensors= data;
    });
  }

  getDevices(){ // Obtener Dispositivos
    fetch(`${this.id_device}/${this.id}`)
    .then(response => response.json())
    .then(data => {
      this.devices= data[0];
    })
    .catch(error => {
      console.error(error); 
    });
  }

  updatesharedLat() { // Actualizar Latitud
    this.dataSharingService.updatesharedLat(this.devices.lat);
  }
  updatesharedLon() { // Actualizar Longitud
    this.dataSharingService.updatesharedLon(this.devices.lon);
  }
  
  resize(): void{ // Redimensionar
    this.width = window.innerWidth;
  }

  submitDevice(loginForm: any) { // Guardar Dispositivo
    this.devices.updatedAt= this.fecha;
    this.getShsareSensors();
    if (loginForm.valid) {
      fetch(this.update_device, {
        method: "POST",
        body: JSON.stringify(this.devices),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json()) 
      this.act_ok= true;
      this.guardado= true;
    }
    this.submitSensor();
  }

  submitSensor() { // Guardar Sensores
    var devices4 = {
      id: this.id,   
    }

    fetch(this.delete_all_sensors_devices, {
      method: "POST",
      body: JSON.stringify(devices4),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    for(let quote of this.sensors.sensors) {
      fetch(this.post_sensors_devices, {
        method: "POST",
        body: JSON.stringify(quote),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json()) 
    }
    return;
  }

  delete(id_actual: any){ // Eliminar Dispositivo
    var devices3 = {
      id: id_actual,    
    }
    fetch(this.delete_device, {
      method: "POST",
      body: JSON.stringify(devices3),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    this.router.navigate(['/devices']);
  }

  recharge(){ // Recargar mapa
    const id_actual= this.rutaActiva.snapshot.params['id']
    fetch(`${this.id_device}/${id_actual}`)
    .then(response => response.json())
    .then(data => {
      this.devices.lat= data[0].lat;
      this.devices.lon= data[0].lon;
      this.devices.cota= data[0].cota;
      this.devices.timezone= data[0].timezone;
    })
    .catch(error => {
      console.error(error); 
    });
  }

  date(){
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    this.fecha= `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
}
