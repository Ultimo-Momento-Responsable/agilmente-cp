import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';
import { ResultsPageRoutingModule } from './results-routing.module';
import { ResultsPage } from './results.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResultsPageRoutingModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [RouterModule],
  providers: [],
  declarations: [ResultsPage]
})
export class ResultsPageModule {}
