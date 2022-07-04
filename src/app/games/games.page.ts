import { Component, OnInit } from '@angular/core';
import { Game, GamesApiService } from 'src/app/games/services/games-api.service';
import { CognitiveDomain, CognitiveDomainApiService } from '../cognitive-domain/service/cognitive-domain-api.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {
  games: Game[] = [];
  skeletonLoading = true;
  selectedCognitiveDomains: string[] = [];
  cognitiveDomains: CognitiveDomain[] = [];

  constructor(private service: GamesApiService, private cdService: CognitiveDomainApiService) { }

  ngOnInit() {
    this.getGames();
    this.cdService.getCognitiveDomains().subscribe(res => this.cognitiveDomains = res);
  }

  /**
   * Obtiene los juegos filtrados por dominio cognitivo
   */
  getGamesFiltered() {
    if (this.selectedCognitiveDomains.length==0){
      this.getGames();
    } else{
      this.service.getGamesFilteredByCD(this.selectedCognitiveDomains).subscribe(res => {
        this.games = res;
      })
    }
  }

  /**
   * Obtiene todos los juegos ordenados alfabéticamente
   */
  getGames(){
    this.service.getGames().subscribe(res => {
      this.games = res;
      this.skeletonLoading = false;
    });
  }

}
