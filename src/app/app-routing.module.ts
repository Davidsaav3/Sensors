import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeviceComponent } from './pages/device.component';
import { DevicesNewComponent } from './pages/devices/devices-new/devices-new.component';
import { DevicesEditComponent } from './pages/devices/devices-edit/devices-edit.component';
import { DevicesListComponent } from './pages/devices/devices-list.component';
import { SensorsComponent } from './pages/sensors/sensors.component';

const routes: Routes = [
  {
    path:'devices', component: DeviceComponent,
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
            component: DeviceComponent
          }
        ]
      },
      {
        path: '**',
        component: DeviceComponent
      },
    ]
  },
  { 
    path:'sensors', component: SensorsComponent
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
