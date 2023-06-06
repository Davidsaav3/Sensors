import { Component , OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DevicesSensorsListComponent } from '../devices-sensors-list/devices-sensors-list.component';


@Component({
  selector: 'app-devices-edit',
  templateUrl: './devices-edit.component.html',
  styleUrls: ['../../../app.component.css']
})
export class DevicesEditComponent implements OnInit{
  constructor(private rutaActiva: ActivatedRoute,private router: Router, private DevicesSensorsListComponent : DevicesSensorsListComponent,) { }
  private url3: string = 'http://localhost:5172/api/delete/device_configurations';

  activeLang='en';

  title = 'HTTP using native fetch API';
  private url: string = 'http://localhost:5172/api/id_device/sensors_devices/1';
  private url4: string = 'http://localhost:5172/api/update/device_configurations';
  mostrar=true;
  mostrar3= true;
  ver_rec= false;

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
    lat: 0,
    lon: 0,
    cota: 10,
    timezone: '+01:00',
    organizationid: '',
    enable: 0,
  }
  
  contenido2 = {
    id: 1,    
    enable: 1,
  }

  eliminar(id_actual: any){
    var contenido3 = {
      id: id_actual,    
    }
    fetch(this.url3, {
      method: "POST",
      body: JSON.stringify(contenido3),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    this.router.navigate(['/devices']);
  }

  submit(){
    fetch(this.url4, {
      method: "POST",
      body: JSON.stringify(this.contenido),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    //this.update2();
    this.act_ok= true;
    //this.DevicesSensorsListComponent.update2();
  }

  recargar(){
    const id_actual= this.rutaActiva.snapshot.params['id']
    const apiUrl = 'http://localhost:5172/api/id/device_configurations';
    const url = `${apiUrl}/${id_actual}`;
    //console.log(url);
    fetch(url)
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

  enable(){
    fetch('http://localhost:5172/api/enable/device_configurations', {
      method: "POST",
      body: JSON.stringify(this.contenido2),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(data => {
      this.contenido2= data;
    })
    .catch(error => {
      console.error(error); 
    });  
  }

  ngOnInit(): void {
    this.get()
}

get(){
    const id_actual= this.rutaActiva.snapshot.params['id']
    const apiUrl = 'http://localhost:5172/api/id/device_configurations';
    const url = `${apiUrl}/${id_actual}`;
    //console.log(url);
    fetch(url)
    .then(response => response.json())
    .then(data => {
      this.contenido= data[0];
    })
    .catch(error => {
      console.error(error); 
    });
}
}
