import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarImageDetail } from 'src/app/models/carImageDetail';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  imagePath = "https://localhost:44362/"
  carImageDetails: CarImageDetail = {
    car:{
      id: 0,
      brandId: 0,
      colorId: 0,
      dailyPrice: 0,
      description: '',
      modelYear: 0,
    },
    carImages:[]
  };
  
  constructor(
    private carDetailService: CarDetailService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params['carId']);
      if (params['carId']) {
        this.getCarDetails(params['carId']);
        this.getCarImages(params['carId']);
      }
    });
  }

  getCarDetails(carId: number) {
    this.carDetailService.getCarDetails(carId).subscribe((response) => {
      this.carImageDetails.car = response.data;
    });
  }

  getCarImages(carId: number){
    console.log(carId);
    this.carDetailService.getCarImages(carId).subscribe((response) => {
      console.log(response.data);
      this.carImageDetails.carImages = response.data;
    });
  }

 

  getSliderClassName(index:Number){
    if(index == 0){
      return "carousel-item active";
    } else {
      return "carousel-item";
    }
  }
}
