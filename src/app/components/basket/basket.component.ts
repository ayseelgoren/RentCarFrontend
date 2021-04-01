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
import { AuthService } from 'src/app/services/auth.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
})
export class BasketComponent implements OnInit {
  car: Car;

  carId: number;
  rentalAddForm: FormGroup;
  customerId: number;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private rentalService: RentalService,
    private customerService: CustomerService,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.carId = Number(params['carId']);
        this.getCar(this.carId);
      } else {
        this.router.navigate(['/cars']);
      }
    });
    this.createRentalAddForm();
  }

  createRentalAddForm() {
    this.rentalAddForm = this.formBuilder.group({
      rentDate: [, Validators.required],
      returnDate: [, Validators.required],
    });
  }

  //Girilen tarihlerin kontrolü ve kiralanması işleminin gerçekleştirilmesi
  control() {
    if (this.rentalAddForm.valid) {
      if (this.authService.getUserId() != null) {
        this.customerService
          .getByUserId(Number(this.authService.getUserId()))
          .subscribe(
            (response) => {
              this.customerId = response.data.id;
              //console.log(response)
              let rentalModel = Object.assign({}, this.rentalAddForm.value);
              rentalModel.carId = this.carId;
              rentalModel.customerId = this.customerId;
              //console.log(rentalModel);

              this.rentalService.rentalControl(rentalModel).subscribe(
                (response) => {
                  //console.log(response);
                  if (response.success) {
                    this.toastrService.success(
                      response.message + 'Kiralama işlemini gerçekleştirdiniz.'
                    );
                    this.rentalService.addRental(rentalModel).subscribe(
                      (response) => {
                        //console.log(response);
                        this.toastrService.success(
                          response.message +
                            ' Ödeme sayfasına yönlendiriliyorsunuz.'
                        );
                        this.rentalService
                          .lastRentalCar()
                          .subscribe((response) => {
                            if (response.success) {
                              setTimeout(() => {
                                this.router.navigate([
                                  '/payment/' +
                                    response.data.id +
                                    '/' +
                                    this.car.dailyPrice,
                                ]);
                              }, 1000);
                            }
                          });
                      },
                      (error) => {
                        //console.log(error);
                        if (error.status === 500) {
                          this.toastrService.error(
                            'Giriş yapmalısınız. Giriş Yap sayfasına yönlendirileceksiniz.'
                          );
                        }
                        setTimeout(() => {
                          this.router.navigate(['/login']);
                        });
                      }
                    );
                  }
                },
                (errorResponse) => {
                  //console.log(errorResponse);
                  this.toastrService.error(errorResponse.error.message);
                }
              );
            },
            (error) => {
              console.log(error);
            }
          );
      } else {
        this.toastrService.warning(
          'Kiralam tarihlerini kontrol etmek için giriş yapınız.',
          'Uyarı'
        );
      }
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }

  getCar(carId: number) {
    this.carService.getById(carId).subscribe((response) => {
      this.car = response.data;
    });
  }
}
