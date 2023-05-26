import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css', '../../app.component.css']
})
export class DevicesListComponent implements OnInit{
  title = 'HTTP using native fetch API';
  private url: string = 'http://localhost:5172/api/get/device_configurations';
  data: any;

  private url2: string = 'http://localhost:5172/api/id_device/sensors_devices/';
  data2: any;
  mostrar=true;
  update = {
    id_device: '1'
  };

  ngOnInit(): void {
    fetch(this.url)
    .then((response) => response.json())
    .then((quotesData) => (this.data = quotesData));

    fetch(this.url2)
    .then((response) => response.json())
    .then((quotesData) => (this.data2 = quotesData));
}
}
