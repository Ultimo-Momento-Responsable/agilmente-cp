import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader'
import { SharedGamesModule } from './shared-games/shared-games.module';
import { IonicModule } from '@ionic/angular';

import { GamesPageRoutingModule } from './games-routing.module';

import { GamesPage } from './games.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GamesPageRoutingModule,
    SharedGamesModule,
    NgxSkeletonLoaderModule
  ],
  declarations: [GamesPage]
})
export class GamesPageModule {}
