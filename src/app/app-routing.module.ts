import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DevicesComponent } from './devices/devices.component';
import { DevicesNewComponent } from './devices/devices-new/devices-new.component';
import { DevicesEditComponent } from './devices/devices-edit/devices-edit.component';
import { DevicesListComponent } from './devices/devices-list/devices-list.component';

import { SensorsComponent } from './sensors/sensors.component';
import { MapComponent } from './map/map.component';
const routes: Routes = [
  {
    path:'devices', component: DevicesComponent,
    children: [
      {
        path: '',
        component: DevicesListComponent
      },
      {
        path: 'new',
        component: DevicesNewComponent
      },
      {
        path: ':id',
        children: [
          {
            path: 'edit',
            component: DevicesEditComponent
          },
          {
            path: '**',
            component: DevicesComponent
          }
        ]
      },
      {
        path: '**',
        component: DevicesComponent
      },
    ]
  },
  { path:'sensors', component: SensorsComponent
  },
  { path:'map', component: MapComponent
  },
  {
    path:'**',
    redirectTo: 'devices'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
