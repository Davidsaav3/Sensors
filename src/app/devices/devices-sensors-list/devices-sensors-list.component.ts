import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-devices-sensors-list',
  templateUrl: './devices-sensors-list.component.html',
  styleUrls: ['./devices-sensors-list.component.css', '../../app.component.css']
})
export class DevicesSensorsListComponent implements OnInit{
  title = 'HTTP using native fetch API';
  private url: string = 'http://localhost:5172/api/get/sensors_types';
  data: any;

  ngOnInit(): void {
    fetch(this.url)
    .then((response) => response.json())
    .then((quotesData) => (this.data = quotesData));
}
}
