import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['../../../app.component.css']
})
export class DevicesListComponent implements OnInit{
  title = 'HTTP using native fetch API';
  private url: string = 'http://localhost:5172/api/get/device_configurations';
  data: any;
  private url2: string = 'http://localhost:5172/api/id_device/sensors_devices/1';
  data2: any;
  mostrar=true;
  private url3: string = 'http://localhost:5172/api/duplicate/device_configurations';
  data3: any;
  apiUrl: string = 'http://localhost:5172/api/id_device/sensors_devices';

  dup_ok=false;
  dup_not=false;

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
      }]
  }

  update = {
    id_device: '1'
  };

  contenido3 = {
    id: 1,    
  }

  duplicate(){
    fetch(this.url3, {
      method: "POST",
      body: JSON.stringify(this.contenido3),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    this.dup_ok=true;
  }

  obtener(id_actual: any){
      const url = `${this.apiUrl}/${id_actual}`;
      fetch(url)
      .then(response => response.json())
      .then(data => {
        this.contenido.sensors= data;
      })
      .catch(error => {
        console.error(error); 
      });
  }

  ngOnInit(): void {
    fetch(this.url)
    .then((response) => response.json())
    .then((quotesData) => (this.data = quotesData));
    for(let quote of this.data) {
      this.obtener(quote.id);
    }
}
}
