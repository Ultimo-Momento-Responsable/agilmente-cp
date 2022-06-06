import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPlanningPageRoutingModule } from './edit-planning-routing.module';

import { EditPlanningPage } from './edit-planning.page';
import { SharedPlanningModule } from '../shared-planning/shared-planning.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedPlanningModule,
    ReactiveFormsModule,
    IonicModule,
    EditPlanningPageRoutingModule
  ],
  declarations: [EditPlanningPage]
})
export class EditPlanningPageModule {}
