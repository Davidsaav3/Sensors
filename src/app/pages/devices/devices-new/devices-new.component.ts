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

  constructor(private router: Router, private dataSharingService: DataSharingService,private rutaActiva: ActivatedRoute,private DevicesNewMapComponent: DevicesNewMapComponent) { 
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    this.contenido.createdAt= `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    this.contenido.updatedAt= `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  post_device: string = 'http://localhost:5172/api/post/device_configurations';
  delete_all_sensors_devices: string = 'http://localhost:5172/api/delete_all/sensors_devices';
  post_sensors_devices: string = 'http://localhost:5172/api/post/sensors_devices';

  data: any;
  activeLang='en';
  id= parseInt(this.rutaActiva.snapshot.params['id']);

  mostrar=true;
  ver_rec= false;
  mostrar3= true;
  change= false;
  grande= false;

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

  contenido = {
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

  ampliar(){
    this.mostrar3=true;
    this.DevicesNewMapComponent.ampliar();
  }

  desampliar(){
    this.mostrar3=false;
    this.DevicesNewMapComponent.ampliar();
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
    this.dataSharingService.sharedLat$.subscribe(data => {
      this.contenido.lat = data;
    });
    this.dataSharingService.sharedLon$.subscribe(data => {
      this.contenido.lon = data;
    });
    this.dataSharingService.sharedList$.subscribe(data => {
      this.contenido1.sensors= data;
    });
    console.log(this.contenido1.sensors);
    /*fetch(this.url)
    .then((response) => response.json())
    .then((quotesData) => (this.data = quotesData));*/
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    this.contenido.createdAt= `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  }
  
  updatesharedLat() {
    this.dataSharingService.updatesharedLat(this.contenido.lat);
  }
  updatesharedLon() {
    this.dataSharingService.updatesharedLon(this.contenido.lon);
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
      console.log(this.contenido1.sensors)
      for(let quote of this.contenido1.sensors) {
        fetch(this.post_sensors_devices, {
          method: "POST",
          body: JSON.stringify(quote),
          headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json()) 
      }
      console.log(this.contenido1.sensors)
      this.router.navigate(['/devices']);
      return;
  }

  submitForm(loginForm: any) {
    this.dataSharingService.sharedLat$.subscribe(data => {
      this.contenido.lat = data;
    });
    this.dataSharingService.sharedLon$.subscribe(data => {
      this.contenido.lon = data;
    });
    this.dataSharingService.sharedList$.subscribe(data => {
      this.contenido1.sensors= data;
    });
    
    console.log(this.contenido)
    if (loginForm.valid) {
      fetch(this.post_device, {
        method: "POST",
        body: JSON.stringify(this.contenido),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json()) 
      //this.router.navigate(['/devices']);
      //console.log('Formulario válido');
    }
    else {
      //console.log('Formulario inválido');
    }
    this.submitList();
  }
}

