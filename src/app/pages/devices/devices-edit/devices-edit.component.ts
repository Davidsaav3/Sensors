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
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    this.fecha= `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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

  contenido = {    
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

  contenido1 = {
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
  
  contenido2 = {
    id: 1,    
    enable: 1,
  }

  restablecer(){
    this.ngOnInit()
    this.change= false;
  }

  ampliar(){
    this.mostrar3=true;
    this.dataSharingService.updatesharedAmp(true);
    this.onResize(0);
  }

  desampliar(){
    this.mostrar3=false;
    this.dataSharingService.updatesharedAmp(false);
    this.onResize(0);
  }

  ampliar2(){
    this.dataSharingService.updatesharedAmp(true);
    this.mostrar=false;
  }

  desampliar2(){
    this.mostrar=true;
    this.dataSharingService.updatesharedAmp(false);
  }

  ngOnInit(): void {
    this.dataSharingService.updatesharedAmp(false);
    this.get()
    this.getlist();

    this.dataSharingService.sharedLat$.subscribe(data => {
      this.contenido.lat = data;
    });
    this.dataSharingService.sharedLon$.subscribe(data => {
      this.contenido.lon = data;
    });
    this.updatesharedLat();
    this.updatesharedLon();
  }

  getlist(){
    this.dataSharingService.sharedList$.subscribe(data => {
      this.contenido1.sensors= data;
    });
  }

  get(){
    fetch(`${this.id_device}/${this.id}`)
    .then(response => response.json())
    .then(data => {
      this.contenido= data[0];
    })
    .catch(error => {
      console.error(error); 
    });
  }

  updatesharedLat() {
    this.dataSharingService.updatesharedLat(this.contenido.lat);
  }
  updatesharedLon() {
    this.dataSharingService.updatesharedLon(this.contenido.lon);
  }
  
  resize(): void{
    this.width = window.innerWidth;
  }

  submitForm(loginForm: any) {
    this.contenido.updatedAt= this.fecha;
    this.getlist();
    if (loginForm.valid) {
      fetch(this.update_device, {
        method: "POST",
        body: JSON.stringify(this.contenido),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json()) 
      this.act_ok= true;
      this.guardado= true;
    }
    this.submitList();
  }

  submitList() {
    var contenido4 = {
      id: this.id,   
    }

    fetch(this.delete_all_sensors_devices, {
      method: "POST",
      body: JSON.stringify(contenido4),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    for(let quote of this.contenido1.sensors) {
      fetch(this.post_sensors_devices, {
        method: "POST",
        body: JSON.stringify(quote),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json()) 
    }
    return;
  }

  eliminar(id_actual: any){
    var contenido3 = {
      id: id_actual,    
    }
    fetch(this.delete_device, {
      method: "POST",
      body: JSON.stringify(contenido3),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    this.router.navigate(['/devices']);
  }

  recargar(){
    const id_actual= this.rutaActiva.snapshot.params['id']
    fetch(`${this.id_device}/${id_actual}`)
    .then(response => response.json())
    .then(data => {
      this.contenido.lat= data[0].lat;
      this.contenido.lon= data[0].lon;
      this.contenido.cota= data[0].cota;
      this.contenido.timezone= data[0].timezone;
    })
    .catch(error => {
      console.error(error); 
    });
  }
}
