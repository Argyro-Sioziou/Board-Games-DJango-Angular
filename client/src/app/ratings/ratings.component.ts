import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css'],
})

export class RatingsComponent implements OnInit {

  @Input()
  readonly: String;

  @Input()
  rate: number;

  @Output()
  rated = new EventEmitter<number>();

  hovered = 0;

  constructor() {
  }

  onChange() {
    this.rated.emit(this.rate);
  }


  ngOnInit() {
  }

}
