import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Tag } from '../tag';
import { TagService } from '../tag.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  @Output()
  url = new EventEmitter<string>();

  tags: Tag[] = [];
  checked: number[] = [];
  min_age: number = 0;
  max_age: number = 100;
  min_num_of_players: number = 1;
  max_num_of_players: number = 100;
  min_price: number = 0;
  max_price: number = 1000;
  min_rate: number = 0;
  max_rate: number = 5;

  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.getTags();
  }

  getTags(): void {
    this.tagService.getTags()
      .subscribe(tags => this.tags = tags);
  }

  filter() {
    let filters = "?";
    if(this.checked.length > 0) {
      filters = filters + "tags=";
      for (let id of this.checked) {
        filters = filters + id.toString() + ',';
      }
      filters = filters.substr(0, filters.length - 1);
      filters = filters + "&";
    }

    if(this.min_age !== 0) {
      filters = filters + "&min_age=" + this.min_age + "&";
    }

    if(this.max_age !== 100) {
      filters = filters + "&max_age=" + this.max_age + "&";
    }

    if(this.min_num_of_players !== 1) {
      filters = filters + "&min_num_of_players=" + this.min_num_of_players + "&";
    }

    if(this.max_num_of_players !== 100) {
      filters = filters + "&max_num_of_players=" + this.max_num_of_players + "&";
    }

    if(this.min_price !== 0) {
      filters = filters + "&min_price=" + this.min_price + "&";
    }

    if(this.max_price !== 1000) {
      filters = filters + "&max_price=" + this.max_price + "&";
    }

    if(this.min_rate !== 0) {
      filters = filters + "&min_rate=" + this.min_rate + "&";
    }

    if(this.max_rate !== 5) {
      filters = filters + "&max_rate=" + this.max_rate + "&";
    }

    this.url.emit(filters);
  }

    onChange(tag:number, isChecked: boolean) {
      if(isChecked) {
        this.checked.push(tag);
      } else {
        let index = this.checked.indexOf(tag);
        this.checked.splice(index,1);
      }
  }
}
