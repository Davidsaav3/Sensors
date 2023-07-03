import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['../app.component.css']
})
export class NavbarComponent {
  public activeLang = 'es';

  dup_ok=false;
  dup_not=false;
  ruta='';
  ruta2: any;

  alert_delete: any= false;
  alert_new: any= false;
  not_delete: any= false;
  not_new: any= false;
  guardar_ok: any= false;
  guardar_not: any= false;

  constructor(private translate: TranslateService, public rutaActiva: Router ) {
    this.translate.setDefaultLang(this.activeLang);
    this.ruta= this.rutaActiva.routerState.snapshot.url;
    this.ruta2 = this.ruta.split('/');
    console.log(this.ruta2[2])
  }

  public cambiarLenguaje() {
    setTimeout(() =>{
      this.translate.use(this.activeLang);
    }, 10);
  }
  
}
