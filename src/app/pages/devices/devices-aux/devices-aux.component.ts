import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { DevicesNewComponent } from '../devices-new/devices-new.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-devices-aux',
  templateUrl: './devices-aux.component.html',
  styleUrls: ['../../../app.component.css']
})
export class DevicesAuxComponent  implements OnInit{

  constructor(private router: Router,private xdxd: DevicesNewComponent,private rutaActiva: ActivatedRoute) { }
  post_sensors_devices: string = 'http://localhost:5172/api/post/sensors_devices';
  delete_all_sensors_devices: string = 'http://localhost:5172/api/delete_all/sensors_devices';
  get_sensors: string = 'http://localhost:5172/api/get/sensors_types';
  id_device_sensors_devices: string = 'http://localhost:5172/api/id_device/sensors_devices';
  
  data: any;
  data6: any= null;
  data7: any= null;
  id= parseInt(this.rutaActiva.snapshot.params['id']);

  ver_can=false;
  activeLang='en';
  buscar1='orden';
  buscar2='id';

  sin= true;
  eliminarlo: any;

  act_not= false;
  act_ok= false;
  eliminar_ok= false;
  eliminar_not= false;
  mostrar=true;

  textoBusqueda: string = "";
  desde: number= 1;
  usuarios: any;
  primero: boolean = true;
  ultimo: boolean = false;
  ultimaPage: number= 1;
  paginas: any;
  public hayUsu: Boolean= true;
  duplicados= false;

  contenido = {
    sensors : [
      {
        id: 1, 
        enable: 0, 
        id_device: this.id,
        id_type_sensor: 1,
        datafield: 1,
        nodata: 1,
        orden: 1,
        type_name: 1,
      }]
  }

  contenido1 = {
    sensors : [
      {
        id: 1, 
        type: '',    
        metric: '', 
        description: '',
        errorvalue: 1,
        valuemax: 1,
        valuemin: 1,
      }]
  }

  contenido2 = {
    id: 1, 
    enable: 1, 
    id_device: this.id,
    id_type_sensor: 1,
    datafield: 1,
    nodata: 1,
    orden: 1,
    type_name: 1,
  }

  ngOnInit(): void {
    this.desde = 1;
    setTimeout(() => { this.get('xd')}, 50);
    console.log(this.contenido)
  }

  get(id: any){
    if(id!='xd'){
      this.buscar1= id;
    }
    const id_actual= parseInt(this.rutaActiva.snapshot.params['id'])
    const url = `${this.id_device_sensors_devices}/${id_actual}/${this.buscar1}`;
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
    let buscar= 'Buscar';
    const get_sensors = `${this.get_sensors}/${buscar}/${this.buscar2}`;
    fetch(get_sensors)
    .then((response) => response.json())
    .then(data => {
      this.contenido1.sensors= data;
    })
  }

  submitForm(loginForm: any) {
    if (loginForm.valid) {
      this.xdxd.submit();
      var contenido4 = {
        id: this.id,   
      }
      fetch(this.delete_all_sensors_devices, {
        method: "POST",
        body: JSON.stringify(contenido4),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json()) 

      for(let quote of this.contenido.sensors) {
        fetch(this.post_sensors_devices, {
          method: "POST",
          body: JSON.stringify(quote),
          headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json()) 
      }
      this.act_ok= true;
      console.log(this.act_ok)
      this.get('xd')
      this.get('xd')
      console.log('Formulario válido');

      this.router.navigate(['/devices']);
    } 
    else {
      console.log('Formulario inválido');
    }
  }

  update2(){
    this.xdxd.submit();
    var contenido4 = {
      id: this.id,   
    }
    fetch(this.delete_all_sensors_devices, {
      method: "POST",
      body: JSON.stringify(contenido4),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 

    //console.log(this.contenido.sensors)

    for(let quote of this.contenido.sensors) {
      fetch(this.post_sensors_devices, {
        method: "POST",
        body: JSON.stringify(quote),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json()) 
    }
    this.act_ok= true;
    console.log(this.act_ok)
    this.get('xd')
    this.get('xd')
    this.router.navigate(['/devices']);
  }

  vari(id: any){
    this.eliminarlo= id;
    console.log(this.eliminarlo);
    this.contenido.sensors= this.contenido.sensors.filter((item) => item.id != this.eliminarlo)
  }

  anyadir(){
    this.contenido.sensors.push(this.contenido2);
    this.sin= true;
  }
  
  eliminar(){
    this.contenido.sensors= this.contenido.sensors.filter((item) => item == this.eliminarlo)
  }

}
