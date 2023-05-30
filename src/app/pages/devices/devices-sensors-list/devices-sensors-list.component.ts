import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-devices-sensors-list',
  templateUrl: './devices-sensors-list.component.html',
  styleUrls: ['../../../app.component.css']
})
export class DevicesSensorsListComponent  implements OnInit{
  constructor(private rutaActiva: ActivatedRoute) { }
  private url3: string = 'http://localhost:5172/api/delete/sensors_devices';
  private url1: string = 'http://localhost:5172/api/get/sensors_types';

  title = 'HTTP using native fetch API';
  apiUrl: string = 'http://localhost:5172/api/id_device/sensors_devices';
  
  data: any;
  data6: any= null;

  sin= true;
  eliminarlo: any;

  act_not= false;
  act_ok= false;
  eliminar_ok= false;
  eliminar_not= false;

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

  contenido1 = {
    sensors : [
      {
        id: '', 
        type: 'CO2',    
        metric: '', 
        description: '',
        errorvalue: 1,
        valuemax: 1,
        valuemin: 1,
      },
      {
        id: '', 
        type: 'Humedad',    
        metric: '', 
        description: '',
        errorvalue: 1,
        valuemax: 1,
        valuemin: 1,
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


  eliminar(){

       var contenido3 = {
      id: this.eliminarlo,   
      }
      fetch(this.url3, {
        method: "POST",
        body: JSON.stringify(contenido3),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json()) 
      this.eliminar_ok= true;
    
  }

  vari(id: any){
    this.eliminarlo= id;
  }


  anyadir(){
    this.contenido.sensors.push(this.contenido2);
    this.sin= true;
  }


  ngOnInit(): void {
    if(this.rutaActiva.snapshot.params['id']){
      const id_actual= this.rutaActiva.snapshot.params['id']
      const url = `${this.apiUrl}/${id_actual}`;

      fetch(url)
      .then(response => response.json())
      .then(data => {
        this.contenido.sensors= data;
        if(this.data6!=null){
          this.sin= false;
        }
      })
      .catch(error => {
        console.error(error); 
      });

      fetch(this.url1)
      .then((response) => response.json())
      .then((quotesData) => (this.data6 = quotesData));
        this.contenido1.sensors.push(this.data6);
        this.contenido1.sensors.pop() 
    }
  
}
}
