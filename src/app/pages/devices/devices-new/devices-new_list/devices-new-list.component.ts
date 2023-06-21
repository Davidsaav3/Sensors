import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router,private rutaActiva: ActivatedRoute,private dataSharingService: DataSharingService) { }
  post_sensors_devices: string = 'http://localhost:5172/api/post/sensors_devices';
  delete_all_sensors_devices: string = 'http://localhost:5172/api/delete_all/sensors_devices';
  get_sensors: string = 'http://localhost:5172/api/get/sensors_types';
  id_device_sensors_devices: string = 'http://localhost:5172/api/id_device/sensors_devices';
  
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
        datafield: '',
        nodata: true,
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
        orden: 1,
      }]
  }


  ngOnInit(): void {
    this.desde = 1;
    setTimeout(() => { this.get('xd')}, 50);
    //console.log(this.contenido)
  }

  cambiar(num: any){
    for (let index = 0; index < this.contenido.sensors.length; index++) {
      if(num==this.contenido.sensors[num].id){
        this.contenido.sensors[num].orden= this.contenido1.sensors[this.contenido.sensors[num].id_type_sensor].orden;
      }
    }
    this.updatesharedList();
  }

  updatesharedList() {
    //console.log(this.contenido.sensors)
    this.dataSharingService.updatesharedList(this.contenido.sensors);
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

  submitForm(loginForm: any) {
    /*if (loginForm.valid) {
      //this.xdxd.submit();
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
      //console.log(this.act_ok)
      this.get('xd')
      this.get('xd')
      //console.log('Formulario válido');

      this.router.navigate(['/devices']);
    } 
    else {
      //console.log('Formulario inválido');
    }*/
  }

  update2(){
    /*this.xdxd.submit();
    var contenido4 = {
      id: this.id,   
    }
    fetch(this.delete_all_sensors_devices, {
      method: "POST",
      body: JSON.stringify(contenido4),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 

    ////console.log(this.contenido.sensors)

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
    this.router.navigate(['/devices']);*/
  }

  vari(id: any){
    this.eliminarlo= id;
    console.log(this.eliminarlo);
    this.contenido.sensors= this.contenido.sensors.filter((item) => item.id != this.eliminarlo);
    this.updatesharedList();
  }

  anyadir(){
    let contenido2 = {
      id: 1, 
      enable: 0, 
      id_device: this.id,
      id_type_sensor: 1,
      datafield: '',
      nodata: true,
      orden: 1,
      type_name: 1,
    }

    this.contenido.sensors.push(contenido2);
    this.sin= true;
    this.updatesharedList();
  }
  
  eliminar(){
    this.contenido.sensors= this.contenido.sensors.filter((item) => item == this.eliminarlo)
  }

}
