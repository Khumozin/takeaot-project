import { Component, OnInit } from '@angular/core';
import { AddressDetailsService } from '../confirmation/shared/address-details.service';
import { OrderService } from '../confirmation/shared/order.service';
import { PaymentService } from '../payment/shared/payment.service';
import { CartDetailsService } from '../cart/shared/cart-details.service';
import { CartDetails } from '../cart/shared/cart-details.model';
import { Route, Router } from '@angular/router';

import { OrderItemService } from '../orderItem/shared/order-item.service';
import { OrderItemDetailsService } from '../orderItem/shared/order-item-details.service';
import { OrderItem } from '../orderItem/shared/order-item.model';
import { OrderItemDetails } from '../orderItem/shared/order-item-details.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers: [AddressDetailsService, OrderService, 
              PaymentService, CartDetailsService, 
              OrderItemDetailsService]
})
export class DetailsComponent implements OnInit {

  // Address Details
  recipientName : string;
  complex : string;
  streetName : string;
  suburb : string;
  city : string;
  postalCode : string;

  // Order Details
  deliveryDate : string;

  //
  myID : any;
  customerOrderNumber : number;

  // payment method
  method : string;

  // quantity details
  details: Array<CartDetails> = [];
  orderDetails : Array<OrderItemDetails> = [];
  arrayLength : number;
  totalPrice : number = 0;
  tP : number = 0;

  constructor(private addressDetailsService : AddressDetailsService,
  private orderService : OrderService,
  private paymentService : PaymentService,
  private cartDetailsService : CartDetailsService,
  private orderItemDetailsService : OrderItemDetailsService,
  private router : Router) { }

  ngOnInit() {

    this.myID = document.cookie.split("=");

    // Get Address Details
    this.addressDetailsService.getAddress()
     .subscribe( data => {
       this.addressDetailsService.addressList = Object.assign({}, data.json());

       this.recipientName = this.addressDetailsService.addressList[0].RecipientName;
       this.complex = this.addressDetailsService.addressList[0].Complex;
       this.streetName = this.addressDetailsService.addressList[0].StreetName;
       this.suburb = this.addressDetailsService.addressList[0].Suburb;
       this.city = this.addressDetailsService.addressList[0].City;
       this.postalCode = this.addressDetailsService.addressList[0].PostalCode;
     })

     // working method for getting cusstomer order in desc order
     this.orderService.getCustomerOrder(this.myID[1])
     .subscribe(data => {
        this.orderService.customerOrder = Object.assign(data.json());
        this.customerOrderNumber = this.orderService.customerOrder[0].OrderID;
        this.deliveryDate = this.orderService.customerOrder[0].DeliveryDate;

        // call order item method
        this.orderItemDetailsService.getOrderSummary(this.customerOrderNumber);
        this.orderItemDetailsService.oIDSummary
        .subscribe((orderSummary : Array<OrderItemDetails>) => {
          this.orderDetails = orderSummary;

          if (orderSummary.length > 0)
          {
            this.arrayLength = orderSummary.length;
            this.tP = this.calculatePrice();
          }
        })

        this.orderItemDetailsService.getList(this.customerOrderNumber);

     })

     // get payment method
    this.paymentService.getPayment()
    .subscribe(data => {
      this.paymentService.paymentMethod = Object.assign({}, data.json());
      this.method = this.paymentService.paymentMethod[0].PaymentType;
    })

  }

  onClick() {
    this.router.navigate(['/home']);
  }

  // calculate price
  calculatePrice(){

    for (var i = 0; i < this.arrayLength; i++)
    {
      this.totalPrice += this.orderDetails[i].ProductPrice * this.orderDetails[i].ProductQuantity;
    }

    return this.totalPrice || 0;
  
  }

}
