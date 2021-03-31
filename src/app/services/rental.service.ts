import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetail } from '../models/rentalDetail';
import { ResponseModel } from '../models/responseModel';
import { SingularResponseModel } from '../models/singularResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = "https://localhost:44362/api/rentals/";
  constructor(private httpClient : HttpClient) { }

  addRental(rental : Rental) : Observable<SingularResponseModel<Rental>>{
    let newPath = this.apiUrl+"add"
    return this.httpClient.post<SingularResponseModel<Rental>>(newPath,rental);
  }

  getRentals() : Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl+"getallrentaldetail"
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  lastRentalCar() : Observable<SingularResponseModel<Rental>>{
    let newPath = this.apiUrl+"lastrentalcar"
    return this.httpClient.get<SingularResponseModel<Rental>>(newPath);
  }

  rentalControl(rental : Rental) : Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"rentalcontrol",rental)
  }
  userRentalCars(id : number) : Observable<ListResponseModel<RentalDetail>>{
    return this.httpClient.get<ListResponseModel<RentalDetail>>(this.apiUrl+"userrentalcars?id="+id)
  }

}
