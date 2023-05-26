import { Component , OnInit} from '@angular/core';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.css', '../app.component.css']
})

export class SensorsComponent implements OnInit{
  mostrar=false;
  mostrar2= false;

  private url1: string = 'http://localhost:5172/api/get/sensors_types';
  data: any;
  private url2: string = 'http://localhost:5172/api/post/sensors_types';
  data2: any;
  private url3: string = 'http://localhost:5172/api/delete/sensors_types';
  data3: any;

  contenido = {
    type: '',    
    metric: '', 
    description: '',
    errorvalue: null,
    valuemax: null,
    valuemin: null,
  }

  contenido2 = {
    id: 26,    
  }

  eliminar(){
    fetch(this.url3, {
      method: "DELETE",
      body: JSON.stringify(this.contenido2),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    .then(json => console.log(json));
  }

  submit(){
    fetch(this.url2, {
      method: "POST",
      body: JSON.stringify(this.contenido),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    .then(json => console.log(json));
  }

  ngOnInit(): void {
      fetch(this.url1)
      .then((response) => response.json())
      .then((quotesData) => (this.data = quotesData));

      for(let quote of this.data) {
        this.contenido.type=  quote.type;
        this.contenido.metric=  quote.metric; 
        this.contenido.description=  quote.description;
        this.contenido.errorvalue=  quote.errorvalue;
        this.contenido.valuemax=  quote.valuemax;
        this.contenido.valuemin=  quote.valuemin;
        console.log(this.contenido.type);
      }
  }
}
