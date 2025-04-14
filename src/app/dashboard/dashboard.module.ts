import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MapComponent } from '../map/map.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataFormComponent } from '../data-form/data-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
    DashboardComponent,
    MapComponent,
    DataFormComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule, ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule, MatIconModule
  ],
  exports: [
    MapComponent,
    DataFormComponent
  ]
})
export class DashboardModule { }
