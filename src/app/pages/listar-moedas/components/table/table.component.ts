import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CurrencyService } from '../../../../shared/services/currency.service';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  currencySymbolName : any;
  constructor(private currencyService: CurrencyService) {
    currencyService.getAllNameSymbolPair().subscribe({
      next: (res) => {
        this.currencySymbolName = res;
        console.log(this.currencySymbolName);
        console.log('Dados recebidos:', this.currencySymbolName);
      },
      error: (err) => {
        console.error('Erro ao buscar dados:', err);
      },
    });
  }
}
