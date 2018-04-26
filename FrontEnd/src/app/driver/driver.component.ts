import { Component, OnInit } from '@angular/core';

import { OrderService } from '../confirmation/shared/order.service';
import { OrderItemDetailsService } from '../orderItem/shared/order-item-details.service';
import { OrderItemDetails } from '../orderItem/shared/order-item-details.model';
import { Order } from '../confirmation/shared/order.model';
import { NgForm } from '@angular/forms';
import { AddressDetailsService } from '../confirmation/shared/address-details.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css'],
  providers: [ OrderService, OrderItemDetailsService, AddressDetailsService ]
})
export class DriverComponent implements OnInit {
  
  orderItemDetails : Array<OrderItemDetails> = [];
  details: Array<Order> = [];
  orderArrayLength : number;
  pName : string;
  pQuantity : number;
  customerID : number;

   // Address Details
   recipientName : string;
   complex : string;
   streetName : string;
   suburb : string;
   city : string;
   postalCode : string;

   st : string = 'Not Delivered';

  constructor(private orderService : OrderService,
  private orderItemDetailsService : OrderItemDetailsService,
  private addressDetailsService : AddressDetailsService,
  private router : Router) { }

  ngOnInit() {

    // filter orders by dlivery status
    if((document.getElementById("notDelivered") as HTMLInputElement).checked)
    {
      this.st = "Not Delivered";
    }
    else if((document.getElementById("delivered") as HTMLInputElement).checked)
    {
      this.st = "Delivered";
    }
    this.orderService.getOrderByStatus(this.st); // get orderby selected status


    this.orderService.getOrders(); // get orders
    
    // get order details
    this.orderService.getO();
    this.orderService.orderDetailsList
    .subscribe((orderArray: Array<Order>) => {
      // set data
      this.details = orderArray;
      console.log(this.details);

      if (orderArray.length > 0)
      {
        this.orderArrayLength = orderArray.length;
      }
    })

  }

  onSubmit(form : NgForm){

    this.customerID = form.value.CustomerID;

    localStorage.setItem('cID', ''+this.customerID);
    localStorage.setItem('oID', form.value.OrderID);

    this.router.navigate(['/deliveryDetails']);
  }

  onClick()
  {
    if((document.getElementById("notDelivered") as HTMLInputElement).checked)
    {
      this.st = "Not Delivered";
    }
    else if((document.getElementById("delivered") as HTMLInputElement).checked)
    {
      this.st = "Delivered";
    }

    this.orderService.getOrderByStatus(this.st);

  }

}
