import { Component, Inject, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { LocalStorageService } from '../../shared/services/localStorage/local-storage.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Dialog } from 'primeng/dialog';
@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [TableModule, Button, CommonModule, Dialog, NgOptimizedImage],
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.css'
})
export class HistoricoComponent {
  @ViewChild('dt') dt: Table | undefined;

  conversionsHistoric: any;
  visibleConfirmConversionDelete = false;
  lastDeleteConversionRowData: any;
  constructor(private localStorageService: LocalStorageService){
    
  }
  ngOnInit(){
    const historicAux = this.localStorageService.getItem('conversion-historic')
    if(historicAux) this.conversionsHistoric = JSON.parse(historicAux);
  }

  confirmConversionDelete(selectedConversion: any){
    this.visibleConfirmConversionDelete = true;
    this.lastDeleteConversionRowData = selectedConversion;
  }

  deleteConversion(){
    const newConversionHistoric = this.conversionsHistoric.filter(
      (conversion: any) => conversion.id !== this.lastDeleteConversionRowData.id
    );
    this.conversionsHistoric = newConversionHistoric;
    this.localStorageService.setItem('conversion-historic', JSON.stringify(newConversionHistoric));
    this.visibleConfirmConversionDelete = false;
  }

  applyFilterGlobal($event: any, stringVal: string){
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  closeConfirmDeleteDialog(){
    this.visibleConfirmConversionDelete = false;
  }

  focusInput(input: HTMLInputElement){
    input.focus()
  }
}
