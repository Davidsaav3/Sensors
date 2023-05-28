import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-devices-sensors-list',
  templateUrl: './devices-sensors-list.component.html',
  styleUrls: ['../../app.component.css']
})
export class DevicesSensorsListComponent  implements OnInit{
  constructor(private rutaActiva: ActivatedRoute) { }
  private url3: string = 'http://localhost:5172/api/delete/sensors_devices';

  title = 'HTTP using native fetch API';
  apiUrl: string = 'http://localhost:5172/api/id_device/sensors_devices';
  
  data: any;
  mostrar=true;

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
        type_name: '',
      }]
  }

  contenido2 = {
    id: '',    
    enable: '', 
    id_device: '',
    id_type_sensor: '',
    datafield: '',
    nodata: '',
    orden: '',
    type_name: '',
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

  anyadir(){
    this.contenido.sensors.push(this.contenido2)
  }


  ngOnInit(): void {
    if(this.rutaActiva.snapshot.params['id']){
      const id_actual= this.rutaActiva.snapshot.params['id']
      const url = `${this.apiUrl}/${id_actual}`;
      fetch(url)
      .then(response => response.json())
      .then(data => {
        this.contenido.sensors= data;
      })
      .catch(error => {
        console.error(error); 
      });
    }
  
}
}
