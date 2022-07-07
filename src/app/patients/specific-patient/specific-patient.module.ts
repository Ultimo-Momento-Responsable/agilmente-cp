import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedPatientsModule } from '../shared-patients/shared-patients.module';
import { SpecificPatientPage } from './specific-patient.page';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomDatePipe } from 'src/app/shared/pipes/custom-date.pipe';

const routes: Routes = [
  {
    path: '',
    component: SpecificPatientPage,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes), 
    SharedPatientsModule, 
    ReactiveFormsModule, 
    FormsModule,
    NgbModule,
    NgxSkeletonLoaderModule,
    SharedModule
  ],
  declarations: [SpecificPatientPage],
  providers: [CustomDatePipe]
})
export class SpecificPatientPageModule {}
