import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private bar_id!: number
  private http = inject(HttpClient);
  constructor(bar_id: number) { 
    this.bar_id = bar_id;
  }
}
