import { Component , OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['../../app.component.css']
})


export class SensorsComponent implements OnInit{

  public activeLang = 'es';
  constructor(
    private translate: TranslateService,
    public rutaActiva: Router
  ) {
    this.translate.setDefaultLang(this.activeLang);
  }

  public cambiarLenguaje(lang: any) {
    this.activeLang = lang;
    this.translate.use(lang);
  }

  edit_change= false;
  new_change= false;

  dup_ok=false;
  dup_not=false;
  id= 0;

  private url5: string = 'http://localhost:5172/api/duplicate/sensors_types';
  private url6: string = 'http://localhost:5172/api/max/sensors_types';

  contenido3 = {
    id: '',
  }

  duplicate(num: any){
    this.contenido3 = {
      id: num,    
    }   
    //console.log(num)
    const url2 = `${this.url5}/${num}`;
     fetch(url2, {
      method: "POST",
      body: JSON.stringify(this.contenido3),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    this.dup_ok=true;
    fetch(this.url6)
    .then(response => response.json())
    .then(data => {
      this.id= parseInt(data[0].id+1);
      //console.log(this.id)
      this.num(this.id)
    })
  }
  ruta='';

  ver_dup=false;
  pencil_dup=false;

  timeout: any = null;
  mostrar=false;
  mostrar2= false;
  mostrar3= true;
  alert_delete: any= false;
  alert_new: any= false;
  not_delete: any= false;
  not_new: any= false;
  guardar_ok: any= false;
  guardar_not: any= false;
  buscar='Buscar';
  buscar1='id';
  
  url1: string = 'http://localhost:5172/api/get/sensors_types';
  data: any;
  private url2: string = 'http://localhost:5172/api/post/sensors_types';
  data2: any;
  private url3: string = 'http://localhost:5172/api/delete/sensors_types';
  data3: any;
  private url4: string = 'http://localhost:5172/api/update/sensors_types';
  apiUrl: string = 'http://localhost:5172/api/id/sensors_types';

  busqueda = {
    value: '', 
  }

  contenido = {
    id: '', 
    type: '',    
    metric: '', 
    description: '',
    errorvalue: null,
    valuemax: null,
    valuemin: null,
  }

  contenido_new = {
    id: '', 
    type: '',    
    metric: '', 
    description: '',
    errorvalue: null,
    valuemax: null,
    valuemin: null,
  }

  borrar(){
    this.busqueda.value= '';
    this.get('xd');
  }

  m1(){
    this.mostrar= true;
    this.mostrar2= false;
    this.tam();
  }

  
  m2(){
    this.mostrar2= true;
    this.mostrar= false;
  }

  m3(){
    this.mostrar2= false;
    this.mostrar= false;
    this.tam();
  }

  eliminar(id_actual: any){
    var contenido2 = {
      id: id_actual,    
    }
    fetch(this.url3, {
      method: "POST",
      body: JSON.stringify(contenido2),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    this.mostrar2=false;
    this.alert_delete= true;
    this.mostrar2= false;
    this.get('xd');
    this.tam();
    this.get('xd');
  }

  ocultar(){
    this.alert_delete= false;
    this.alert_new= false;
  }

  update(){
    this.mostrar2=false
    console.log(this.url4)
    fetch(this.url4, {
      method: "POST",
      body: JSON.stringify(this.contenido),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    this.mostrar2=false;
    this.guardar_ok= true;
    this.get('xd');
    this.tam();
    this.get('xd');
  }

  cerrar(){
    this.mostrar2=false;
    this.guardar_ok= true;
    this.tam();
  }

  submit(){
    
    fetch(this.url2, {
      method: "POST",
      body: JSON.stringify(this.contenido_new),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    this.mostrar=false;
    this.alert_new= true;
    this.get('xd');
    this.tam();
    this.get('xd');
  }


  num(id_actual: any){
    this.m2();
    this.mostrar2=true;
    const url = `${this.apiUrl}/${id_actual}`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
      this.contenido= data[0];
    })
    .catch(error => {
      console.error(error); 
    });
    this.get('xd');
    this.tam();
    this.get('xd');
  }

  
  onKeySearch(event: any) {
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      if (event.keyCode != 13) {
        $this.get('xd');
        $this.tam();
      }
    }, 500);
  }
 
  ngOnInit(): void {
    this.get('xd');
    this.tam();
    this.get('xd');
  }

  tam(){
    if (this.mostrar==true || this.mostrar2==true) {
      this.mostrar3= false;
    }
    else{
      this.mostrar3= true;
    }
  }

  get(id: any){
    this.ruta= this.rutaActiva.routerState.snapshot.url;

    if(id!='xd'){
      this.buscar1= id;
    }

    if(this.busqueda.value==''){
      this.buscar= 'Buscar';
    }
    else{
      this.buscar= this.busqueda.value;
    }

    const url2 = `${this.url1}/${this.buscar}/${this.buscar1}`;
    fetch(url2)
    .then((response) => response.json())
    .then((quotesData) => (this.data = quotesData));

  }
}
