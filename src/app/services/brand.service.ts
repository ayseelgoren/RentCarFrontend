import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingularResponseModel } from '../models/singularResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = "https://localhost:44362/api/brands/";
  constructor(private httpClient : HttpClient) { }

  getBrands() : Observable<ListResponseModel<Brand>>{
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl+"getall");
  }

  add(brand: Brand) : Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",brand);
  }

  update(brand: Brand) : Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"update",brand);
  }
  
  getById(id : number)  : Observable<SingularResponseModel<Brand>>{
    return this.httpClient.get<SingularResponseModel<Brand>>(this.apiUrl+"getbyid?id="+id);
  }
}
