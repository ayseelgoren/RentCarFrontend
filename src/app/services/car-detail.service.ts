import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { SingularResponseModel } from '../models/singularResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {
  
  apiUrl = "https://localhost:44362/api/";
  
  constructor(private httpClient : HttpClient) { }

  getCarDetails(carId : number) : Observable<SingularResponseModel<Car>>{
    let newPath = this.apiUrl+"cars/getbyid?id="+carId;
    return this.httpClient.get<SingularResponseModel<Car>>(newPath);
  }

  getCarImages(carId : number) : Observable<ListResponseModel<CarImage>>{
    let newPath = this.apiUrl+"carimages/getimagesbycar?CarId="+carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
}
