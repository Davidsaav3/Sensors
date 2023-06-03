import { Component , OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['../../app.component.css']
})

export class SensorsComponent implements OnInit{

  public activeLang = 'es';
  constructor(
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang(this.activeLang);
  }

  public cambiarLenguaje(lang: any) {
    this.activeLang = lang;
    this.translate.use(lang);
  }

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
    this.get();
  }

  m1(){
    this.mostrar= true;
    this.mostrar2= false;
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
    this.get();
    this.tam();
  }

  ocultar(){
    this.alert_delete= false;
    this.alert_new= false;
  }

  update(){
    this.mostrar2=false
    fetch(this.url4, {
      method: "POST",
      body: JSON.stringify(this.contenido),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    this.mostrar2=false;
    this.get();
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
    this.get();
    this.tam();
  }

  duplicate(){
    
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
    this.get();
    this.tam();
  }

  
  onKeySearch(event: any) {
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      if (event.keyCode != 13) {
        $this.get();
        $this.tam();
      }
    }, 500);
  }
 
  ngOnInit(): void {
    this.get();
    this.tam();
  }

  tam(){
    if (this.mostrar==true || this.mostrar2==true) {
      this.mostrar3= false;
    }
    else{
      this.mostrar3= true;
    }
  }

  get(){
    if(this.busqueda.value==''){
      this.buscar= 'Buscar';
    }
    else{
      this.buscar= this.busqueda.value;
    }
    const url2 = `${this.url1}/${this.buscar}`;
    console.log(url2)
    fetch(url2)
    .then((response) => response.json())
    .then((quotesData) => (this.data = quotesData));
    for(let quote of this.data) {
      this.contenido.type=  quote.type;
      this.contenido.metric=  quote.metric; 
      this.contenido.description=  quote.description;
      this.contenido.errorvalue=  quote.errorvalue;
      this.contenido.valuemax=  quote.valuemax;
      this.contenido.valuemin=  quote.valuemin;
    }

  }
}
