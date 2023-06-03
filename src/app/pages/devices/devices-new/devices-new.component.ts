import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-devices-new',
  templateUrl: './devices-new.component.html',
  styleUrls: ['../../../app.component.css']
})
export class DevicesNewComponent  implements OnInit{
  constructor(private router: Router) { }

  title = 'HTTP using native fetch API';
  private url: string = 'http://localhost:5172/api/id_device/sensors_devices/1';
  data: any;
  
  mostrar=true;
  ver_rec= false;
  mostrar3= true;

  contenido = {
    uid: '',    
    alias: '', 
    origin: '',
    description_origin: '',
    application_id: '',
    topic_name: '',
    typemeter: '',
    lat: 0,
    lon: 0,
    cota: 10,
    timezone: '+01:00',
    enable: 0,
    organizationid: '',
  }

  submit(){
    fetch('http://localhost:5172/api/post/device_configurations', {
      method: "POST",
      body: JSON.stringify(this.contenido),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    this.router.navigate(['/devices']);
  }

  ngOnInit(): void {
    /*fetch(this.url)
    .then((response) => response.json())
    .then((quotesData) => (this.data = quotesData));*/
}
}

