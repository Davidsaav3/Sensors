import { Component , OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-devices-edit',
  templateUrl: './devices-edit.component.html',
  styleUrls: ['./devices-edit.component.css', '../../app.component.css']
})
export class DevicesEditComponent implements OnInit{
  constructor(private rutaActiva: ActivatedRoute) { }
  private url3: string = 'http://localhost:5172/api/delete/device_configurations';

  title = 'HTTP using native fetch API';
  private url: string = 'http://localhost:5172/api/id_device/sensors_devices/1';
  private url4: string = 'http://localhost:5172/api/update/device_configurations';
  mostrar=true;

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
  }
  
  contenido2 = {
    id: 1,    
    enable: 0,
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
  }

  submit(){
    fetch(this.url4, {
      method: "POST",
      body: JSON.stringify(this.contenido),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
  }

  enable(){
    fetch('http://localhost:5172/api/enable/device_configurations', {
      method: "POST",
      body: JSON.stringify(this.contenido2),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
  }

  ngOnInit(): void {
    this.get()
}

get(){
    const id_actual= this.rutaActiva.snapshot.params['id']
    const apiUrl = 'http://localhost:5172/api/id/device_configurations';
    const url = `${apiUrl}/${id_actual}`;
    console.log(url);
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
