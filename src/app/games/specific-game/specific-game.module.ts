import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SpecificGamePage } from './specific-game.page';

const routes: Routes = [
  {
    path: '',
    component: SpecificGamePage,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes), 
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [SpecificGamePage]
})
export class SpecificGamePageModule {}
