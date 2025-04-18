import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private _customerData: any;
  constructor() { }

  get customerData(){
    return this._customerData;
  }
  set customerData(data){
    this._customerData = data;
  }
}
