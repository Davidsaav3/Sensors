import { Component , OnInit, HostListener} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['../../app.component.css']
})


export class SensorsComponent implements OnInit{

  @HostListener('window:resize')
  public activeLang = 'es';

  constructor(private translate: TranslateService, public rutaActiva: Router) {
    this.resize();
    this.translate.setDefaultLang(this.activeLang);
  }

  duplicate_sensors: string = 'http://localhost:5172/api/duplicate/sensors_types';
  max_sensors: string = 'http://localhost:5172/api/max/sensors_types';
  get_sensors: string = 'http://localhost:5172/api/get/sensors_types';
  post_sensors: string = 'http://localhost:5172/api/post/sensors_types';
  delete_sensors: string = 'http://localhost:5172/api/delete/sensors_types';
  update_sensors: string = 'http://localhost:5172/api/update/sensors_types';
  id_sensors: string = 'http://localhost:5172/api/id/sensors_types';

  data: any;
  data2: any;
  data3: any;

  width: any;
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
  buscar1='type';

  guardado= false;
  edit_change= false;
  new_change= false;
  dup_ok=false;
  dup_not=false;
  id= 0;

  contenido = {
    id: '', 
    type: '',    
    metric: '', 
    description: '',
    errorvalue: null,
    valuemax: null,
    valuemin: null,
    orden: 1,
  }

  contenido_new = {
    id: '', 
    type: '',    
    metric: '', 
    description: '',
    errorvalue: null,
    valuemax: null,
    valuemin: null,
    orden: 1,
  }

  busqueda = {
    value: '', 
  }

  contenido3 = {
    id: '',
  }

  ngOnInit(): void {
    this.get('orden');
    this.tam();
    this.get('orden');
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
    fetch(`${this.get_sensors}/${this.buscar}/${this.buscar1}`)
    .then((response) => response.json())
    .then((quotesData) => (this.data = quotesData));
  }

  public cambiarLenguaje() {
    this.translate.use(this.activeLang);
  }

  submitForm1(loginForm: any) {
    if (loginForm.valid) {
      //console.log(this.update_sensors)
      fetch(this.update_sensors, {
        method: "POST",
        body: JSON.stringify(this.contenido),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json()) 
      this.guardar_ok= true;
      this.get('xd');
      this.get('xd');
      this.guardado= true;

      //console.log('Formulario válido');
    } else {
      //console.log('Formulario inválido');
    }
  }

  submitForm2(loginForm: any) {
    if (loginForm.valid) {
      fetch(this.post_sensors, {
        method: "POST",
        body: JSON.stringify(this.contenido_new),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json()) 
      this.alert_new= true;
      this.get('xd');
      this.tam();
      this.get('xd');
  
      fetch(this.max_sensors)
      .then(response => response.json())
      .then(data => {
        this.id= parseInt(data[0].id+1);
        ////console.log(this.id)
        //this.num(this.id)
      })
      //console.log('Formulario válido');
    } else {
      //console.log('Formulario inválido');
    }
  }
  
  resize(): void{
    this.width = window.innerWidth;
  }

  duplicate(num: any){
    this.contenido3 = {
      id: num,    
    }   
    ////console.log(num)
     fetch(`${this.duplicate_sensors}/${num}`, {
      method: "POST",
      body: JSON.stringify(this.contenido3),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    this.dup_ok=true;
    fetch(this.max_sensors)
    .then(response => response.json())
    .then(data => {
      this.id= parseInt(data[0].id+1);
      ////console.log(this.id)
      this.num(this.id)
    })
  }

  eliminar(id_actual: any){
    var contenido2 = {
      id: id_actual,    
    }
    fetch(this.delete_sensors, {
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
    //console.log(this.update_sensors)
    fetch(this.update_sensors, {
      method: "POST",
      body: JSON.stringify(this.contenido),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    this.guardar_ok= true;
    this.get('xd');
    this.get('xd');
    this.guardado= true;
  }

  cerrar(){
    this.mostrar2=false;
    this.guardar_ok= true;
    this.tam();
  }

  submit(){
    fetch(this.post_sensors, {
      method: "POST",
      body: JSON.stringify(this.contenido_new),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    this.alert_new= true;
    this.get('xd');
    this.tam();
    this.get('xd');

    fetch(this.max_sensors)
    .then(response => response.json())
    .then(data => {
      this.id= parseInt(data[0].id+1);
      ////console.log(this.id)
      //this.num(this.id)
    })
  }


  num(id_actual: any){
    this.m2();
    this.mostrar2=true;
    fetch(`${this.id_sensors}/${id_actual}`)
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


  tam(){
    if (this.mostrar==true || this.mostrar2==true) {
      this.mostrar3= false;
    }
    else{
      this.mostrar3= true;
    }
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
}
