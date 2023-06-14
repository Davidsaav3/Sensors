import { Component , OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['../../app.component.css']
})
export class DevicesComponent {

  public activeLang = 'es';

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang(this.activeLang);
  }

  public cambiarLenguaje() {
    this.translate.use(this.activeLang);
  }


}
