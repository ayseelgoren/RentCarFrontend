import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCardDetail } from '../models/creditCardDetail';
import { SingularResponseModel } from '../models/singularResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  apiUrl = "https://localhost:44362/api/creditcards/";
  constructor(private httpClient : HttpClient) { }

  getBuy(creditCardDetail : CreditCardDetail) : Observable<SingularResponseModel<CreditCardDetail>>{
    let newPath = this.apiUrl+"buy"
    return this.httpClient.post<SingularResponseModel<CreditCardDetail>>(newPath,creditCardDetail);
  }
}
