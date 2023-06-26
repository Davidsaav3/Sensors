import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './common/navbar.component';
import { MapComponent } from './pages/map/map.component';
import { DevicesListComponent } from './pages/devices/devices-list/devices-list.component';
import { DevicesNewListComponent } from './pages/devices/devices-new/devices-new_list/devices-new-list.component';
import { DevicesEditMapComponent } from './pages/devices/devices-edit/devices-edit-map/devices-edit-map.component';
import { DevicesNewMapComponent } from './pages/devices/devices-new/devices-new-map/devices-new-map.component';
import { DevicesComponent } from './pages/devices/devices.component';
import { DevicesNewComponent } from './pages/devices/devices-new/devices-new.component';
import { DevicesEditComponent } from './pages/devices/devices-edit/devices-edit.component';
import { SensorsComponent } from './pages/sensors/sensors.component';
import { DevicesEditListComponent } from './pages/devices/devices-edit/devices-edit-list/devices-edit-list.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { DataSharingService } from './services/data_sharing.service';
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
  declarations: [
    DevicesNewMapComponent,
    DevicesNewListComponent,
    AppComponent,
    NavbarComponent,
    MapComponent,
    DevicesListComponent,
    DevicesEditMapComponent,
    DevicesComponent,
    SensorsComponent,
    DevicesNewComponent,
    DevicesEditComponent,
    DevicesEditListComponent,
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
