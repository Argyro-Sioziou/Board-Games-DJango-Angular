import { Component, OnInit, Input } from '@angular/core';

import { Game } from '../game';
import { GameService } from '../game.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  url = "";

  games: Game[] = [];

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.getGames(this.url);
  }

  getGames(url): void {
    this.gameService.filterGames(url)
      .subscribe(games => this.games = games);
  }

  onFiltered(event: string) {
    this.url = event;
    this.getGames(event);
  }

}
