import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { DataSharingService } from '../../../../services/data_sharing.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-devices-new-list',
  templateUrl: './devices-new-list.component.html',
  styleUrls: ['../../../../app.component.css']
})
export class DevicesNewListComponent  implements OnInit{

  constructor(private rutaActiva: ActivatedRoute,private dataSharingService: DataSharingService) { }
  post_sensors_devices: string = 'http://localhost:5172/api/post/sensors_devices';
  delete_all_sensors_devices: string = 'http://localhost:5172/api/delete_all/sensors_devices';
  get_sensors: string = 'http://localhost:5172/api/get/sensors_types';
  id_device_sensors_devices: string = 'http://localhost:5172/api/id_device/sensors_devices';
  id_sensors: string = 'http://localhost:5172/api/id/sensors_types';
  id= parseInt(this.rutaActiva.snapshot.params['id']);

  data6: any= null;
  ver_can= 1000;
  activeLang='en';
  buscar1='orden';
  buscar2='id';
  sin= true;
  eliminarlo: any;
  desde= 1;
  duplicados= false;
  grande= true;

  devices = {
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
        specific: null,
        time_specific: null,
      }]
  }

  sensors = {
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
        specific: null,
        time_specific: null,
      }]
  }

  ngOnInit(): void {
    this.desde = 1;
    setTimeout(() => { this.get('xd')}, 50);
    setInterval(() => {
      this.dataSharingService.sharedAmp$.subscribe(data => {
        this.grande = data;
      });
    }, 10);
  }

  cambiar(num: any){
    setTimeout(() =>{
      fetch(`${this.id_sensors}/${this.devices.sensors[num].id_type_sensor}`)
      .then(response => response.json())
      .then(data => {
        this.devices.sensors[num].orden= data[0].orden;
      })
    }, 10);
  }

  updatesharedList() {
    this.dataSharingService.updatesharedList(this.devices.sensors);
  }

  get(id: any){
    if(id!='xd'){
      this.buscar1= id;
    }
    fetch(`${this.id_device_sensors_devices}/${this.id}/${this.buscar1}`)
    .then(response => response.json())
    .then(data => {
      this.devices.sensors= data;
      if(this.data6!=null){
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
      this.sensors.sensors= data;
    })
  }

  vari(id: any){
    this.eliminarlo= id;
    this.devices.sensors= this.devices.sensors.filter((item) => item.id != this.eliminarlo);
    this.updatesharedList();
  }

  anyadir(){
    let devices_aux = {
      id: 1, 
      enable: 0, 
      id_device: this.id,
      id_type_sensor: 1,
      datafield: '',
      nodata: true,
      orden: 1,
      type_name: 1,
      specific: null,
      time_specific: null,
    }
    this.devices.sensors.push(devices_aux);
    this.sin= true;
    this.updatesharedList();
  }
  
  eliminar(){
    this.devices.sensors= this.devices.sensors.filter((item) => item == this.eliminarlo)
  }
}
