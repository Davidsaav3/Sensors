import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-devices-sensors-list',
  templateUrl: './devices-sensors-list.component.html',
  styleUrls: ['../../../app.component.css']
})
export class DevicesSensorsListComponent  implements OnInit{
  constructor(private rutaActiva: ActivatedRoute) { }
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

  contenido = {
    sensors : [
      {
        id: 1, 
        enable: 1, 
        id_device: this.rutaActiva.snapshot.params['id'],
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
    id_device: this.rutaActiva.snapshot.params['id'],
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
        console.log(page)
  
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

    console.log(this.contenido.sensors)
    var contenido4 = {
        id: this.rutaActiva.snapshot.params['id'],   
      }
      console.log(this.rutaActiva.snapshot.params['id'])
      fetch(this.url4, {
        method: "POST",
        body: JSON.stringify(contenido4),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json()) 

      //

      for(let quote of this.contenido.sensors) {
        fetch(this.url5, {
          method: "POST",
          body: JSON.stringify(quote),
          headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json()) 
      }
      this.get()
      this.act_ok= true;
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
      this.get()
  }

  vari(id: any){
    this.eliminarlo= id;
  }


  anyadir(){
    this.contenido.sensors.push(this.contenido2);
    this.sin= true;
  }


  ngOnInit(): void {
    this.desde = 1;
    this.get();
  } 

  get(){
    fetch(this.url6)
    .then(response => response.json()) 
    .then((quotesData) => (this.data7 = quotesData));
    console.log(this.data7.id);

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
