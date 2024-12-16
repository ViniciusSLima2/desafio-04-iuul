import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private localStorage: Storage | null;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.localStorage = document.defaultView?.localStorage || null;
  }

  getItem(key: string): string | null {
    return this.localStorage?.getItem(key) || null;
  }

  setItem(key: string, value: string): void {

    this.localStorage?.setItem(key, value);
  }
}
