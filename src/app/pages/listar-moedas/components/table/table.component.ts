import { Component, Inject, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { CurrencyService } from '../../../../shared/services/currency.service';
import { NgOptimizedImage } from '@angular/common';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, NgOptimizedImage],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @ViewChild('dt2') dt2: Table | undefined;
  currencySymbolName : {code:string, name:string}[] = [];


  constructor(private currencyService: CurrencyService){
    this.currencyService.getAllNameSymbolPair().subscribe({
      next: (res => this.currencySymbolName = res),
      error: (error => console.log("Erro em requisitar nameSymbolPair"))
    })
  }



  applyFilterGlobal($event: any, stringVal: string){
    this.dt2!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  focusInput(input: HTMLInputElement){
    input.focus()
  }
}
