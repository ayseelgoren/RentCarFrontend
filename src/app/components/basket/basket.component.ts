import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CreditCardDetail } from 'src/app/models/creditCardDetail';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { BasketService } from 'src/app/services/basket.service';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';
import { NgForm } from '@angular/forms';
import { Rental } from 'src/app/models/rental';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
})
export class BasketComponent implements OnInit {
  rentalModel: Rental = new Rental();
  car: Car;

  constructor(
    private basketService: BasketService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private rentalService: RentalService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCar(params['carId']);
      } else {
        this.router.navigate([
          '/cars',
        ]);
      }
    });
  }

  addRental(form: NgForm) {
    let rental: Rental = {
      customerId: 4,
      carId: this.car.id,
      rentDate: this.rentalModel.rentDate,
      returnDate: this.rentalModel.returnDate,
      id: 0,
    };
    console.log(this.rentalModel);
    if (
      this.rentalModel.rentDate == null ||
      this.rentalModel.returnDate == null
    ) {
      this.toastrService.error('Tarihleri seçiniz.');
    } else {
      this.rentalService.addRental(rental).subscribe(
        (response) => {
          console.log(response);
          this.toastrService.success(
            response.message + ' Ödeme sayfasına yönlendiriliyorsunuz.'
          );
          this.rentalService.lastRentalCar().subscribe((response) => {
            if (response.success) {
              setTimeout(() => {
                this.router.navigate([
                  '/payment/' + response.data.id + '/' + this.car.dailyPrice,
                ]);
              }, 3000);
            }
          });
        },
        (error) => {
          console.log(error.error.message);
          this.toastrService.error(error.error.message);
        }
      );
    }
  }

  getCar(carId: number) {
    this.carService.getById(carId).subscribe((response) => {
      this.car = response.data;
    });
  }
}
