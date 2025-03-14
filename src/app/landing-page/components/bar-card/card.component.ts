import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Bar } from '../../../models/types/Bar';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CardModule, ButtonModule, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() bars!: Bar;
  @Output() edit = new EventEmitter<number>();
}
