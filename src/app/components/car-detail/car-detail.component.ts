import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarImageDetail } from 'src/app/models/carImageDetail';
import { Rental } from 'src/app/models/rental';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  imagePath = "https://localhost:44362/Images/"
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
  imagePathCar = ""

  carImages: CarImage[]
  constructor(
    private carDetailService: CarDetailService,
    private cartService: CartService,
    private toastrService : ToastrService,
    private activatedRoute: ActivatedRoute,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params);
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

  getImage(image : CarImage){
    console.log(image.imagePath.replace("\\","/"));
    console.log(this.imagePath)
    return this.imagePath+image.imagePath.replace("\\","/")
  }
 

  getSliderClassName(index:Number){
    if(index == 0){
      return "carousel-item active";
    } else {
      return "carousel-item";
    }
  }

  rentalCar(car : Car){
    console.log(car)
    this.cartService.addToCart(car);
    this.toastrService.success("Eklendi",car.description + " sepette eklendi.")
    
    

  }
}

