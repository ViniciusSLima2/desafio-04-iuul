import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private key = import.meta.env.NG_APP_PUBLIC_EXCHANGE_RATE_API_KEY;
  private apiUrl = "https://v6.exchangerate-api.com/v6/" + this.key
  constructor(private http: HttpClient) { }

  getAllNameSymbolPair(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/codes`)
  }
}
