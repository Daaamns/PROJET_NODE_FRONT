import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Bar } from '../../../../models/types/Bar';
import { BarService } from '../../../../services/bar.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-bar-edit-model',
  standalone: true,
  imports: [DialogModule, ButtonModule, FormsModule, NgIf],
  templateUrl: './bar-edit-model.component.html',
  styleUrl: './bar-edit-model.component.scss',
})
export class BarEditModelComponent {
  @Input() visible: boolean = false;
  @Input() bar: Bar | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() barUpdated = new EventEmitter<Bar>();
  @Output() barDeleted = new EventEmitter<number>();

  constructor(private barService: BarService) {}

  saveBar() {
    if (this.bar) {
      this.barService.updateBar(this.bar.id, this.bar).subscribe({
        next: (updatedBar) => {
          this.barUpdated.emit(updatedBar);
          this.close.emit();
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour du bar', err);
        },
      });
    } else {
      console.error('Le bar est null, impossible de le mettre à jour.');
    }
  }
  deleteBar() {
    if (!this.bar) {
      console.error('Le bar est null, impossible de le supprimer.');
      return;
    }

    this.barService.deleteBar(this.bar.id).subscribe({
      next: () => {
        this.barDeleted.emit(this.bar!.id);
        this.close.emit();
      },
      error: (err) => {
        console.error('Erreur lors de la suppression du bar', err);
      },
    });
  }

  cancel() {
    this.close.emit();
  }
}
