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
import { DevicesListComponent } from './pages/devices/devices-list.component';
import { DevicesEditMapComponent } from './pages/devices/devices-edit/devices-edit-map/devices-edit-map.component';
import { DevicesNewMapComponent } from './pages/devices/devices-new/devices-new-map/devices-new-map.component';
import { DeviceComponent } from './pages/device.component';
import { DevicesNewComponent } from './pages/devices/devices-new/devices-new.component';
import { DevicesEditComponent } from './pages/devices/devices-edit/devices-edit.component';
import { SensorsComponent } from './pages/sensors/sensors.component';
import { DevicesComponent } from './pages/devices/devices/devices.component';
import { DataSharingService } from './services/data_sharing.service';


@NgModule({
  declarations: [
    DevicesNewMapComponent,
    AppComponent,
    NavbarComponent,
    DevicesListComponent,
    DevicesEditMapComponent,
    DevicesComponent,
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
