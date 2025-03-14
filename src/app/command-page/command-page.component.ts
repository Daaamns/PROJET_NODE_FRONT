import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarService } from '../services/bar.service';
import { Bar } from '../models/types/Bar';
import { CommandService } from '../services/command.service';
import { Commande } from '../models/types/Commande';
import { TableModule } from 'primeng/table';
import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-command-page',
  standalone: true,
  imports: [
    TableModule,
    NgIf,
    CurrencyPipe,
    DatePipe,
    DialogModule,
    ButtonModule,
    FormsModule,
    SelectButtonModule,
  ],
  templateUrl: './command-page.component.html',
  styleUrl: './command-page.component.scss',
})
export class CommandPageComponent {
  id!: number;
  bar!: Bar;
  commandes!: Commande[];
  private commandService = inject(CommandService);

  visibleEdit: boolean = false;
  visibleDelete: boolean = false;
  selectedCommande!: Commande;

  constructor(private route: ActivatedRoute, private barService: BarService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      console.log('ID récupéré :', this.id);
    });

    this.loadData();
  }

  loadData(): void {
    this.barService.getBarById(this.id).subscribe((data) => {
      this.bar = data;
      console.log(data);
    });

    this.commandService.getOrderByBar(this.id).subscribe((data) => {
      this.commandes = data;
      console.log(this.commandes);
    });
  }

  openEditDialog(commande: Commande) {
    this.selectedCommande = { ...commande };
    this.visibleEdit = true;
  }

  saveCommande() {
    const currentStatus = this.selectedCommande.status;
    if (
      typeof this.selectedCommande.status === 'object' &&
      'value' in this.selectedCommande.status
    ) {
      this.selectedCommande.status = this.selectedCommande.status.value;
    }

    this.commandService
      .updateOrder(this.selectedCommande.id, this.selectedCommande)
      .subscribe(() => {
        this.visibleEdit = false;
        this.loadData();
      });
  }

  openDeleteDialog(commande: Commande) {
    this.selectedCommande = commande;
    this.visibleDelete = true;
  }

  deleteCommande() {
    this.commandService.deleteOrder(this.selectedCommande.id).subscribe(() => {
      this.visibleDelete = false;
      this.loadData();
    });
  }
}
