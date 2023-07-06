import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from "@ng-select/ng-select";

import { NavbarComponent } from './common/navbar.component';
import { DevicesComponent } from './pages/devices/devices.component';
import { DevicesMapComponent } from './pages/devices/devices-map/devices-map.component';
import { DeviceComponent } from './pages/device.component';
import { DevicesNewComponent } from './pages/devices/devices-new/devices-new.component';
import { DevicesEditComponent } from './pages/devices/devices-edit/devices-edit.component';
import { SensorsComponent } from './pages/sensors/sensors.component';
import { SensorsListComponent } from './pages/devices/sensors-list/sensors-list.component';
import { DataSharingService } from './services/data_sharing.service';


@NgModule({
  declarations: [
    DevicesMapComponent,
    AppComponent,
    NavbarComponent,
    DevicesComponent,
    SensorsListComponent,
    SensorsComponent,
    DevicesNewComponent,
    DevicesEditComponent,
    DeviceComponent,
  ],
  imports: [
    NgSelectModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [ HttpClient ]
      }
    })
  ],
  providers: [DataSharingService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
