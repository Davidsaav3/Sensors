import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-devices-sensors-list',
  templateUrl: './devices-sensors-list.component.html',
  styleUrls: ['./devices-sensors-list.component.css', '../../app.component.css']
})
export class DevicesSensorsListComponent  implements OnInit{
  constructor(private rutaActiva: ActivatedRoute) { }

  title = 'HTTP using native fetch API';
  apiUrl: string = 'http://localhost:5172/api/id_device/sensors_devices';
  
  data: any;
  mostrar=true;

  contenido = {
    id: '',    
    enable: '', 
    id_device: '',
    id_type_sensor: '',
    datafield: '',
    nodata: '',
    orden: '',
    type_name: '',
  }

  ngOnInit(): void {
    const id_actual= this.rutaActiva.snapshot.params['id']
    const url = `${this.apiUrl}/${id_actual}`;
    console.log(url)
    fetch(url)
    .then(response => response.json())
    .then(data => {
      this.contenido= data[0];
    })
    .catch(error => {
      console.error(error); 
    });
}
}
