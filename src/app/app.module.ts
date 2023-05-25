import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MapComponent } from './map/map.component';
import { DevicesListComponent } from './devices/devices-list/devices-list.component';
import { DevicesMapComponent } from './devices/devices-map/devices-map.component';
import { DevicesComponent } from './devices/devices.component';
import { SensorsEditComponent } from './sensors/sensors-edit/sensors-edit.component';
import { SensorsNewComponent } from './sensors/sensors-new/sensors-new.component';
import { DevicesNewComponent } from './devices/devices-new/devices-new.component';
import { DevicesEditComponent } from './devices/devices-edit/devices-edit.component';
import { SensorsComponent } from './sensors/sensors.component';
import { DevicesSensorsListComponent } from './devices/devices-sensors-list/devices-sensors-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MapComponent,
    DevicesListComponent,
    DevicesMapComponent,
    DevicesComponent,
    SensorsComponent,
    SensorsEditComponent,
    SensorsNewComponent,
    DevicesNewComponent,
    DevicesEditComponent,
    DevicesSensorsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
