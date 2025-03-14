import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Bar } from '../models/types/Bar';
import { BarService } from '../services/bar.service';
import { CardComponent } from './components/bar-card/card.component';
import { Observable } from 'rxjs';
import { Commande } from '../models/types/Commande';
import { CommandService } from '../services/command.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [NgFor, CardComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  bars: Bar[] = [];
  private barService = inject(BarService);

  ngOnInit(): void {
    this.barService.getBars().subscribe((data) => {
      this.bars = data;
    });
  }
}
