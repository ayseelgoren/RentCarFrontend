import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageDetail } from 'src/app/models/carImageDetail';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  imagePath = 'https://localhost:44362/Images/';
  carImageDetails: CarImageDetail = {
    car: {
      id: 0,
      brandId: 0,
      colorId: 0,
      dailyPrice: 0,
      description: '',
      modelYear: 0,
      findexPoint: 0,
    },
    carImages: [],
  };

  carImages: CarImage[];
  constructor(
    private carDetailService: CarDetailService,
    private cartService: CartService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
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

  getCarImages(carId: number) {
    console.log(carId);
    this.carDetailService.getCarImages(carId).subscribe((response) => {
      console.log(response.data);
      this.carImageDetails.carImages = response.data;
    });
  }

  getImage(image: CarImage) {
    return this.imagePath + image.imagePath.replace('\\', '/');
  }
}
