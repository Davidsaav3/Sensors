import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DevicesComponent } from './pages/devices/devices.component';
import { DevicesNewComponent } from './pages/devices/devices-new/devices-new.component';
import { DevicesEditComponent } from './pages/devices/devices-edit/devices-edit.component';
import { DevicesListComponent } from './pages/devices/devices-list/devices-list.component';

import { SensorsComponent } from './pages/sensors/sensors.component';
import { MapComponent } from './pages/map/map.component';
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
        children: [
          {
            path: ':id',
            component: DevicesNewComponent
          },
          {
            path: '**',
            component: DevicesNewComponent
          }
        ]
      },
      {
        path: 'edit',
        children: [
          {
            path: ':id',
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
