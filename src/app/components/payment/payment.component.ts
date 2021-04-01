import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreditCardDetail } from 'src/app/models/creditCardDetail';
import { BasketService } from 'src/app/services/basket.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { CreditCard } from 'src/app/models/creditCard';
import { CreditCardService } from 'src/app/services/credit-card.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  creditCard: CreditCard;
  creditCards: CreditCard[] = [];
  amount: number = 0;
  selectedCrediCart: number = -1;
  userId: number;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private basketService: BasketService,
    private creditCardService: CreditCardService,
    private customerService: CustomerService,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.amount = +params['dailyPrice'];
    });

    this.createPaymentForm();

    this.getAllUserCreditCard();
  }

  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      creditCardNumber: ['', Validators.required],
      securityNumber: ['', Validators.required],
      mounthOfExpirationDate: ['', Validators.required],
      yearOfExpirationDate: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  getBuy(creditCardDetail: CreditCardDetail) {
    this.creditCardService.getBuy(creditCardDetail).subscribe(
      (response) => {
        console.log(response);
        if (Number(this.selectedCrediCart) === -1) {
          document.getElementById('showModal').click();
        }
        this.toastrService.success('Ödeme gerçekleştirildi.');
      },
      (error) => {
        console.log(error);
        this.toastrService.error(error.error);
      }
    );
  }

  payment() {
    if (this.paymentForm.valid) {
      console.log(this.paymentForm.value);
      let creditCardModel = Object.assign({}, this.paymentForm.value);
      creditCardModel.amount = this.amount;

      this.creditCard = {
        id: 0,
        balance: creditCardModel.amount,
        cardNumber: creditCardModel.creditCardNumber,
        userId: this.authService.getUserId(),
        mounthOfExpirationDate: creditCardModel.mounthOfExpirationDate,
        securityNumber: creditCardModel.securityNumber,
        yearOfExpirationDate: creditCardModel.yearOfExpirationDate,
        userName: this.authService.getUserName(),
      };

      this.selectedCrediCart = -1;
      this.getBuy(creditCardModel);
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }

  payByRegisteredCrediCart() {
    if (Number(this.selectedCrediCart) !== -1) {
      this.basketService
        .getById(this.selectedCrediCart)
        .subscribe((response) => {
          let creditModel: CreditCardDetail = {
            creditCardNumber: response.data.cardNumber,
            yearOfExpirationDate: response.data.yearOfExpirationDate,
            amount: this.amount,
            mounthOfExpirationDate: response.data.mounthOfExpirationDate,
            securityNumber: response.data.securityNumber,
            name: response.data.userName,
          };
          this.getBuy(creditModel);
        });
    } else {
      this.toastrService.warning(
        'Ödeme işlemi için kayıtlı olan kartlarınızdan seçiniz.'
      );
    }
  }

  saveCreditCard() {
    document.getElementById('closeButton').click();
    console.log(this.creditCard);
    this.basketService.add(this.creditCard).subscribe(
      (response) => {
        console.log(response);
        this.toastrService.success('Kartınız kaydedildi.');
      },
      (error) => {
        console.log(error);
        this.toastrService.error(error.error.message);
      }
    );
  }

  getAllUserCreditCard() {
    let userId = this.authService.getUserId();
    //console.log(userId);
    this.customerService.getByUserId(userId).subscribe((response) => {
      //console.log(response);
      this.basketService
        .getAllUserCreditCard(response.data.userId)
        .subscribe((responseCustomer) => {
          //console.log(responseCustomer);
          this.creditCards = responseCustomer.data;
        });
    });
  }
}
