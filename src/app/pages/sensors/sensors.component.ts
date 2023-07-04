import { Component , OnInit, HostListener} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';

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

  cargando= false;
  alt_1_a=true;
  alt_1_b=false;
  alt_2_a=true;
  alt_2_b=false;
  alt_3_a=true;
  alt_3_b=false;  
  alt_4_a=true;
  alt_4_b=false;  
  alt_5_a=true;
  alt_5_b=false;
  alt_6_a=true;
  alt_6_b=false;  
  alt_7_a=true;
  alt_7_b=false;

  data: any;
  data2: any;
  data3: any;

  width: any;
  ruta='';
  ver_dup= 1000;
  pencil_dup= 1000;
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
  dup= false;

  buscar='Buscar';
  buscar1='type';
  marcado= 'orden';

  guardado= false;
  edit_change= false;
  new_change= false;
  dup_ok=false;
  dup_not=false;
  id= 0;
  type_2='';

  contenido = {
    id: '', 
    type: '',    
    metric: '', 
    description: '',
    errorvalue: null,
    valuemax: null,
    valuemin: null,
    orden: '',
    correction_general: null,
    correction_time_general: null,
  }

  contenido_new = {
    id: '', 
    type: '',    
    metric: '', 
    description: '',
    errorvalue: null,
    valuemax: null,
    valuemin: null,
    orden: '',
    correction_general: null,
    correction_time_general: null,
  }

  busqueda = {
    value: '', 
  }

  contenido3 = {
    id: '',
  }

  ngOnInit(): void {
    this.get('orden','ASC');
    this.tam();
    this.get('orden','ASC');

    const toastElList = Array.from(document.querySelectorAll('.toast'));
    const toastList = toastElList.map(toastEl => new bootstrap.Toast(toastEl, {
      animation: true,
      autohide: true,
      delay: 3000,
    }));

    const myToastEl = document.getElementById('myToast')
    if(myToastEl!=null){
      myToastEl.addEventListener('hidden.bs.toast', () => {})
    }
  }

  get(id: any,ord: any){
    this.marcado= id;

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

    this.cargando= true;
    fetch(`${this.get_sensors}/${this.buscar}/${this.buscar1}/${ord}`)
    .then((response) => response.json())
    .then(quotesData => {
      this.cargando= false
      this.data = quotesData
    }
    );
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
      setTimeout(() => {
        this.guardar_ok= false;
      }, 2000);

      this.get('xd','ASC');
      this.get('xd','ASC');
      this.guardado= true;
      //console.log('Formulario válido');
    }
    this.new_change=false;
    this.edit_change=false;
  }

  submitForm2(loginForm: any) {
    this.dup= false;
    if (loginForm.valid) {
      fetch(this.post_sensors, {
        method: "POST",
        body: JSON.stringify(this.contenido_new),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json()) 
      this.alert_new= true;
      setTimeout(() => {
        this.alert_new= false;
      }, 2000);
      this.get('xd','ASC');
      this.tam();
      this.get('xd','ASC');
  
      fetch(this.max_sensors)
      .then(response => response.json())
      .then(data => {
        this.id= parseInt(data[0].id+1);
        //console.log(this.id) //this.num(this.id)
      })
      //console.log('Formulario válido');
    }
    this.new_change=false;
    this.edit_change=false;
  }
  
  resize(): void{
    this.width = window.innerWidth;
  }

  duplicate(num: any, type: any){
    if(!this.edit_change && !this.new_change){

      this.contenido3 = {
        id: num,    
      }   
      this.buscar= 'Buscar';
      let ord= 'ASC';
      fetch(`${this.get_sensors}/${this.buscar}/${this.buscar1}/${ord}`)
      .then((response) => response.json())
      .then(data => {
        let contador = 1;
        let nombresExistentes = new Set();
        for (let index = 0; index < data.length; index++) {
          nombresExistentes.add(data[index].type);
        }
        let type_2= type;
        //console.log(type);
        while(nombresExistentes.has(type_2)) {
          type_2 = `${type}_${contador}`;
          contador++;
        }
        this.m1();
        //this.mostrar2=true;
        fetch(`${this.id_sensors}/${num}`)
        .then(response => response.json())
        .then(data => {
          this.contenido_new= data[0];
        })
        .catch(error => {
          console.error(error); 
        });
        this.get('xd','ASC');
        this.tam();
        this.get('xd','ASC');
        //
        fetch(this.max_sensors)
        .then(response => response.json())
        .then(data => {
          this.id= parseInt(data[0].id);
          //console.log(this.id)
          this.contenido_new.id= data[0].id;
          this.contenido_new.type= type_2;
        })
        this.edit_change= true;
        this.dup= true;
      })
    }
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
    setTimeout(() => {
      this.alert_delete= false;
    }, 2000);
    this.mostrar2= false;
    this.get('xd','ASC');
    this.tam();
    this.get('xd','ASC');
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
    setTimeout(() => {
      this.guardar_ok= false;
    }, 2000);
    this.get('xd','ASC');
    this.get('xd','ASC');
    this.guardado= true;
  }

  cerrar(){
    this.mostrar2=false;
    this.tam();
    this.new_change=false;
    this.edit_change=false;
  }

  submit(){
    fetch(this.post_sensors, {
      method: "POST",
      body: JSON.stringify(this.contenido_new),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    this.alert_new= true;
    this.get('xd','ASC');
    this.tam();
    this.get('xd','ASC');

    fetch(this.max_sensors)
    .then(response => response.json())
    .then(data => {
      this.id= parseInt(data[0].id+1);
      //console.log(this.id)
      //this.num(this.id)
    })
    this.new_change=false;
    this.edit_change=false;
  }

  num(id_actual: any){
    if(!this.edit_change && !this.new_change){
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
      this.get('xd','ASC');
      this.tam();
      this.get('xd','ASC');
    }
  }
  
  onKeySearch(event: any) {
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      if (event.keyCode != 13) {
        $this.get('xd','ASC');
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
    this.get('xd','ASC');
  }

  m1(){
    this.mostrar= true;
    this.mostrar2= false;
    this.tam();
    this.dup= false;
  }
  m2(){
    this.mostrar2= true;
    this.mostrar= false;
  }
  m3(){
    this.mostrar2= false;
    this.mostrar= false;
    this.tam();
    this.new_change=false;
    this.edit_change=false;
  }
}
