import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { environment } from '../../../enviroments/enviroment';
import { map, catchError, of } from 'rxjs';
import { LocalStorageService } from './localStorage/local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  apiUrl: string;
  currenciesCodeName = []

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
    this.apiUrl = "https://v6.exchangerate-api.com/v6/" + environment.apiKey
    this.http.get<any>(`${this.apiUrl}/codes`).pipe(
      map((response) =>
        response.supported_codes.map(([code, name]: [string, string]) => ({
          code,
          name,
        }))
      )
    ).subscribe((data) => {
      this.currenciesCodeName = data;
    });
  }

  getAllNameSymbolPair(): Observable<{code:string, name:string}[]>{
    return this.http.get<any>(`${this.apiUrl}/codes`).pipe(
      map((response) =>
        response.supported_codes.map(([code, name]: [string, string]) => ({
          code,
          name,
        }))
      )
    )
  }

  getCurrenciesCodeImages() : Observable<{code: string, imgUrl: string, imgAlt: string}[]>{
    let currencyRequests = this.currenciesCodeName.map((currency: {code: string, imgUrl: string}) => {
      return this.http.get<any>(`https://restcountries.com/v3.1/currency/${currency.code}`).pipe(
        map(response => ({
          code: currency.code,
          imgUrl: response[0]["flags"]["svg"],
          imgAlt: response[0]["flags"]["alt"]
        })),
        catchError(error => {
          console.error(`Erro ao buscar dados para a moeda ${currency.code}:`, error);

          return of({
            code: currency.code,
            imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/49/A_black_image.jpg',
            imgAlt: 'Erro ao carregar imagem'
          });
        })
      );
    });
    return forkJoin(currencyRequests)
  }

  getCurrencyInfo(currency: string){
    return this.http.get<any>(`${this.apiUrl}/latest/${currency}`).pipe(
      map((response) => response.conversion_rates)
    )
  }

  insertConversionIntoStorage(data:any){
    let conversionHistoric = this.localStorageService.getItem('conversion-historic');
    if(conversionHistoric){
      const newConversionHistoric: string = JSON.stringify([...JSON.parse(conversionHistoric), data])
      this.localStorageService.setItem('conversion-historic', newConversionHistoric)
    }else{
      this.localStorageService.setItem('conversion-historic', JSON.stringify([data]))
    }
  }
}
