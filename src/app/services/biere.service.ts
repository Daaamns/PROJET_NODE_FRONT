import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Biere } from '../models/types/Biere';

@Injectable({
  providedIn: 'root',
})
export class BiereService {
  private bar_id!: number;
  private http = inject(HttpClient);
  constructor() {}

  getBieres(): Observable<Biere[]> {
    return this.http.get<Biere[]>(
      'http://localhost:3000/bars/' + this.bar_id + '/biere/'
    );
  }
  addBiere(biere: Biere): Observable<Biere> {
    return this.http.post<Biere>(
      'http://localhost:3000/bars/' + this.bar_id + '/biere/',
      biere
    );
  }
  updateBiere(biere: Biere): Observable<Biere> {
    return this.http.put<Biere>(
      'http://localhost:3000/biere/' + biere.id,
      biere
    );
  }
  deleteBiere(biere: Biere): void {
    this.http.delete<Biere>('http://localhost:3000/biere/' + biere.id);
  }
}
