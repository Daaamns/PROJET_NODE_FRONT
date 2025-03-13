import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bar } from '../models/types/Bar';

@Injectable({
  providedIn: 'root',
})
export class BarService {
  private http = inject(HttpClient);
  constructor() {}

  getBars(): Observable<Bar[]> {
    return this.http.get<Bar[]>('http://localhost:3000/bars');
  }

  getBarById(id: number): Observable<Bar> {
    return this.http.get<Bar>(`http://localhost:3000/bars/${id}`);
  }
}
