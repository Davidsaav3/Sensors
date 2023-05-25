import { Component , OnInit} from '@angular/core';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.css', '../app.component.css']
})
export class SensorsComponent implements OnInit{
  mostrar=false;
  mostrar2= false;

  title = 'HTTP using native fetch API';
  private url: string = 'http://localhost:5172/api/get/sensors_types';
  data: any;

  ngOnInit(): void {
    fetch(this.url)
    .then((response) => response.json())
    .then((quotesData) => (this.data = quotesData));
}
}
