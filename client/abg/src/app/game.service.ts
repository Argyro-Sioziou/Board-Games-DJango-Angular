import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Game } from "./game";
import { GAMES } from "./mock_Games";

@Injectable({
  providedIn: 'root'
})

export class GameService {

  constructor() { }

  getGames(): Observable<Game[]> {
    return of(GAMES);
  }

  getGame(id: number): Observable<Game> {
    return of(GAMES.find(game => game.id === id));
  }
}
