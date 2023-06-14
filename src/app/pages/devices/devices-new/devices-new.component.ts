import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-devices-new',
  templateUrl: './devices-new.component.html',
  styleUrls: ['../../../app.component.css']
})
export class DevicesNewComponent  implements OnInit{
  
  constructor(private router: Router) { }

  post_device: string = 'http://localhost:5172/api/post/device_configurations';

  data: any;
  activeLang='en';

  mostrar=true;
  ver_rec= false;
  mostrar3= true;
  change= false;

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

  ngOnInit(): void {
    /*fetch(this.url)
    .then((response) => response.json())
    .then((quotesData) => (this.data = quotesData));*/
  }

  submit(){
  }

  submitForm(loginForm: any) {
    if (loginForm.valid) {
      fetch(this.post_device, {
        method: "POST",
        body: JSON.stringify(this.contenido),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json()) 
      this.router.navigate(['/devices']);

      //console.log('Formulario válido');
    }
    else {
      //console.log('Formulario inválido');
    }
  }
}

