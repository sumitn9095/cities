import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MapComponent } from '../map/map.component';



@NgModule({
  declarations: [
    DashboardComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  exports: [
    MapComponent
  ]
})
export class DashboardModule { }
