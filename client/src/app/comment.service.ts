import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

import { Comment } from './comment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /** GET comments from the server */
  getComments(reviewId: number): Observable<Comment[]> {
    let url = `api/reviews/${reviewId}/comments`;
    return this.http.get<Comment[]>(url)
      .pipe(
        tap(comments => this.log(`fetched comments`)),
        catchError(this.handleError('getComments', []))
      );
  }

  /** POST: add a new comment to the server */
  addComment(comment: Comment): Observable<Comment> {
    let url = `api/reviews/${comment.review}/comments`;
    return this.http.post<Comment>(url, comment, httpOptions).pipe(
      tap((comment: Comment) => this.log(`added comment w/ id=${comment.id}`)),
      catchError(this.handleError<Comment>('addComment'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string): void {
    this.messageService.add('CommentService: ' + message);
  }

}
