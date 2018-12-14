import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Review } from '../review';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})

export class ReviewsComponent implements OnInit {

  reviews: Review[];
  review: Review;

  rate = 0;

  private isCollapsed = true;

  constructor(private route: ActivatedRoute, private reviewService: ReviewService ) { }

  ngOnInit() {
    const gameId = +this.route.snapshot.paramMap.get('id');
      this.review = this.newReview(gameId);
      return this.reviewService.getReviews(gameId)
      .subscribe(reviews => this.reviews = reviews);
  }

  newReview(gameId: number): Review {
    const review = new Review();
    review.game = gameId;
    review.rate = this.rate;
    review.text = '';
    review.review_date = new Date();
    return review;
  }

  onRated(rate: number) {
    this.rate = rate;
  }

  onSubmit(): void {
    this.reviewService.addReview(this.review)
      .subscribe(review => {
        if (review) {
          this.reviews.unshift(review);
          this.review = this.newReview(review.game);
        }
    });
  }
}
