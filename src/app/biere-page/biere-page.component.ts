import { Component } from '@angular/core';
import { Bar } from '../models/types/Bar';
import { ActivatedRoute } from '@angular/router';
import { BarService } from '../services/bar.service';
import { BiereService } from '../services/biere.service';
import { Biere } from '../models/types/Biere';
import { NgFor } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-biere-page',
  standalone: true,
  imports: [NgFor,ReactiveFormsModule],
  templateUrl: './biere-page.component.html',
  styleUrl: './biere-page.component.scss'
})
export class BierePageComponent {
  protected readonly biereForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    degree: new FormControl(),
    prix: new FormControl(),
    bar_id: new FormControl(),
  });
  onSubmit() {
    console.log(this.biereForm.valid);
    console.log(this.biereForm.value.name)
    console.log(this.biereForm.value.description)
    console.log(this.biereForm.value.degree)
    console.log(this.biereForm.value.prix)
    if (this.biereForm.valid){
      let beer : Biere = this.biereForm.value as Biere
      this.biereService.addBiere(this.id, beer).subscribe((data) =>{
        console.log(data);
        
      })
    }
  }
  id!: number;
  bar!: Bar;
  private biereService: BiereService = new BiereService()
  beers: Biere[] = []

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
    this.biereService.getBieres(this.id).subscribe((data) =>{
      this.beers = data;
      console.log(data);
    });
  }

}
