import { Component , OnInit} from '@angular/core';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['../../app.component.css']
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
  private url4: string = 'http://localhost:5172/api/update/sensors_types';
  apiUrl: string = 'http://localhost:5172/api/id/sensors_types';


  contenido = {
    id: '', 
    type: '',    
    metric: '', 
    description: '',
    errorvalue: null,
    valuemax: null,
    valuemin: null,
  }

  contenido_new = {
    id: '', 
    type: '',    
    metric: '', 
    description: '',
    errorvalue: null,
    valuemax: null,
    valuemin: null,
  }


  eliminar(id_actual: any){
    var contenido2 = {
      id: id_actual,    
    }
    fetch(this.url3, {
      method: "POST",
      body: JSON.stringify(contenido2),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    this.mostrar2=false;
    this.get();
  }

  update(){
    this.mostrar2=false
    fetch(this.url4, {
      method: "POST",
      body: JSON.stringify(this.contenido),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    this.mostrar2=false;
    this.get();
  }

  submit(){
    fetch(this.url2, {
      method: "POST",
      body: JSON.stringify(this.contenido_new),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    this.mostrar=false;
    this.get();

  }

  num(id_actual: any){
    this.mostrar2=true;
    const url = `${this.apiUrl}/${id_actual}`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
      this.contenido= data[0];
    })
    .catch(error => {
      console.error(error); 
    });
    this.get();
  }

  ngOnInit(): void {
    this.get();
  }

  get(){
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
    }
  }
}
