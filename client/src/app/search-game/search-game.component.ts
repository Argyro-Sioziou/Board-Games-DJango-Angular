import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

import { GameService } from '../game.service';

import { Game } from '../game';

import {
   debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-search-game',
  templateUrl: './search-game.component.html',
  styleUrls: ['./search-game.component.css']
})

export class SearchGameComponent implements OnInit {

  games$: Observable<Game[]>;

  private searchTerms = new Subject<String>();

  private arrowKeyLocation = 0;

  constructor(private gameService: GameService, private router: Router) { }

  ngOnInit(): void {
  this.games$ = this.searchTerms.pipe(
    // wait 300ms after each keystroke before considering the term
    debounceTime(300),

    // ignore new term if same as previous term
    distinctUntilChanged(),

    // switch to new search observable each time the term changes
    switchMap((term: string) => this.gameService.searchGames(term)),
  );
}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  arrowNavigation(event: KeyboardEvent) {
    switch (event.keyCode) {
        case 38: // this is the ascii of arrow up
                 if (this.arrowKeyLocation !== 0 ) {
                   this.arrowKeyLocation--;
                 }
                 break;
        case 40: // this is the ascii of arrow down
                 this.arrowKeyLocation++;
                 break;
    }
  }

}
