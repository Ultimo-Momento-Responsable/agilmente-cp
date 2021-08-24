import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpecificPlanningPageRoutingModule } from './specific-planning-routing.module';

import { SpecificPlanningPage } from './specific-planning.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpecificPlanningPageRoutingModule
  ],
  declarations: [SpecificPlanningPage]
})
export class SpecificPlanningPageModule {}
