import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedPatientsModule } from '../shared-patients/shared-patients.module';
import { PatientsPage } from './patients.page';

const routes: Routes = [
    {
      path: '',
      component: PatientsPage,
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes), SharedPatientsModule],
    declarations: [PatientsPage],
  })
export class PatientsPageModule {}
