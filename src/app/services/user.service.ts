import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { SingularResponseModel } from '../models/singularResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = "https://localhost:44362/api/users/";
  constructor(private httpClient : HttpClient) { }

  addUserAsCustomer():Observable<ResponseModel>{
    return this.httpClient.get<ResponseModel>(this.apiUrl+"adduserascustomer")
  }

  getById (id : number)  : Observable<SingularResponseModel<User>>{
    return this.httpClient.get<SingularResponseModel<User>>(this.apiUrl+"getbyid?id="+id);
  }

  update(user : User ) : Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"update",user);
  }
  
}
