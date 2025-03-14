import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Bar } from '../models/types/Bar';

@Injectable({
  providedIn: 'root',
})
export class BarService {
  private http = inject(HttpClient);
  private apiUrl: string = 'http://localhost:3000/';
  constructor() {}

  handleFailure(err: HttpErrorResponse): void {
    throw 'Connection to DB failure: ' + err.message;
  }

  getBars(): Observable<Bar[]> {
    return this.http.get<Bar[]>(`${this.apiUrl}bars`).pipe(
      catchError((err) => {
        throw this.handleFailure(err);
      })
    );
  }

  getBarById(id: number): Observable<Bar> {
    return this.http.get<Bar>(`${this.apiUrl}bars/${id}`).pipe(
      catchError((err) => {
        throw this.handleFailure(err);
      })
    );
  }

  postBar(bar: Bar): Observable<Bar> {
    console.log(bar);

    return this.http.post<Bar>(`${this.apiUrl}bars`, bar).pipe(
      catchError((err) => {
        throw this.handleFailure(err);
      })
    );
  }

  updateBar(id: number, bar: Bar): Observable<Bar> {
    return this.http.put<Bar>(`${this.apiUrl}bars/${id}`, bar).pipe(
      catchError((err) => {
        throw this.handleFailure(err);
      })
    );
  }

  deleteBar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}bars/${id}`).pipe(
      catchError((err) => {
        throw this.handleFailure(err);
      })
    );
  }
}
