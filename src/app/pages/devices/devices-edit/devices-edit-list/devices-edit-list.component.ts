import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { DevicesEditComponent } from '../devices-edit.component';
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

  constructor(private xdxd: DevicesEditComponent,private rutaActiva: ActivatedRoute,private dataSharingService: DataSharingService) { }

  post_sensors_devices: string = 'http://localhost:5172/api/post/sensors_devices';
  delete_all_sensors_devices: string = 'http://localhost:5172/api/delete_all/sensors_devices';
  get_sensors: string = 'http://localhost:5172/api/get/sensors_types';
  id_device_sensors_devices: string = 'http://localhost:5172/api/id_device/sensors_devices';
  id_sensors: string = 'http://localhost:5172/api/id/sensors_types';

  data: any;
  data6: any= null;
  data7: any= null;

  id= parseInt(this.rutaActiva.snapshot.params['id']);
  ver_can= 1000;
  activeLang='en';
  buscar1='orden';
  buscar2='id';
  sin= true;
  eliminarlo: any;
  cont= 0;
  grande= true;

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



  
  ngOnInit(): void {
    setTimeout(() =>{this.get('xd')}, 50);
    this.desde = 1;
    setInterval(() => {
      this.dataSharingService.sharedAmp$.subscribe(data => {
        this.grande = data;
        console.log(this.grande)
      });
    }, 10);
    //setTimeout(() =>{this.cambiar()}, 100);
  }

  updatesharedList() {
    console.log(this.contenido.sensors)
    this.dataSharingService.updatesharedList(this.contenido.sensors);
  }

  cambiar(num: any){
    setTimeout(() =>{
      fetch(`${this.id_sensors}/${this.contenido.sensors[num].id_type_sensor}`)
      .then(response => response.json())
      .then(data => {
        this.contenido.sensors[num].orden= data[0].orden;
      })
    }, 10);
  }

  get(id: any){
    if(id!='xd'){
      this.buscar1= id;
    }
    fetch(`${this.id_device_sensors_devices}/${this.id}/${this.buscar1}`)
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
    let ord= 'ASC';
    fetch(`${this.get_sensors}/${buscar}/${this.buscar2}/${ord}`)
    .then((response) => response.json())
    .then(data => {
      this.contenido1.sensors= data;
    })
  }

  vari(id: any){
    this.eliminarlo= id;
    console.log(id);
    console.log(this.eliminarlo);
    this.contenido.sensors= this.contenido.sensors.filter((item) => item.id != this.eliminarlo)
    console.log(this.contenido.sensors)
    this.updatesharedList();
  }

  anyadir(){
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
    //this.contenido2.id= this.cont;
    this.contenido.sensors.push(contenido2);
    //this.cont++;
    this.sin= true;
    this.updatesharedList();
  }

  eliminar(){
    this.contenido.sensors= this.contenido.sensors.filter((item) => item == this.eliminarlo)
  }

}
