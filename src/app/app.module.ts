import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { NaviComponent } from './components/navi/navi.component';
import { ColorComponent } from './components/color/color.component';
import { BrandComponent } from './components/brand/brand.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { CarFilterPipePipe } from './pipes/car-filter-pipe.pipe';
import { BrandFilterPipePipe } from './pipes/brand-filter-pipe.pipe';
import { ColorFilterPipePipe } from './pipes/color-filter-pipe.pipe';
import { FilterComponent } from './components/filter/filter.component';

import { ToastrModule } from 'ngx-toastr';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { BasketComponent } from './components/basket/basket.component';
import { PaymentComponent } from './components/payment/payment.component'

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    NaviComponent,
    ColorComponent,
    BrandComponent,
    CustomerComponent,
    RentalComponent,
    CarDetailComponent,
    FilterPipePipe,
    CarFilterPipePipe,
    BrandFilterPipePipe,
    ColorFilterPipePipe,
    FilterComponent,
    CartSummaryComponent,
    BasketComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass : "toast-bottom-right"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
