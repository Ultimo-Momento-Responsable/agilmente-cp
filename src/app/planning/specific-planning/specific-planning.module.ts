import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';

import { IonicModule } from '@ionic/angular';

import { SpecificPlanningPageRoutingModule } from './specific-planning-routing.module';

import { SpecificPlanningPage } from './specific-planning.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpecificPlanningPageRoutingModule,
    ReactiveFormsModule,
    Ionic4DatepickerModule
  ],
  declarations: [SpecificPlanningPage]
})
export class SpecificPlanningPageModule {}
