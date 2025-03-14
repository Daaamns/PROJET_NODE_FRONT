import { inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Commande } from '../models/types/Commande';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommandService {
  private http = inject(HttpClient);
  private apiUrl: string = 'http://localhost:3000/';
  constructor() {}

  handleFailure(err: HttpErrorResponse): void {
    throw 'Connection to DB failure: ' + err.message;
  }

  getOrderByBar(id: number): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.apiUrl}bars/${id}/commandes`).pipe(
      catchError((err) => {
        throw this.handleFailure(err);
      })
    );
  }

  updateOrder(id: number, commande: Commande): Observable<Commande> {
    return this.http
      .put<Commande>(`${this.apiUrl}commandes/${id}`, commande)
      .pipe(
        catchError((err) => {
          throw this.handleFailure(err);
        })
      );
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}commandes/${id}`).pipe(
      catchError((err) => {
        throw this.handleFailure(err);
      })
    );
  }
}
