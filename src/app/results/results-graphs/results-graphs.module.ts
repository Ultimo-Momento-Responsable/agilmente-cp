import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { ResultsGraphsPageRoutingModule } from './results-graphs-routing.module';

import { ResultsGraphsPage } from './results-graphs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResultsGraphsPageRoutingModule,
    HttpClientModule
  ],
  declarations: [ResultsGraphsPage]
})
export class ResultsGraphsPageModule {}
