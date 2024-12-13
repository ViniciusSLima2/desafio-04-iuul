import { Component, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { CurrencyService } from '../../../../shared/services/currency.service';
import { NgOptimizedImage } from '@angular/common';
import { updatePrimaryPalette } from '@primeng/themes';
import { palette } from '@primeng/themes';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, NgOptimizedImage],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @ViewChild('dt2') dt2: Table | undefined;
  currencySymbolName : any;
  constructor(private currencyService: CurrencyService) {
    currencyService.getAllNameSymbolPair().subscribe({
      next: (currencySynbolName) => {
        this.currencySymbolName = currencySynbolName
      },
      error: (err) => {
        console.error('Erro ao buscar dados:', err);
      },
    });
    //const bluePalette = palette('#1d51ceb3');
    const bluePalette = palette('#1d51ce');
    console.log(bluePalette)
    updatePrimaryPalette(bluePalette);
  }

  applyFilterGlobal($event: any, stringVal: string){
    this.dt2!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  focusInput(input: HTMLInputElement){
    input.focus()
  }
}
