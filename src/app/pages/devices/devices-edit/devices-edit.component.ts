import { Component , OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataSharingService } from './../../../services/data_sharing.service';

@Component({
  selector: 'app-devices-edit',
  templateUrl: './devices-edit.component.html',
  styleUrls: ['../../../app.component.css']
})
export class DevicesEditComponent implements OnInit{

  sharedLat: any = '';
  sharedLon: any = '';
  date= '';

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    window.resizeBy(-1, 0);
  }

  constructor(private rutaActiva: ActivatedRoute,private router: Router, private dataSharingService: DataSharingService) { 
    this.createDate();
  }

  deleteDevice_device: string = 'http://localhost:5172/api/deleteDevice/device_configurations';
  update_device: string = 'http://localhost:5172/api/update/device_configurations';
  id_device: string = 'http://localhost:5172/api/id/device_configurations';
  deleteDevice_all_sensors_devices: string = 'http://localhost:5172/api/deleteDevice_all/sensors_devices';
  post_sensors_devices: string = 'http://localhost:5172/api/post/sensors_devices';
  id= parseInt(this.rutaActiva.snapshot.params['id']);

  activeLang='en';
  show_map=true;
  show_form= true;
  view_rec= false;
  saved= false;
  act_ok= false;
  act_not= false;
  changed= false;

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

  editDevices(loginForm: any) { // Guardar Dispositivo
    this.devices.updatedAt= this.date;
    this.getShsareSensors();
    if (loginForm.valid) {
      fetch(this.update_device, {
        method: "POST",body: JSON.stringify(this.devices),headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json()) 
      this.act_ok= true;
      this.saved= true;
    }
    this.editSensor();
  }

  editSensor() { // Guardar Sensores
    var devices4 = {
      id: this.id,   
    }

    fetch(this.deleteDevice_all_sensors_devices, {
      method: "POST",body: JSON.stringify(devices4),headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    for(let quote of this.sensors.sensors) {
      fetch(this.post_sensors_devices, {
        method: "POST",body: JSON.stringify(quote),headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json()) 
    }
    return;
  }

  deleteDevice(id_actual: any){ // Eliminar Dispositivo
    var devices3 = {
      id: id_actual,    
    }
    fetch(this.deleteDevice_device, {
      method: "POST",body: JSON.stringify(devices3),headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    this.router.navigate(['/devices']);
  }

  updatesharedLat() { // Actualizar Latitud
    this.dataSharingService.updatesharedLat(this.devices.lat);
  }
  updatesharedLon() { // Actualizar Longitud
    this.dataSharingService.updatesharedLon(this.devices.lon);
  }

  recharge(){ // Recargar
    this.ngOnInit()
    this.changed= false;
  }

  showForm(){ // Expandir formulario
    this.show_form=true;
    this.dataSharingService.updatesharedAmp(true);
    this.onResize(0);
  }
  hideForm(){ // Contrarer formulario
    this.show_form=false;
    this.dataSharingService.updatesharedAmp(false);
    this.onResize(0);
  }
  showMap(){ // Expandir mapa
    this.dataSharingService.updatesharedAmp(true);
    this.show_map=false;
  }
  hideMap(){ // Contrarer mapa
    this.show_map=true;
    this.dataSharingService.updatesharedAmp(false);
  }

  getShsareSensors(){  // Obtener sensores de otro componente
    this.dataSharingService.sharedList$.subscribe(data => {
      this.sensors.sensors= data;
    });
  }

  createDate(){ // Genera fecha
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    this.date= `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
}
