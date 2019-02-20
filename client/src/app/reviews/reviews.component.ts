import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Game } from '../game';
import { Review } from '../review';
import { ReviewService } from '../review.service';
import { GameService } from '../game.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})

export class ReviewsComponent implements OnInit {

  reviews: Review[];
  review: Review;
  game: Game;

  rate = 0;

  isCollapsed = true;

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private gameService: GameService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    const gameId = +this.route.snapshot.paramMap.get('id');
      this.review = this.newReview(gameId);
      return this.reviewService.getReviews(gameId)
      .subscribe(reviews => this.reviews = reviews);
    this.getGame();
  }

  getGame(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.gameService.getGame(id)
      .subscribe(game => this.game = game);
  }

  newReview(gameId: number): Review {
    const review = new Review();
    review.game = gameId;
    review.rate = this.rate;
    review.text = '';
    review.review_date = new Date();
    return review;
  }

  onRated(event: number) {
    this.review.rate = event;
  }

  onSubmit(): void {
    this.isCollapsed = true;
    this.reviewService.addReview(this.review)
      .subscribe(review => {
        if (review) {
          this.reviews.unshift(review);
          this.review = this.newReview(review.game);
          this.gameService.updateGame(this.game).subscribe(game => this.game = game);
        }
    });
  }

    updateGame(game: Game) {
      this.gameService.updateGame(game);
  }

}
