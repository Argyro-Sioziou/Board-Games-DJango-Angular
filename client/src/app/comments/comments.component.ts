import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute} from '@angular/router';

import { Comment } from '../comment';
import { CommentService } from '../comment.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {

  @Input()
  reviewId: number;

  comments: Comment[];

  comment: Comment;

  constructor(
    private route: ActivatedRoute,
    private commentService: CommentService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.comment = this.newComment(this.reviewId);
    return this.commentService.getComments(this.reviewId)
      .subscribe(comments => this.comments = comments);
  }

  newComment(reviewId: number): Comment {
    const comment = new Comment();
    comment.review = reviewId;
    comment.profile = 5;
    comment.text = '';
    comment.comment_date = new Date();
    return comment;
  }

  onSubmit(): void {
    this.commentService.addComment(this.comment)
      .subscribe(comment => {
        if (comment) {
          this.comments.unshift(comment);
          this.comment = this.newComment(comment.review);
        }
      });
  }

}
