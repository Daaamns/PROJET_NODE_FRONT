import { Component } from '@angular/core';
import { Bar } from '../models/types/Bar';
import { ActivatedRoute } from '@angular/router';
import { BarService } from '../services/bar.service';
import { BiereService } from '../services/biere.service';
import { Biere } from '../models/types/Biere';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-biere-page',
  standalone: true,
  imports: [NgFor,ReactiveFormsModule, NgIf, TableModule, CurrencyPipe, ButtonModule, DialogModule],
  templateUrl: './biere-page.component.html',
  styleUrl: './biere-page.component.scss'
})
export class BierePageComponent {

  biereUpdate = new FormGroup({
    id: new FormControl(),
    name: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    degree: new FormControl(),
    prix: new FormControl(),
    bar_id: new FormControl(),
  });
  protected readonly biereForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    degree: new FormControl(),
    prix: new FormControl(),
    bar_id: new FormControl(),
  });
  visibleDelete!: boolean;
  
  id!: number;
  bar!: Bar;
  private biereService: BiereService = new BiereService()
  beers: Biere[] = []
  visibleEdit!: boolean;
  selectedBiere!: Biere;

  constructor(private route: ActivatedRoute, private barService: BarService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.loadData();
  }
  loadData(): void {
    this.barService.getBarById(this.id).subscribe((data) => {
      this.bar = data;
    });
    this.biereService.getBieres(this.id).subscribe((data) =>{
      this.beers = data;
    });
  }
  onUpdateSubmit() {
    if (this.biereUpdate.valid){
      let beer : Biere = this.biereUpdate.value as Biere
      beer.id = this.selectedBiere.id;
      this.biereService.updateBiere(beer).subscribe((data) =>{
        console.log(data);
        
      })
    }
    console.log(this.biereUpdate.value);
    
    this.loadData()
    }
  onAddSubmit() {
    if (this.biereForm.valid){
      let beer : Biere = this.biereForm.value as Biere
      this.biereService.addBiere(this.id, beer).subscribe((data) =>{
      })
    }
    this.loadData()
  }
  openEditDialog(biere: Biere) {
      this.selectedBiere = { ...biere };
      console.log(this.selectedBiere);
      
      this.visibleEdit = true;
  }
  openDeleteDialog(biere: Biere) {
    this.selectedBiere = biere;
    this.visibleDelete = true;
  
  }
  deleteCommande() {
    this.biereService.deleteBiere(this.selectedBiere).subscribe(() => {
      this.visibleDelete = false;
      this.loadData();
    });
  }

}
