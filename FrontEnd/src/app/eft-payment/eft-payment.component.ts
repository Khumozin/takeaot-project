import { Component, OnInit } from '@angular/core';
import { CartDetails } from '../cart/shared/cart-details.model';
import { CartDetailsService } from '../cart/shared/cart-details.service';
import { NgForm } from '@angular/forms';
import { EftService } from './shared/eft.service';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from '../payment/shared/payment.service';
import { Eft } from './shared/eft.model';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-eft-payment',
  templateUrl: './eft-payment.component.html',
  styleUrls: ['./eft-payment.component.css'],
  providers: [ CartDetailsService, EftService, PaymentService ]
})
export class EftPaymentComponent implements OnInit {

  details: Array<CartDetails> = [];
  arrayLength : number;
  tP : string;
  totalPrice : number = 0;
  reference : number = 0;
  eft : Eft;
  bankName : string;

  paymentID : number;
  eftID : number = 0;
  payID : number;
  cardNumber : string;
  bankN : string;
  branchCode : string;

  constructor( private cartDetailsService : CartDetailsService,
    private paymentService : PaymentService,
    private router : Router,
    private eftService : EftService,
    private toastr : ToastrService) { }

  ngOnInit() {
    // get total cost
    this.tP = localStorage.getItem('TotalPrice')
    // generating a ref number
    this.reference = Math.floor(Math.random() * 39999) + 1000;

    // get payment
    this.paymentService.getPayment()
    .subscribe( data => {
      this.paymentService.paymentList = Object.assign({}, data.json());
      this.paymentID = this.paymentService.paymentList[0].PaymentID;

        // get eft payment
        this.eftService.getEft(this.paymentService.paymentList[0].PaymentID)
        .subscribe(data => {
        this.eftService.eftList = Object.assign({}, data.json());
        
          this.eftID = this.eftService.eftList[0].EftID;
          this.payID = this.paymentID;
          this.cardNumber = this.eftService.eftList[0].CardNumber;
          this.bankN = this.eftService.eftList[0].BankName;
          this.branchCode = this.eftService.eftList[0].BranchCode;

          if (this.bankN === "ABSA")
          {
            var rbtNabkName = document.getElementById("absa") as HTMLInputElement;
            rbtNabkName.checked = true;
          }
          else if (this.bankN === "Capitec")
          {
            var rbtNabkName = document.getElementById("capitec") as HTMLInputElement;
            rbtNabkName.checked = true;
          }
          else if (this.bankN === "FNB")
          {
            var rbtNabkName = document.getElementById("fnb") as HTMLInputElement;
            rbtNabkName.checked = true;
          }
          else if (this.bankN === "Nedbank")
          {
            var rbtNabkName = document.getElementById("nedbank") as HTMLInputElement;
            rbtNabkName.checked = true;
          }
          else if (this.bankN === "Standard Bank")
          {
            var rbtNabkName = document.getElementById("standardBank") as HTMLInputElement;
            rbtNabkName.checked = true;
          }
    

        })
    })

    

    
    
    
  }

  // save or update an existing payment
  onSubmit(form : NgForm){

    if ((document.getElementById("absa") as HTMLInputElement).checked)
    {
      this.bankName = 'ABSA';
    }
    else if ((document.getElementById("capitec") as HTMLInputElement).checked)
    {
      this.bankName = 'Capitec';
    }
    else if ((document.getElementById("fnb") as HTMLInputElement).checked)
    {
      this.bankName = 'FNB';
    }
    else if ((document.getElementById("nedbank") as HTMLInputElement).checked)
    {
      this.bankName = 'Nedbank';
    }
    else if ((document.getElementById("standardBank") as HTMLInputElement).checked)
    {
      this.bankName = 'Standard Bank';
    }

    
    if (this.eftID > 1) // Update EFT Payment
    {
      this.eft = {
        EftID : this.eftID,
        PaymentID : this.paymentService.paymentList[0].PaymentID,
        CardNumber : form.value.CardNumber,
        BankName : this.bankName,
        BranchCode : form.value.BranchCode
      }

      this.eftService.updateEft(this.eftID, this.eft)
      .subscribe(data => {
        this.router.navigate(['/confirmation']);
      })

    } 
    else // Add EFT Payment
    {
      this.eft = {
        EftID : 0,
        PaymentID : this.paymentService.paymentList[0].PaymentID,
        CardNumber : form.value.CardNumber,
        BankName : this.bankName,
        BranchCode : form.value.BranchCode
      }
      this.eftService.addPayment(this.eft)
      .subscribe( data => {
        this.router.navigate(['/confirmation']);
      })
  }

    
  }

}
