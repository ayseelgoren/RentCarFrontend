import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { CarDetail } from '../models/carDetail';
import { CarImageDetail } from '../models/carImageDetail';
import { Car } from '../models/car';
import { SingularResponseModel } from '../models/singularResponseModel';
import { ResponseModel } from '../models/responseModel';
@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "https://localhost:44362/api/";
  constructor(private httpClient : HttpClient) { }

  add(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/add",car);
  }

  update(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/update",car);
  }

  getById(id : number)  : Observable<SingularResponseModel<Car>>{
    console.log(id)
    let newPath = this.apiUrl+"cars/getbyid?id="+id;
    return this.httpClient.get<SingularResponseModel<Car>>(newPath);
  }

  getCars() : Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl+"cars/getcardetails";
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByColor(colorId : number)  : Observable<ListResponseModel<CarDetail>>{
    console.log(colorId)
    let newPath = this.apiUrl+"cars/getcarsbycolor?id="+colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

 
  getCarsByBrand(brandId : number)  : Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl+"cars/getcarsbybrand?id="+brandId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetails(carId : number) : Observable<Car>{
    let newPath = this.apiUrl+"cars/getbyid?id="+carId;
    return this.httpClient.get<Car>(newPath);
  }
}
