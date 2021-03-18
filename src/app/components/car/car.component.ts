import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: CarDetail[] = [];
  currentCar: CarDetail = {
    carId: 0,
    brandName: '',
    colorName: '',
    dailyPrice: 0,
    carName: '',
    modelYear: 0,
  };
  dataStatus : boolean = false;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } else if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else {
        this.getCars();
      }
     
    });
    console.log(this.cars);
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      if(response.success){
        this.dataStatus = true;
      }
    });
  }

  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
      if(response.success){
        this.dataStatus = true;
      }
    });
  }
  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
      if(response.success){
        this.dataStatus = true;
      }
    });
  }

  setCurrentCar(car: CarDetail) {
    this.currentCar = car;
    console.log(car);
  }
}
