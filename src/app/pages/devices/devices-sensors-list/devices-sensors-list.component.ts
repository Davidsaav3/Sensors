import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { DevicesEditComponent } from '../devices-edit/devices-edit.component';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-devices-sensors-list',
  templateUrl: './devices-sensors-list.component.html',
  styleUrls: ['../../../app.component.css']
})
export class DevicesSensorsListComponent  implements OnInit{

  constructor(private xdxd: DevicesEditComponent,private rutaActiva: ActivatedRoute) { }
  private url6: string = 'http://localhost:5172/api/max/device_configurations';
  private url5: string = 'http://localhost:5172/api/post/sensors_devices';
  private url4: string = 'http://localhost:5172/api/delete_all/sensors_devices';
  private url3: string = 'http://localhost:5172/api/delete/sensors_devices';
  private url1: string = 'http://localhost:5172/api/get/sensors_types';

  title = 'HTTP using native fetch API';
  apiUrl: string = 'http://localhost:5172/api/id_device/sensors_devices';
  
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
        type: 'CO2',    
        metric: '', 
        description: '',
        errorvalue: 1,
        valuemax: 1,
        valuemin: 1,
      },
      {
        id: 1, 
        type: 'Humedad',    
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

  
menos(){
  this.desde = this.desde - 1;
  const page = Array.from(document.getElementsByClassName('page') as HTMLCollectionOf<HTMLElement>);
  page.forEach((element, index) => {
    if(index === this.desde - 1){
      element.style.color='#0073ca';
      element.style.textDecoration='underline';
    }else{
      element.style.color='';
      element.style.textDecoration='';
    }
  });
  //this.listarUsuarios();
  if(this.desde <= 1){
    this.desde = 1;
    this.primero = true;
    this.ultimo = false;
  }else{
    this.primero = false;
    this.ultimo = false;
  }
}

mas(){
  this.desde = this.desde + 1;
  const page = Array.from(document.getElementsByClassName('page') as HTMLCollectionOf<HTMLElement>);
  page.forEach((element, index) => {
    if(index === this.desde - 1){
      element.style.color='#0073ca';
      element.style.textDecoration='underline';
    }else{
      element.style.color='';
      element.style.textDecoration='';
    }
  });
  if(page.length > 1){
    //this.listarUsuarios();
    if(this.desde >= this.ultimaPage){
      this.desde = this.ultimaPage;
      this.primero = false;
      this.ultimo = true;
    }
    else{
      this.primero = false;
      this.ultimo = false;
    }
  }

}

pagina(p: any){
  this.desde = p + 1;
  const page = Array.from(document.getElementsByClassName('page') as HTMLCollectionOf<HTMLElement>);
  page.forEach((element, index) => {
    if(index === this.desde - 1){
      element.style.color='#0073ca';
      element.style.textDecoration='underline';
    }else{
      element.style.color='';
      element.style.textDecoration='';
    }
  });
  if(this.desde <= 1){
    this.desde = 1;
    this.primero = true;
    this.ultimo = false;
  }else{
    if(this.desde >= this.ultimaPage){
      this.desde = this.ultimaPage;
      this.primero = false;
      this.ultimo = true;
    }else{
      this.primero = false;
      this.ultimo = false;
    }
  }

  //this.listarUsuarios();
  }

  listarUsuarios(){
    //this.admin.cargarUsuarios(this.desde, this.textoBusqueda)
    //.subscribe((res: any) => {
      //console.log(res)
      //this.usuarios = res.usuarios;
      //this.ultimaPage = Math.ceil(res.page.total/10);
      this.paginas = Array(this.ultimaPage).fill(1).map((x,i)=>i);
  
      setTimeout( () =>{
  
        const page = Array.from(document.getElementsByClassName('page') as HTMLCollectionOf<HTMLElement>);
        //console.log(page)
  
        page.forEach((element, index) => {
          if(index === this.desde - 1){
            element.style.color='#0073ca';
            element.style.textDecoration='underline';
          }else{
            element.style.color='';
            element.style.textDecoration='';
          }
        });
        }, 100);
  
      if (this.usuarios.length <= 0){
        this.hayUsu = false;
      }
      else {
        this.hayUsu = true;
      }
    //})
  }

  update2(){
    this.xdxd.submit();
    /*if((this.contenido.sensors[0].orden==this.contenido.sensors[1].orden) && 
    (this.contenido.sensors[0].enable==1) && 
    (this.contenido.sensors[0].enable==1)){
      this.duplicados= true;
      //$('#exampleModal2').add('show')
    }*/
    //else{
      var contenido4 = {
        id: this.id,   
      }
      fetch(this.url4, {
        method: "POST",
        body: JSON.stringify(contenido4),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json()) 

      //
      //console.log(this.contenido.sensors)
      //

      for(let quote of this.contenido.sensors) {
        fetch(this.url5, {
          method: "POST",
          body: JSON.stringify(quote),
          headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json()) 
      }
      this.act_ok= true;
      console.log(this.act_ok)
    //}
    this.get('xd')
    this.get('xd')
  }

  eliminar(){
    this.contenido.sensors= this.contenido.sensors.filter((item) => item == this.eliminarlo)

    /*var contenido3 = {
      id: this.eliminarlo,   
      }
      fetch(this.url3, {
        method: "POST",
        body: JSON.stringify(contenido3),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json()) 
      this.eliminar_ok= true;*/
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


  ngOnInit(): void {
    this.desde = 1;
    setTimeout(() => 
    {
      this.get('xd')
    },
    50);

    console.log(this.contenido)
  }


  get(id: any){
    if(id!='xd'){
      this.buscar1= id;
    }

      const id_actual= parseInt(this.rutaActiva.snapshot.params['id'])
      const url = `${this.apiUrl}/${id_actual}/${this.buscar1}`;
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
      const url1 = `${this.url1}/${buscar}/${this.buscar2}`;
      fetch(url1)
      .then((response) => response.json())
      .then(data => {
        this.contenido1.sensors= data;
      })
}

}
