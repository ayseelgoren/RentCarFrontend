import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { CustomerDetail } from '../models/customerDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingularResponseModel } from '../models/singularResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = "https://localhost:44362/api/customers/";
  constructor(private httpClient : HttpClient) { }

  getCustomers() : Observable<ListResponseModel<CustomerDetail>>{
    let newPath = this.apiUrl+"getallcustomerdetail"
    return this.httpClient.get<ListResponseModel<CustomerDetail>>(newPath);
  }

  getByUserId(id : number)  : Observable<SingularResponseModel<Customer>>{
    return this.httpClient.get<SingularResponseModel<Customer>>(this.apiUrl+"getbyuserid?userId="+id);
  }

  add(customer:Customer):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",customer);
  }


}
