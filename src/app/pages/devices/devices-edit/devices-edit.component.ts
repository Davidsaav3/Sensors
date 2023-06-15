import { Component , OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-devices-edit',
  templateUrl: './devices-edit.component.html',
  styleUrls: ['../../../app.component.css']
})
export class DevicesEditComponent implements OnInit{

  constructor(private rutaActiva: ActivatedRoute,private router: Router) { 
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    this.contenido.updatedAt= `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  formattedDateTime= '';
  delete_device: string = 'http://localhost:5172/api/delete/device_configurations';
  update_device: string = 'http://localhost:5172/api/update/device_configurations';
  id_device: string = 'http://localhost:5172/api/id/device_configurations';

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
    lat: 0,
    lon: 0,
    cota: 10,
    timezone: '+01:00',
    organizationid: '',
    enable: 0,
    updatedAt: ''
  }
  
  contenido2 = {
    id: 1,    
    enable: 1,
  }

  ngOnInit(): void {
    this.get()
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
  
  resize(): void{
    this.width = window.innerWidth;
  }

  submitForm(loginForm: any) {
    if (loginForm.valid) {
      //this.DevicesSensorsListComponent.update2();
      fetch(this.update_device, {
        method: "POST",
        body: JSON.stringify(this.contenido),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json()) 
      //this.update2();
      this.act_ok= true;
      this.guardado= true;

      //console.log('Formulario válido');
    } else {
      //console.log('Formulario inválido');
    }
  }

  eliminar(id_actual: any){
    //console.log(id_actual)
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

  submit(){
    //this.DevicesSensorsListComponent.update2();
    fetch(this.update_device, {
      method: "POST",
      body: JSON.stringify(this.contenido),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    //this.update2();
    this.act_ok= true;
    this.guardado= true;
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

  /*enable(){
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
  }*/
}
