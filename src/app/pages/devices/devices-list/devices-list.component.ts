import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['../../../app.component.css']
})
export class DevicesListComponent implements OnInit{

  ruta='';

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

  id1= 'orden';

  title = 'HTTP using native fetch API';
  private url6: string = 'http://localhost:5172/api/max/device_configurations';
  private url7: string = 'http://localhost:5172/api/duplicate/sensors_devices';

  private url: string = 'http://localhost:5172/api/get/device_configurations';
  data: any;
  private url2: string = 'http://localhost:5172/api/id_device/sensors_devices/1';
  mostrar=true;
  private url3: string = 'http://localhost:5172/api/duplicate/device_configurations';
  data3: any;
  apiUrl: string = 'http://localhost:5172/api/id_device/sensors_devices';
  id= 1;
  private url1: string = 'http://localhost:5172/api/get/sensors_types';
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
    sel_type: 'Nada',
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

  update = {
    id_device: '1'
  };

  contenido3 = {
    id: '',
  }

  duplicate(num: any){
    this.contenido3 = {
      id: num,    
    }
    
    const url2 = `${this.url3}/${num}`;
    fetch(url2, {
      method: "POST",
      body: JSON.stringify(this.contenido3),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    

    fetch(this.url6)
    .then(response => response.json())
    .then(data => {
      let url3 = `${this.url7}/${num}/${parseInt(data[0].id)+1}`;
      console.log(url3)
      fetch(url3)
      .then((response) => response.json())
      .then(data => {
        this.data= data;
      })
    })

    this.dup_ok=true;
    this.rutaActiva.navigate(['/devices/edit/', this.id]);
  }

  obtener(id_actual: any){
    const url2 = `${this.apiUrl}/${id_actual}/${this.id1}`;
    fetch(url2)
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

  ngOnInit(): void {
    //console.log(this.rutaActiva.routerState.snapshot.url)
    this.ruta= this.rutaActiva.routerState.snapshot.url;
    this.get('xd');

    //console.log(this.id)
      fetch(this.url6)
      .then(response => response.json())
      .then(data => {
        this.id= parseInt(data[0].id)+1;
        //console.log(this.id);
      })
    //console.log(this.id)

    //

    let buscar= 'Buscar';
    const url1 = `${this.url1}/${buscar}/${this.buscar2}`;
    fetch(url1)
    .then((response) => response.json())
    .then(data => {
      this.contenido1.sensors= data;
    })
  }

  borrar(){
    this.busqueda.value= '';
  }

  get(id: any){
    if(id!='xd'){
      this.buscar1= id;
    }
    

    if(this.busqueda.value==''){
      this.buscar= 'Buscar';
    }
    else{
      this.buscar= this.busqueda.value;
    }
    const url2 = `${this.url}/${this.buscar}/${this.buscar1}/${this.busqueda.sel_type}/${this.busqueda.sel_enable}`;
    //console.log(url2)
    fetch(url2)
    .then((response) => response.json())
    .then(data => {
      this.data= data;
      for (let x of this.data) {
          const url9 = `${this.apiUrl}/${x.id}/${this.id1}`;
          fetch(url9)
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
}
