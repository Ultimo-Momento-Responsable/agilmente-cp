import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanningPageRoutingModule } from './planning-routing.module';

import { PlanningPage } from './planning.page';
import { SharedPlanningModule } from './shared-planning/shared-planning.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanningPageRoutingModule,
    SharedPlanningModule
  ],
  declarations: [PlanningPage],
})
export class PlanningPageModule {}
