import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingularResponseModel } from '../models/singularResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl = "https://localhost:44362/api/colors/";
  constructor(private httpClient : HttpClient) { }

  getColors() : Observable<ListResponseModel<Color>>{
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl+"getall");
  }

  add(color: Color) : Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",color);
  }

  update(color: Color) : Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"update",color);
  }

  getById(id : number)  : Observable<SingularResponseModel<Color>>{
    return this.httpClient.get<SingularResponseModel<Color>>(this.apiUrl+"getbyid?id="+id);
  }
}
