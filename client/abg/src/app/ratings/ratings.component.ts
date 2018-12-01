import { Component, OnInit } from '@angular/core';
import { Game } from '../game';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css'],
})

export class RatingsComponent implements OnInit {

  game: Game = {
    id: 1,
    name: "Wizard",
    rules: "Rules",
    price: 10,
    rate: 5,
    min_age: 10,
    max_age: 100,
    min_num_of_players: 1,
    max_num_of_players: 100,
    creator: "KAISSA",
    tags: ["Μπλόφα", "Χαρτιά"],
  }

  readonly = false;
  hovered = 0;

  constructor() {
  }

  ngOnInit() {
  }

}
