import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['../../../app.component.css']
})
export class DevicesListComponent implements OnInit{

  public activeLang = 'es';

  constructor(private translate: TranslateService, public rutaActiva: Router ) {
    this.translate.setDefaultLang(this.activeLang);
  }

  max_device: string = 'http://localhost:5172/api/max/device_configurations';
  duplicate_sensors_devices: string = 'http://localhost:5172/api/duplicate/sensors_devices';
  get_device: string = 'http://localhost:5172/api/get/device_configurations';
  url3: string = 'http://localhost:5172/api/duplicate/device_configurations';
  id_device_sensors_devices: string = 'http://localhost:5172/api/id_device/sensors_devices';
  get_sensors: string = 'http://localhost:5172/api/get/sensors_types';

  totalPages = 5;
  currentPage = 1;
  cantPage = 16;
  data: any[] = [];

  ruta='';
  id1= 'orden';
  mostrar=true;
  id= 1;
  data3: any;
  mostrar1= true;
  mostrar2= false;

  timeout: any = null;
  dup_ok=false;
  dup_not=false;
  buscar='Buscar';
  buscar1= 'id';
  buscar2= 'id';
  buscar3= 'Nada';
  buscar4= 'Nada';
  cont=true;

  ver_dup=false;
  pencil_dup=false;
  ver_list=false;
  ver_map=false;
  
  busqueda = {
    value: '', 
    sel_type: 0,
    sel_enable: 2
  }

  contenido = {
    sensors : [
      {
        id: '',    
        enable: '', 
        id_device: '',
        id_type_sensor: '',
        datafield: '',
        nodata: '',
        orden: '',
        createdAt: '',        
        updatedAt: '',
        type_name: '',
        sensor : [
          {
            id: '1',    
            enable: 1, 
            type_name: '',
          },
        ]
      }]
  }

  data2 = {
    sensors : [
      {
        id: '1',    
        enable: 1, 
        type_name: '',
      },
    ]
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
      }]
  }

  update = {
    id_device: '1'
  };

  contenido3 = {
    id: '',
  }

  ngOnInit(): void {
    this.ruta= this.rutaActiva.routerState.snapshot.url;
    this.get('uid');
      fetch(this.max_device)
      .then(response => response.json())
      .then(data => {
        this.id= parseInt(data[0].id)+1;
        ////console.log(this.id);
      })
    let buscar= 'Buscar';
    fetch(`${this.get_sensors}/${buscar}/${this.buscar2}`)
    .then((response) => response.json())
    .then(data => {
      this.contenido1.sensors= data;
    })
  }

  
  get(id: any){

    //console.log(this.currentPage)
    if(id!='xd'){
      this.buscar1= id;
    }
    if(this.busqueda.value==''){
      this.buscar= 'Buscar';
    }
    else{
      this.buscar= this.busqueda.value;
    }
    let x1= 1;
    let x2= 100000;
    console.log(this.busqueda.sel_type)

    fetch(`${this.get_device}/${this.buscar}/${this.buscar1}/${this.busqueda.sel_type}/${this.busqueda.sel_enable}/${x1}/${x2}`)
    .then((response) => response.json())
    .then(data => {
      this.totalPages= Math.round(data.length/this.cantPage);
      //console.log(this.totalPages)
    })

    fetch(`${this.get_device}/${this.buscar}/${this.buscar1}/${this.busqueda.sel_type}/${this.busqueda.sel_enable}/${this.currentPage}/${this.cantPage}`)
    .then((response) => response.json())
    .then(data => {
      this.data= data;
      for (let x of this.data) {
          fetch(`${this.id_device_sensors_devices}/${x.id}/${this.id1}`)
          .then(response => response.json())
          .then(data3 => {
            x.sensor= data3;
          })
          .catch(error => {
            console.error(error); 
          });     
      }
    })
    
  }

  get pageRange(): number[] {
    return Array(this.totalPages).fill(0).map((_, index) => index + 1);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.ngOnInit();
    }
  }

  Page(num: any): void {
    this.currentPage= num;
    this.ngOnInit();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.ngOnInit();
    }
  }

  public cambiarLenguaje() {
    this.translate.use(this.activeLang);
  }

  duplicate(num: any,uid: any){
    this.contenido3 = {
      id: num,    
    }
    let x1= 1;
    let x2= 100000;
    this.buscar= 'Buscar';
    fetch(`${this.get_device}/${this.buscar}/${this.buscar1}/${this.busqueda.sel_type}/${this.busqueda.sel_enable}/${x1}/${x2}`)
    .then((response) => response.json())
    .then(data => {
      let contador = 1;
      let nombresExistentes = new Set();
      for (let index = 0; index < data.length; index++) {
        nombresExistentes.add(data[index].uid);
      }

      let uid_2= uid;
      while(nombresExistentes.has(uid_2)) {
        uid_2 = `${uid}_${contador}`;
        contador++;
      }
      //console.log(data);

      this.contenido3 = {
        id: num,    
      }
      fetch(`${this.url3}/${num}/${uid_2}`, {
        method: "POST",
        body: JSON.stringify(this.contenido3),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json())
  
      fetch(this.max_device)
      .then(response => response.json())
      .then(data => {
        fetch(`${this.duplicate_sensors_devices}/${num}/${parseInt(data[0].id)+1}`)
        .then((response) => response.json())
        .then(data => {
          this.data= data;
        })
      })
      this.dup_ok=true;
      this.rutaActiva.navigate(['/devices/edit/', this.id]);

    })

  }

  obtener(id_actual: any){
    fetch(`${this.id_device_sensors_devices}/${id_actual}/${this.id1}`)
    .then(response => response.json())
    .then(data3 => {
      this.contenido.sensors[id_actual].sensor.push(data3);
    })
    .catch(error => {
      console.error(error); 
    });

  }

  onKeySearch(event: any) {
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      if (event.keyCode != 13) {
        $this.get('xd');
      }
    }, 500);
  }

  borrar(){
    this.busqueda.value= '';
  }
}
