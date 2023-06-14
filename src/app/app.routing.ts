import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DevicesComponent } from './devices/devices.component';
import { SensorsComponent } from './pages/sensors/sensors.component';
import { MapComponent } from './pages/devices/map/map.component';

const routes: Routes = [
  {
    path:'devices', component: DevicesComponent
  },
  { path:'sensors', component: SensorsComponent
  },
  { path:'map', component: MapComponent
  },
  {
    path:'**',
    redirectTo: 'devices'
  },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
