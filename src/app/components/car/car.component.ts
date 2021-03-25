import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarImage } from 'src/app/models/carImage';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImageDetail } from 'src/app/models/carImageDetail';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {

  cars: CarDetail[] = [];
  dataStatus : boolean = false;
  filterText = ""
 
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
  ) {   
  }

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

}
