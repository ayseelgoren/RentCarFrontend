import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getItem(key:string){
    return localStorage.getItem(key);
  }

  setItem(key:string,data:any){
    return localStorage.setItem(key,data);
  }

  removeItem(key:string){
    return localStorage.removeItem(key);
  }
}
