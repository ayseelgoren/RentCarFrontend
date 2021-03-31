import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { CreditCardDetail } from '../models/creditCardDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingularResponseModel } from '../models/singularResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  apiUrl = "https://localhost:44362/api/creditcards/";
  constructor(private httpClient : HttpClient) { }


  add(creditCard:CreditCard):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",creditCard);
  }

  getAllUserCreditCard(customerId : number) : Observable<ListResponseModel<CreditCard>>{
    return this.httpClient.get<ListResponseModel<CreditCard>>(this.apiUrl+"getbyuserid?userId="+customerId);
  }

  getById(id : number)  : Observable<SingularResponseModel<CreditCard>>{
    return this.httpClient.get<SingularResponseModel<CreditCard>>(this.apiUrl+"getbyid?id="+id);
  }
}
