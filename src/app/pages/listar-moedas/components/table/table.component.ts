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
    this.currencySymbolName = currencyService.getAllNameSymbolPair()
  }

  applyFilterGlobal($event: any, stringVal: string){
    this.dt2!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  focusInput(input: HTMLInputElement){
    input.focus()
  }
}
