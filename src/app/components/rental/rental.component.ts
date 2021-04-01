import { Component, OnInit } from '@angular/core';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { AuthService } from 'src/app/services/auth.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  userId: number;
  rentals: RentalDetail[] = [];
  constructor(
    private rentalService: RentalService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    console.log(this.userId);
    this.getUserRentalCars();
  }

  getUserRentalCars() {
    this.rentalService.userRentalCars(this.userId).subscribe(
      (response) => {
        console.log(response);
        this.rentals = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
