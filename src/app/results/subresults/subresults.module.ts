import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { SubresultsPageRoutingModule } from './subresults-routing.module';

import { SubresultsPage } from './subresults.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubresultsPageRoutingModule,
    RouterModule,
    HttpClientModule
  ],
  declarations: [SubresultsPage]
})
export class SubresultsPageModule {}
