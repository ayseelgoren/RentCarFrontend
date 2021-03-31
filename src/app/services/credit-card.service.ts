import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCardDetail } from '../models/creditCardDetail';
import { SingularResponseModel } from '../models/singularResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  
  apiUrl = "https://localhost:44362/api/servicecreditcards/";
  
  constructor(private httpClient : HttpClient) { }

  getBuy(creditCardDetail : CreditCardDetail) : Observable<SingularResponseModel<CreditCardDetail>>{
    return this.httpClient.post<SingularResponseModel<CreditCardDetail>>(this.apiUrl+"buy",creditCardDetail);
  }
}
