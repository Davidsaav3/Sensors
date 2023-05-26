import { Component , OnInit} from '@angular/core';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.css', '../app.component.css']
})

export class SensorsComponent implements OnInit{
  mostrar=false;
  mostrar2= false;

  private url: string = 'http://localhost:5172/api/get/sensors_types';
  data: any;
  private url2: string = 'http://localhost:5172/api/id/sensors_types/';
  data2: any;

  contenido = {
    type: '',    
    metric: '', 
    description: '',
    errorvalue: null,
    valuemax: null,
    valuemin: null,
  }

  submit(){
    fetch('http://localhost:5172/api/post/sensors_types', {
      method: "POST",
      body: JSON.stringify(this.contenido),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    .then(json => console.log(json));
  }

  ngOnInit(): void {
      fetch(this.url)
      .then((response) => response.json())
      .then((quotesData) => (this.data = quotesData));

      fetch(this.url2)
      .then((response) => response.json())
      .then((quotesData) => (this.data2 = quotesData));
  }
}
