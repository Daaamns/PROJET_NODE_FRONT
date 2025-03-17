import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Bar } from '../models/types/Bar';
import { BarService } from '../services/bar.service';
import { CardComponent } from './components/bar-card/card.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { BarEditModelComponent } from './components/modals/bar-edit-model/bar-edit-model.component';
import { BarAddModelComponent } from './components/modals/bar-add-model/bar-add-model.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    BarEditModelComponent,
    NgFor,
    CardComponent,
    ButtonModule,
    BarAddModelComponent,
    FormsModule,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  bars: Bar[] = [];
  allBars: Bar[] = [];
  private barService = inject(BarService);
  selectedBar!: Bar | null;
  visibleEdit: boolean = false;
  visibleAdd: boolean = false;
  searchCity: string = '';
  searchName: string = '';

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.barService.getBars().subscribe((data) => {
      this.bars = data;
      this.allBars = data;
    });
  }

  filterByCity(): void {
    if (!this.searchCity.trim()) {
      return;
    }

    this.barService.getBarsByCity(this.searchCity).subscribe((data) => {
      if (data.length === 0) {
        this.loadData();
      } else {
        this.bars = data;
      }
    });
  }

  filterByName(): void {
    if (!this.searchName.trim()) {
      return;
    }

    this.barService.getBarsByName(this.searchName).subscribe((data) => {
      if (data.length === 0) {
        this.loadData();
      } else {
        this.bars = data;
      }
    });
  }

  resetFilters(): void {
    this.bars = [...this.allBars];
    this.searchCity = '';
    this.searchName = '';
  }

  editBar(id: number): void {
    this.selectedBar = this.bars.find((bar) => bar.id === id) || null;
    this.visibleEdit = true;
  }

  onBarUpdated(updatedBar: Bar) {
    const index = this.bars.findIndex((bar) => bar.id === updatedBar.id);
    if (index !== -1) {
      this.bars[index] = updatedBar;
    }
  }

  addBar(): void {
    this.visibleAdd = true;
  }

  onBarAdded(newBar: Bar) {
    this.loadData();
  }

  onBarDeleted(id: number) {
    this.bars = this.bars.filter((bar) => bar.id !== id);
  }
}
