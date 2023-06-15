import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataSharingService } from './../../../services/data_sharing.service';

@Component({
  selector: 'app-devices-new',
  templateUrl: './devices-new.component.html',
  styleUrls: ['../../../app.component.css']
})
export class DevicesNewComponent  implements OnInit{

  sharedData: string = '';

  constructor(private router: Router,private dataSharingService: DataSharingService) { 
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    this.formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    console.log(this.formattedDateTime)
  }

  post_device: string = 'http://localhost:5172/api/post/device_configurations';

  data: any;
  activeLang='en';
  formattedDateTime= '';

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
    createdAt: this.formattedDateTime,
    upadatedAt: this.formattedDateTime
  }

  ngOnInit(): void {
    /*fetch(this.url)
    .then((response) => response.json())
    .then((quotesData) => (this.data = quotesData));*/
  }
  
updateSharedData() {
    this.dataSharingService.updateSharedData(this.sharedData);
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

