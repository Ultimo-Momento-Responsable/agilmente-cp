import { Component, OnInit } from '@angular/core';
import { GamesApiService } from 'src/app/games/services/games-api.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {

  constructor(private service: GamesApiService) { }
  games: any[] = [];
  skeletonLoading = true;
  
  ngOnInit() {
    this.service.getGames().subscribe(res => {
      this.games = res;
      this.skeletonLoading = false;
    })
  }

}
