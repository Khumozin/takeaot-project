import { Component, OnInit } from '@angular/core';
import { CreditService } from './shared/credit.service';
import { Credit } from './shared/credit.model';
import { PaymentService } from '../payment/shared/payment.service'; 
import { ToastrService } from 'ngx-toastr';
import { Route, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-credit-payment',
  templateUrl: './credit-payment.component.html',
  styleUrls: ['./credit-payment.component.css'],
  providers: [ PaymentService, CreditService ]
})
export class CreditPaymentComponent implements OnInit {

  credit : Credit;
  reference : number = 0;
  arrayLength : number;
  tP : string;
  totalPrice : number = 0;
  creditID :  number = 0;
  cardDescription : string;

  // Credit model
  cID : number = 0;
  cardNumber : number;
  cvv : number;
  nameOnCard : string;
  cardDesc : string;


  constructor(private creditService : CreditService,
    private paymentService : PaymentService,
    private toastr : ToastrService, 
    private router : Router) { }

  ngOnInit() {
    // get payment
    this.paymentService.getPayment()
      .subscribe( data => {
      this.paymentService.paymentList = Object.assign({}, data.json());
      
        // get credit 
        this.creditService.getCredit(this.paymentService.paymentList[0].PaymentID)
        .subscribe(data => {
          this.creditService.creditList = Object.assign({}, data.json());

            this.cID = this.creditService.creditList[0].CreditID;
            this.cardNumber = this.creditService.creditList[0].CardNumber;
            this.nameOnCard = this.creditService.creditList[0].NameOnCard;
            this.cvv = this.creditService.creditList[0].Cvv;
            this.cardDesc = this.creditService.creditList[0].CardDescription;

            if (this.cardDesc === "Debit Card")
            {
              var rdnBtnDesc = document.getElementById("debitCard") as HTMLInputElement;
              rdnBtnDesc.checked = true;
            }
            else if (this.cardDesc === "Credit Card")
            {
              var rdnBtnDesc = document.getElementById("creditCard") as HTMLInputElement;
              rdnBtnDesc.checked = true;
            }
        })
    })

    // get total cost
    this.tP = localStorage.getItem('TotalPrice')

    // generating a ref number
    this.reference = Math.floor(Math.random() * 39999) + 1000;
  }

  onSubmit(form : NgForm){
    if ((document.getElementById("creditCard") as HTMLInputElement).checked)
    {
      this.cardDescription = 'Credit Card';
    }
    else if ((document.getElementById("debitCard") as HTMLInputElement).checked)
    {
      this.cardDescription = 'Debit Card';
    }
  
    // update payment
    if (this.cID > 1)
    {
      this.credit = {
        CreditID : this.cID,
        PaymentID : this.paymentService.paymentList[0].PaymentID,
        CardDescription : this.cardDescription,
        NameOnCard : form.value.NameOnCard,
        CardNumber : form.value.CardNumber,
        Cvv : form.value.Cvv
  
      }
      this.creditService.updateCredit(this.cID, this.credit)
      .subscribe( data => {
        this.router.navigate(['/confirmation']);
      })
    }
    else // add payment
    {
      this.credit = {
        CreditID : 0,
        PaymentID : this.paymentService.paymentList[0].PaymentID,
        CardDescription : this.cardDescription,
        NameOnCard : form.value.NameOnCard,
        CardNumber : form.value.CardNumber,
        Cvv : form.value.Cvv
  
      }
      this.creditService.addCDPayment(this.credit)
      .subscribe( data => {
        this.router.navigate(['/confirmation']);
      })
    }
    
  }
  
}
