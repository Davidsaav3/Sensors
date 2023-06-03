import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './common/navbar.component';
import { MapComponent } from './pages/map/map.component';
import { DevicesListComponent } from './pages/devices/devices-list/devices-list.component';
import { DevicesMapComponent } from './pages/devices/devices-map/devices-map.component';
import { DevicesComponent } from './pages/devices/devices.component';
import { DevicesNewComponent } from './pages/devices/devices-new/devices-new.component';
import { DevicesEditComponent } from './pages/devices/devices-edit/devices-edit.component';
import { SensorsComponent } from './pages/sensors/sensors.component';
import { DevicesSensorsListComponent } from './pages/devices/devices-sensors-list/devices-sensors-list.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MapComponent,
    DevicesListComponent,
    DevicesMapComponent,
    DevicesComponent,
    SensorsComponent,
    DevicesNewComponent,
    DevicesEditComponent,
    DevicesSensorsListComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
