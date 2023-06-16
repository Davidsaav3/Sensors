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
  cont= 0;

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
      }]
  }



  
  ngOnInit(): void {
    setTimeout(() =>{this.get('xd')}, 50);
    this.desde = 1;
    //setTimeout(() =>{this.cambiar()}, 100);
  }

  updatesharedList() {
    console.log(this.contenido.sensors)
    this.dataSharingService.updatesharedList(this.contenido.sensors);
  }

  cambiar(num: any){
    for (let index = 0; index < this.contenido.sensors.length; index++) {
      if(num==this.contenido.sensors[num].id){
        this.contenido.sensors[num].orden= this.contenido1.sensors[this.contenido.sensors[num].id_type_sensor].orden;
      }
    }
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
    fetch(`${this.get_sensors}/${buscar}/${this.buscar2}`)
    .then((response) => response.json())
    .then(data => {
      this.contenido1.sensors= data;
    })
  }

  submitForm(loginForm: any){
    /*if(loginForm.valid){  
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

      console.log('hey')
      for(let quote of this.contenido.sensors) {
        fetch(this.post_sensors_devices, {
          method: "POST",
          body: JSON.stringify(quote),
          headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json()) 
      }
      this.act_ok= true;
      //console.log(this.act_ok)
      this.get('xd')
      this.get('xd')
    }*/
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
