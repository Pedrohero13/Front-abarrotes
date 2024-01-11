
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Auth } from '../model/auth';
import { Token } from '@angular/compiler';
import { User } from '../model/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user:any;
  apiURL = 'http://localhost:8000';
  constructor(private httpClient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  login(user: Auth): Observable<Token> {
    return this.httpClient
      .post<Token>(
        this.apiURL +"/empleados/token",
        JSON.stringify(user),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  getme(): Observable<User> {
    return this.httpClient
      .get<User>(
        this.apiURL+ "/empleados/me/"
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => {
      return errorMessage;
    });
  }
}
