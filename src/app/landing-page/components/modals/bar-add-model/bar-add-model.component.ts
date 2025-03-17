import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Bar } from '../../../../models/types/Bar';
import { BarService } from '../../../../services/bar.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-bar-add-model',
  standalone: true,
  imports: [DialogModule, ButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './bar-add-model.component.html',
  styleUrl: './bar-add-model.component.scss',
})
export class BarAddModelComponent {
  @Input() visible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() barAdded = new EventEmitter<Bar>();
  barForm: FormGroup;

  constructor(private barService: BarService, private fb: FormBuilder) {
    // Initialiser le FormGroup avec des contrôles
    this.barForm = this.fb.group({
      nom: ['', Validators.required],
      adresse: ['', Validators.required],
      tel: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required],
    });
  }

  saveBar() {
    if (this.barForm.valid) {
      const bar: Bar = this.barForm.value;
      this.barService.postBar(bar).subscribe({
        next: (newBar) => {
          this.barAdded.emit(newBar);
          this.close.emit();
          this.barForm.reset();
        },
        error: (err) => {
          console.error("Erreur lors de l'ajout du bar", err);
        },
      });
    }
  }

  cancel() {
    this.close.emit();
    this.barForm.reset();
  }
}
