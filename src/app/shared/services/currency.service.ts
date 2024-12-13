import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/enviroment';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  apiUrl: string;
  constructor(private http: HttpClient) {
    this.apiUrl = "https://v6.exchangerate-api.com/v6/" + environment.apiKey
  }

  getAllNameSymbolPair(): Observable<{code:string, name:string}>{
    return this.http.get<any>(`${this.apiUrl}/codes`).pipe(
      map((response) =>
        response.supported_codes.map(([code, name]: [string, string]) => ({
          code,
          name,
        }))
      )
    )
  }
}
