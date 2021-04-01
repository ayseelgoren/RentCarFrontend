import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: CarDetail[] = [];
  dataStatus: boolean = false;
  filterText = '';

  adminControlStatus = false;
  constructor(
    private carService: CarService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService
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
    this.adminControl();
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      if (response.success) {
        this.dataStatus = true;
      }
      if (this.cars.length === 0) {
        this.toastrService.warning('Araba bulunmamaktadır.', 'Uyarı');
      }
    });
  }

  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
      if (response.success) {
        this.dataStatus = true;
      }
      if (this.cars.length === 0) {
        this.toastrService.warning('Araba bulunmamaktadır.', 'Uyarı');
      }
    });
  }

  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
      if (response.success) {
        this.dataStatus = true;
      }
      if (this.cars.length === 0) {
        this.toastrService.warning('Araba bulunmamaktadır.', 'Uyarı');
      }
    });
  }

  adminControl() {
    this.adminControlStatus = this.authService.adminControl();
  }
}
