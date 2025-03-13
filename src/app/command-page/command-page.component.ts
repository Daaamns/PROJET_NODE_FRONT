import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarService } from '../services/bar.service';
import { Bar } from '../models/types/Bar';

@Component({
  selector: 'app-command-page',
  standalone: true,
  imports: [],
  templateUrl: './command-page.component.html',
  styleUrl: './command-page.component.scss',
})
export class CommandPageComponent {
  id!: number;
  bar!: Bar;

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
  }
}
