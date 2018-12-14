import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GamesComponent } from './games/games.component';
import { RatingsComponent } from './ratings/ratings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchGameComponent } from './search-game/search-game.component';
import { FiltersComponent } from './filters/filters.component';

import { GameService } from './game.service';
import { MessageService } from './message.service';
import { TagService } from './tag.service';
import { ReviewService } from './review.service';

@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    RatingsComponent,
    DashboardComponent,
    ReviewsComponent,
    PaginationComponent,
    SearchGameComponent,
    FiltersComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [ GameService, MessageService, TagService, ReviewService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
