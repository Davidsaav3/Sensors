import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-devices-new',
  templateUrl: './devices-new.component.html',
  styleUrls: ['./devices-new.component.css', '../../app.component.css']
})
export class DevicesNewComponent  implements OnInit{
  title = 'HTTP using native fetch API';
  private url: string = 'http://localhost:5172/api/id_device/sensors_devices/1';
  data: any;
  mostrar=true;

  contenido = {
    uid: '',    
    alias: '', 
    origin: '',
    description_origin: '',
    application_id: '',
    topic_name: '',
    typemeter: '',
    lat: 1,
    lon: 1,
    cota: 1,
    timezone: '',
    enable: 1,
    organizationid: '',
  }

  submit(){
    fetch('http://localhost:5172/api/post/device_configurations', {
      method: "POST",
      body: JSON.stringify(this.contenido),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    .then(json => console.log(json));
  }

  ngOnInit(): void {
    /*fetch(this.url)
    .then((response) => response.json())
    .then((quotesData) => (this.data = quotesData));*/
}
}

