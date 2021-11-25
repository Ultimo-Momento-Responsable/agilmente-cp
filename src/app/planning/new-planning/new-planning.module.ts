import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { NewPlanningPageRoutingModule } from './new-planning-routing.module';

import { NewPlanningPage } from './new-planning.page';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewPlanningPageRoutingModule,
    Ionic4DatepickerModule,
    NgbModule
  ],
  declarations: [NewPlanningPage]
})
export class NewPlanningPageModule {}
