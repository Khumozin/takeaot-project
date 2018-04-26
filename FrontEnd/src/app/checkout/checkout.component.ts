import { Component, OnInit } from '@angular/core';
import { CartDetails } from '../cart/shared/cart-details.model';
import { CartDetailsService } from '../cart/shared/cart-details.service';
import { Address } from './shared/address.model';
import { AddressService } from './shared/address.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Route, Router } from '@angular/router';
import { PaymentService } from '../payment/shared/payment.service';
import { Payment } from '../payment/shared/payment.model';
import { PaymentDetailsService } from './shared/payment-details.service';
import { PaymentDetails } from './shared/payment-details.model';
import { AddressDetailsService } from '../confirmation/shared/address-details.service';
import { AddressDetails } from '../confirmation/shared/address-details.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [ CartDetailsService, AddressService, 
            PaymentService, PaymentDetailsService,
            AddressDetailsService ]
})
export class CheckoutComponent implements OnInit {

  addDetails: Array<Address> = [];
  payment : Payment;
  customerID : number;
  details: Array<CartDetails> = [];
  arrayLength : number;
  totalPrice : number = 0;
  tP : number = 0;

  payDetails : Array<PaymentDetails> = [];
  paymentResponse : string;

  // Address Details
  addressDetails : AddressDetails;

  addressID : number;
  custID: number;
  recipientName : string;
  contactNumber : string;
  complex : string;
  streetName : string;
  suburb : string;
  city : string;
  postalCode : string;

  // Payment ID
  payID : number = 0;

  myID : any;

  constructor(private cartDetailsService : CartDetailsService,
    private addressService : AddressService,
    private paymentDetailsService : PaymentDetailsService,
    private paymentService : PaymentService,
    private addressDetailsService : AddressDetailsService,
    private router : Router,
    private toastr : ToastrService) { }

  ngOnInit() {
    this.myID = document.cookie.split("=");

    this.cartDetailsService.getCartList(); // get cart list items
    this.resetForm(); //call reset from method
    this.customerID = this.myID[1];
    
    // get address
    this.addressDetailsService.getAddress()
    .subscribe( data => {
      this.addressDetailsService.addressList = Object.assign({}, data.json());
      
      // assigning data to vaiables
      this.addressID = this.addressDetailsService.addressList[0].AddressID;
      this.custID = this.addressDetailsService.addressList[0].CustomerID;
      this.recipientName = this.addressDetailsService.addressList[0].RecipientName;
      this.contactNumber = this.addressDetailsService.addressList[0].ContactNumber;
      this.complex = this.addressDetailsService.addressList[0].Complex;
      this.streetName = this.addressDetailsService.addressList[0].StreetName;
      this.suburb = this.addressDetailsService.addressList[0].Suburb;
      this.city = this.addressDetailsService.addressList[0].City;
      this.postalCode = this.addressDetailsService.addressList[0].PostalCode;
    })
  
    // get order summary
    this.cartDetailsService.cartDetailsList
    .subscribe((cartArray: Array<CartDetails>) => {
      this.details = cartArray;
      if (cartArray.length > 0) {
        this.arrayLength = cartArray.length;
        this.tP = this.calculatePrice();
      }
    })

    // get payment
    this.paymentService.getPayment()
    .subscribe(data => {
      this.paymentService.paymentList = Object.assign({}, data.json());
      this.payID = this.paymentService.paymentList[0].PaymentID
    }, (error) => {
      this.paymentResponse = error;
      this.payID = 0;
    })

    

  }

  // reset from after adding an address
  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.addressService.address = {
      AddressID : null,
      CustomerID : 0,
      RecipientName : '',
      ContactNumber : '',
      Complex : '',
      StreetName : '',
      Suburb : '',
      City : '',
      PostalCode : ''
    }
  }

  // Saving Address
  onSubmit(form : NgForm){
    this.addressService.addAddress(form.value)
    .subscribe( data => {
      this.resetForm(form);
      this.toastr.success('Added Succesfully!');

      // get address
        this.addressDetailsService.getAddress()
        .subscribe( data => {
          this.addressDetailsService.addressList = Object.assign({}, data.json());
          
          // assigning data to vaiables
          this.addressID = this.addressDetailsService.addressList[0].AddressID;
          this.custID = this.addressDetailsService.addressList[0].CustomerID;
          this.recipientName = this.addressDetailsService.addressList[0].RecipientName;
          this.contactNumber = this.addressDetailsService.addressList[0].ContactNumber;
          this.complex = this.addressDetailsService.addressList[0].Complex;
          this.streetName = this.addressDetailsService.addressList[0].StreetName;
          this.suburb = this.addressDetailsService.addressList[0].Suburb;
          this.city = this.addressDetailsService.addressList[0].City;
          this.postalCode = this.addressDetailsService.addressList[0].PostalCode;
        })
      
    })
  }

  // button to populate text fields
  showForEdit() {
    this.router.navigate(['/updateAddress']);
  }

 // calculate price 
  calculatePrice(){

    for (var i = 0; i < this.arrayLength; i++)
    {
      this.totalPrice += this.details[i].ProductPrice * this.details[i].ProductQuantity;
    }

    return this.totalPrice || 0;
  
  }

  // adding or updating payment
  onPayment(form : NgForm) {
    // add payment method as eft
    if((document.getElementById('eftPayment') as HTMLInputElement).checked) {
      if (this.payID > 0) // update
      {
        this.payment ={
          PaymentID : this.payID,
          CustomerID : this.myID[1],
          PaymentType : 'EFT'
        }
        this.paymentService.updatePayment(this.paymentService.paymentList[0].PaymentID, this.payment)
        .subscribe( data => {
          this.router.navigate(['/eftPayment']);
        })
      } 
      else if (this.payID < 1) // add
      {
        this.payment ={
          PaymentID : 0,
          CustomerID : this.myID[1],
          PaymentType : 'EFT'
        }
        this.paymentService.addPayment(this.payment)
        .subscribe( data => {
          this.router.navigate(['/eftPayment']);
        })
      }
    }

    // add payment method ascredit or debit
    else if ((document.getElementById('creditPayment') as HTMLInputElement).checked) {
      if (this.payID > 0) // update
      {
        this.payment ={
          PaymentID : this.paymentService.paymentList[0].PaymentID,
          CustomerID : this.myID[1] ,
          PaymentType : 'Credit/Debit Card'
        }
        this.paymentService.updatePayment(this.paymentService.paymentList[0].PaymentID, this.payment)
        .subscribe( data => {
          this.router.navigate(['/creditPayment']);
        })
      } 
      else if (this.payID < 1) // add
      {
        this.payment ={
          PaymentID : 0,
          CustomerID : this.myID[1],
          PaymentType : 'Credit/Debit Card'
        }
        this.paymentService.addPayment(this.payment)
        .subscribe( data => {
          this.router.navigate(['/creditPayment']);
        })
      }
    }
  }

  // the is address exists
  get isAddressAvailable() {
    if (this.addressID > 0) {
      return true;
    } else {
      return false;
    }
  }


}