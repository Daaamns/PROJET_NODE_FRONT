import { NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Bar } from '../models/types/Bar';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { BarService } from '../services/bar.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [NgFor, RouterLink],
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
