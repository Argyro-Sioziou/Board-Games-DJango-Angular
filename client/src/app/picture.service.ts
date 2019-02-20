import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

import { Picture } from './picture';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class PictureService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /** GET pictures from the server */
  getPictures(gameId: number): Observable<Picture[]> {
    let url = `api/games/${gameId}/pictures`;
    return this.http.get<Picture[]>(url)
      .pipe(
        tap(pictures => this.log(`fetched pictures`)),
        catchError(this.handleError('getPictures', []))
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
    this.messageService.add('ReviewService: ' + message);
  }
}
