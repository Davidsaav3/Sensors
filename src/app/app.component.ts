import { Component , OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  activeLang = 'es';
  constructor(
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang(this.activeLang);
  }

  changeLenguaje(lang: any) {
    this.activeLang = lang;
    this.translate.use(lang);
  }
  
  title = 'Sensors';
}
