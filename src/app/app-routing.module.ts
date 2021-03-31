import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './components/basket/basket.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/add",component:CarAddComponent,canActivate:[LoginGuard]},
  {path:"cars/add/:carId",component:CarAddComponent,canActivate:[LoginGuard]},
  {path:"cars/:carId",component:CarDetailComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"customers",component:CustomerComponent},
  {path:"baskets",component:BasketComponent},
  {path:"baskets/:carId",component:BasketComponent,},
  {path:"payment/:rentalId/:dailyPrice",component:PaymentComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"colors/add",component:ColorAddComponent,canActivate:[LoginGuard]},
  {path:"colors/add/:colorId",component:ColorAddComponent,canActivate:[LoginGuard]},
  {path:"brands/add",component:BrandAddComponent,canActivate:[LoginGuard]},
  {path:"brands/add/:brandId",component:BrandAddComponent,canActivate:[LoginGuard]},
  {path:"colors",component:ColorComponent},
  {path:"brands",component:BrandComponent},
  {path:"profile",component:ProfileComponent},
  {path:"rentals",component:RentalComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
