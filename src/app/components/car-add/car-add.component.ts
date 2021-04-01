import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  carAddForm: FormGroup;

  car: Car;
  carId = -1;
  colors: Color[] = [];
  brands: Brand[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private colorService: ColorService,
    private brandService: BrandService,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.carId = params['carId'];
        this.getByCar();
      } else {
        this.createCarAddForm();
      }
    });
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      description: ['', Validators.required],
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      findexPoint: ['', Validators.required],
    });
  }

  add() {
    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value);
      carModel.brandId = Number(carModel.brandId);
      carModel.colorId = Number(carModel.colorId);
      carModel.findexPoint = Number(carModel.findexPoint);
      //console.log(carModel);
      if (this.carId === -1) {
        this.carService.add(carModel).subscribe(
          (response) => {
            this.toastrService.success(response.message, 'Başarılı');
            setTimeout(() => {
              this.router.navigate(['/cars']);
            }, 2000);
          },
          (errorResponse) => {
            if (errorResponse.error.Errors.length > 0) {
              for (let i = 0; i < errorResponse.error.Errors.length; i++) {
                this.toastrService.error(
                  errorResponse.error.Errors[i].ErrorMessage,
                  'Doğrulama hatası'
                );
              }
            }
          }
        );
      } else {
        carModel.id = Number(this.carId);
        this.carService.update(carModel).subscribe(
          (response) => {
            this.toastrService.success(response.message, 'Başarılı');
            setTimeout(() => {
              this.router.navigate(['/cars']);
            }, 2000);
          },
          (errorResponse) => {
            if (errorResponse.error.Errors.length > 0) {
              for (let i = 0; i < errorResponse.error.Errors.length; i++) {
                this.toastrService.error(
                  errorResponse.error.Errors[i].ErrorMessage,
                  'Doğrulama hatası'
                );
              }
            }
          }
        );
      }
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  getByCar() {
    this.carService.getById(this.carId).subscribe(
      (response) => {
        this.car = response.data;
        if (response.success) {
          this.carAddForm = this.formBuilder.group({
            description: [this.car.description, Validators.required],
            brandId: [this.car.brandId, Validators.required],
            colorId: [this.car.colorId, Validators.required],
            modelYear: [this.car.modelYear, Validators.required],
            dailyPrice: [this.car.dailyPrice, Validators.required],
            findexPoint: [this.car.findexPoint, Validators.required],
          });
        } else {
          this.createCarAddForm();
        }
      },
      (errorResponse) => {
        this.toastrService.error('Bir hata meydana geldi.', 'Dikkat');
      }
    );
  }
}
