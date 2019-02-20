import { Component, OnInit, Input } from '@angular/core';

import { Game } from '../game';
import { GameService } from '../game.service';
import { Picture } from '../picture';
import { PictureService } from '../picture.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  url = "";

  games: Game[] = [];
  pictures: Picture[] = [];

  constructor(private gameService: GameService, private pictureService: PictureService) { }

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
