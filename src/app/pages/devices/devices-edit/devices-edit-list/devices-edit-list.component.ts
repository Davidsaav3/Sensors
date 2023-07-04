import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { DataSharingService } from '../../../../services/data_sharing.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-devices-edit-list',
  templateUrl: './devices-edit-list.component.html',
  styleUrls: ['../../../../app.component.css']
})
export class DevicesEditListComponent  implements OnInit{

  constructor(private rutaActiva: ActivatedRoute,private dataSharingService: DataSharingService) { }
  post_sensors_devices: string = 'http://localhost:5172/api/post/sensors_devices';
  delete_all_sensors_devices: string = 'http://localhost:5172/api/delete_all/sensors_devices';
  get_sensors: string = 'http://localhost:5172/api/get/sensors_types';
  id_device_sensors_devices: string = 'http://localhost:5172/api/id_device/sensors_devices';
  id_sensors: string = 'http://localhost:5172/api/id/sensors_types';
  id= parseInt(this.rutaActiva.snapshot.params['id']);

  data: any;
  data1: any= null;
  ver_can= 1000;
  activeLang='en';
  buscar1='orden';
  buscar2='id';
  sin= true;
  eliminarlo: any;
  cont= 0;
  grande= true;
  desde: number= 1;
  duplicados= false;

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
        orden: 1,
        correction_specific: '',
        correction_time_specific: '',
      }]
  }

  contenido = {
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
        correction_specific: '',
        correction_time_specific: '',
      }]
  }

  ngOnInit(): void { // Inicialización
    setTimeout(() =>{this.get('xd')}, 50);
    this.desde = 1;
    setInterval(() => {
      this.dataSharingService.sharedAmp$.subscribe(data => {
        this.grande = data;
      });
    }, 10);
  }

  updatesharedList() { // Enviar sensores a device-edit
    this.dataSharingService.updatesharedList(this.contenido.sensors);
    //console.log(this.contenido.sensors)
  }

  cambiar(num: any){ // Asocia un order al sensor segun su type
    setTimeout(() =>{
      fetch(`${this.id_sensors}/${this.contenido.sensors[num].id_type_sensor}`)
      .then(response => response.json())
      .then(data => {
        this.contenido.sensors[num].orden= data[0].orden;
      })
    }, 10);
  }

  get(id: any){ // Obtener datos del dispositivo
    if(id!='xd'){
      this.buscar1= id;
    }
    fetch(`${this.id_device_sensors_devices}/${this.id}/${this.buscar1}`)
    .then(response => response.json())
    .then(data => {
      this.contenido.sensors= data;
      if(this.data1!=null){
        this.sin= false;
      }
    })
    .catch(error => {
      console.error(error); 
    });
    let buscar= 'Buscar';
    let ord= 'ASC';
    fetch(`${this.get_sensors}/${buscar}/${this.buscar2}/${ord}`)
    .then((response) => response.json())
    .then(data => {
      this.contenido1.sensors= data;
    })
  }

  vari(id: any){ // Añadir a lista compartida
    this.eliminarlo= id;
    this.contenido.sensors= this.contenido.sensors.filter((item) => item.id != this.eliminarlo)
    this.updatesharedList();
  }

  anyadir(){ // Añadir a lista compartida
    let contenido2 = {
      id: this.contenido.sensors.length, 
      enable: 0, 
      id_device: this.id,
      id_type_sensor: 1,
      datafield: '',
      nodata: true,
      orden: 1,
      type_name: 1,
      correction_specific: '',
      correction_time_specific: '',
    }
    this.contenido.sensors.push(contenido2);
    this.sin= true;
    this.updatesharedList();
  }

  eliminar(){ // Elimina sensor de la lista
    this.contenido.sensors= this.contenido.sensors.filter((item) => item == this.eliminarlo)
  }

}
