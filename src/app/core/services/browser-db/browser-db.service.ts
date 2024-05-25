import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserDbService {

  constructor() { }

  setItems(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value))
  }

  getItem(key: string) : string | null {
    if (localStorage.getItem(key)) return JSON.parse(localStorage.getItem(key) as any)
    return null
  }

  clearLocalStorage() {
    localStorage.clear()
  }

}
