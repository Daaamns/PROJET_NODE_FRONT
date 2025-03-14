import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Bar } from '../models/types/Bar';
import { BarService } from '../services/bar.service';
import { CardComponent } from './components/bar-card/card.component';
import { BarEditModelComponent } from './components/bar-edit-model/bar-edit-model.component';
import { ButtonModule } from 'primeng/button';
import { BarAddModelComponent } from './components/bar-add-model/bar-add-model.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    BarEditModelComponent,
    NgFor,
    CardComponent,
    ButtonModule,
    BarAddModelComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  bars: Bar[] = [];
  private barService = inject(BarService);
  selectedBar!: Bar | null;
  visibleEdit: boolean = false;
  visibleAdd: boolean = false;

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.barService.getBars().subscribe((data) => {
      this.bars = data;
    });
  }

  editBar(id: number): void {
    this.selectedBar = this.bars.find((bar) => bar.id === id) || {
      id: 0,
      nom: '',
      adresse: '',
      tel: 0,
      email: '',
      description: '',
    };
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
