import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

import { User } from './user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private usersUrl = 'api/users';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getUsers(): Observable<User[]> {
  return this.http.get<User[]>(this.usersUrl)
    .pipe(
      tap(_ => this.log('fetched users')),
      catchError(this.handleError('getUsers', []))
    );
  }

  /** POST: add a new user to the server */
  addUser(user: User): Observable<User> {
    let url = `api/users`;
    return this.http.post<User>(url, user, httpOptions).pipe(
      tap((user: User) => this.log(`added user w/ id=${user.id}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  /** POST: add a new user to the server */
 newUser (user: User): Observable<User> {
   return this.http.post<User>(this.usersUrl, user, httpOptions).pipe(
     tap((user: User) => this.log(`added user w/ id=${user.id}`)),
     catchError(this.handleError<User>('addUser'))
   );
}


  private log(message: string): void {
    this.messageService.add('UserService: ' + message);
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
