import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './components/basket/basket.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { CustomerComponent } from './components/customer/customer.component';
import { PaymentComponent } from './components/payment/payment.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/:carId",component:CarDetailComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"customers",component:CustomerComponent},
  {path:"baskets",component:BasketComponent},
  {path:"baskets/:carId",component:BasketComponent,},
  {path:"payment/:rentalId/:dailyPrice",component:PaymentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
