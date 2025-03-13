import { Component } from '@angular/core';
import { Bar } from '../models/types/Bar';
import { ActivatedRoute } from '@angular/router';
import { BarService } from '../services/bar.service';
import { BiereService } from '../services/biere.service';
import { Biere } from '../models/types/Biere';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-biere-panel',
  imports: [NgFor],
  templateUrl: './biere-panel.component.html',
  styleUrl: './biere-panel.component.scss'
})
export class BierePanelComponent {
  id!: number;
  bar!: Bar;
  private biereService: BiereService = new BiereService()
  beers!: Biere[]

  constructor(private route: ActivatedRoute, private barService: BarService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      console.log('ID récupéré :', this.id);
    });

    this.barService.getBarById(this.id).subscribe((data) => {
      this.bar = data;
      console.log(this.bar);
    });
    this.biereService.getBieres(this.id).forEach(item => {
      this.beers = item;
    });
  }

}
