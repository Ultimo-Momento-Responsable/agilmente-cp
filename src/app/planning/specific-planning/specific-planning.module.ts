import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { SharedModule } from 'src/app/shared/shared.module';

import { IonicModule } from '@ionic/angular';

import { SpecificPlanningPageRoutingModule } from './specific-planning-routing.module';
import { SpecificPlanningPage } from './specific-planning.page';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    IonicModule,
    SpecificPlanningPageRoutingModule,
    ReactiveFormsModule,
    Ionic4DatepickerModule,
    NgbModule    
  ],
  declarations: [SpecificPlanningPage]
})
export class SpecificPlanningPageModule {}
