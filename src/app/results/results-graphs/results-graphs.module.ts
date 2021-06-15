import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResultsGraphsPageRoutingModule } from './results-graphs-routing.module';

import { ResultsGraphsPage } from './results-graphs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResultsGraphsPageRoutingModule
  ],
  declarations: [ResultsGraphsPage]
})
export class ResultsGraphsPageModule {}
