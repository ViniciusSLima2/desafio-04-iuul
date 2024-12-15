import { Component, inject} from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { CurrencyService } from '../../shared/services/currency.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Select } from 'primeng/select';
import {Dialog} from 'primeng/dialog'
import { ConvertToNumberPipe } from './convert-to-number.pipe';
interface CurrencyFlagImage{
  code : string,
  imgUrl : string,
  imgAlt : string
}

interface ConversionRates {
  [currencyCode: string]: number;
}

@Component({
  selector: 'app-conversor',
  standalone: true,
  imports: [ReactiveFormsModule, NgOptimizedImage, Select, FormsModule, Dialog, ConvertToNumberPipe, CommonModule],
  templateUrl: './conversor.component.html',
  styleUrl: './conversor.component.css'
})
export class ConversorComponent {
  currencies: {code:string, imgUrl: string, imgAlt: string}[] = []
  exchangeRate: number = 0;
  calculatedAmount: number = 0;
  fromCurrencyExchangeRates: ConversionRates = {}
  visibleDialog = false;
  private currencyService = inject(CurrencyService)
  currencyConverterForm = new FormGroup({
    from : new FormControl<CurrencyFlagImage>({code:'BRL', imgUrl: "https://flagcdn.com/br.svg", imgAlt: "The flag of Brazil has a green field with a large yellow rhombus in the center. Within the rhombus is a dark blue globe with twenty-seven small five-pointed white stars depicting a starry sky and a thin white convex horizontal band inscribed with the national motto 'Ordem e Progresso' across its center."}),
    to : new FormControl<CurrencyFlagImage>({code : 'JPY', imgUrl: "https://flagcdn.com/jp.svg", imgAlt: "The flag of Japan features a crimson-red circle at the center of a white field."}),
    amount : new FormControl('1', [
      Validators.pattern('[0-9]+(\\.[0-9]{0,2})?'),
      Validators.required])
  })


  ngOnInit(){
    this.currencyService.getCurrenciesCodeImages().subscribe({
      next : (response => this.currencies = response),
      error: (err => console.log("Erro ao fazer a requisição"))
    });
    this.updatefromCurrencyExchangeRates()
    this.currencyConverterForm.get("from")?.valueChanges.subscribe((value) => {
      this.updatefromCurrencyExchangeRates()
    })

    this.currencyConverterForm.get("to")?.valueChanges.subscribe((value) => {
      this.updateAmountResult()
    })    
  }

  updatefromCurrencyExchangeRates(){
    const fromCurrencyCode = this.currencyConverterForm.get("from")?.value?.code
    const toCurrencyCode = this.currencyConverterForm.get("to")?.value?.code
    if(fromCurrencyCode !== undefined && toCurrencyCode !== undefined ){
      this.currencyService.getCurrencyInfo(fromCurrencyCode).subscribe({
        next: (res => {
          this.fromCurrencyExchangeRates = res
          this.exchangeRate = res[toCurrencyCode]
        }),
        error: (err => console.log("Erro ao fazer a requisição"))
      })
    }
  }

  onSubmit(){
    if (this.currencyConverterForm.valid) {
      this.showDialog()
    } else {
      this.currencyConverterForm.markAllAsTouched();
    }
  }

  updateAmountResult(){
    const toCurrencyCode = this.currencyConverterForm.get("to")?.value?.code
    if(toCurrencyCode !== undefined){
      this.exchangeRate = this.fromCurrencyExchangeRates[toCurrencyCode];
    }
  }

  invertSelectedCurrencies(): void{
    const fromAux = this.currencyConverterForm.get("from")?.value
    const toAux = this.currencyConverterForm.get("to")?.value

    if (fromAux !== undefined && toAux !== undefined) {
      this.currencyConverterForm.get("from")?.setValue(toAux);
      this.currencyConverterForm.get("to")?.setValue(fromAux);
      this.updatefromCurrencyExchangeRates();
    }
  }

  showDialog(){
    this.visibleDialog = true
  }

  closeDialog(){
    this.visibleDialog = false
  }
}
