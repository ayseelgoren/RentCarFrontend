import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreditCardDetail } from 'src/app/models/creditCardDetail';
import { BasketService } from 'src/app/services/basket.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  creditCardDetail : CreditCardDetail = new CreditCardDetail();
  amount : number = 0;

  constructor(    private activatedRoute: ActivatedRoute,
    private router: Router,
    private basketService: BasketService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      console.log( params)
      console.log( params["dailyPrice"])
        this.amount = +(params['dailyPrice']);
    });
  }

  getBuy(creditCardDetail: CreditCardDetail) {
    this.basketService.getBuy(creditCardDetail).subscribe(
      (response) => {
      console.log(response);
      this.toastrService.success("Ödeme gerçekleştirildi.");
      },
      (error)=>{
        console.log(error)
        this.toastrService.error(error.error);
      }
    );
  }

  endOfPayment(form: NgForm) {

    if(this.creditCardDetail.creditCardNumber===undefined || 
      this.creditCardDetail.mounthOfExpirationDate=== undefined ||
      this.creditCardDetail.securityNumber=== undefined ||
      this.creditCardDetail.yearOfExpirationDate=== undefined ){
      this.toastrService.error("Tüm alanları doldurunuz.");
    }else{
      let creditCard : CreditCardDetail = {
       amount : this.amount,
       creditCardNumber : this.creditCardDetail.creditCardNumber,
       mounthOfExpirationDate : this.creditCardDetail.mounthOfExpirationDate,
       securityNumber: this.creditCardDetail.securityNumber,
       yearOfExpirationDate : this.creditCardDetail.yearOfExpirationDate
      };
      console.log(creditCard)
      this.getBuy(creditCard);
    }
    
  }

}
