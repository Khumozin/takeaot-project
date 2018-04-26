import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../confirmation/shared/order.service';

import { OrderItemDetailsService } from '../../orderItem/shared/order-item-details.service';
import { OrderItemDetails } from '../../orderItem/shared/order-item-details.model';
import { Order } from '../../confirmation/shared/order.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.css'],
  providers: [ OrderService, OrderItemDetailsService ]
})
export class ManageOrderComponent implements OnInit {

  oList : any;
  details: Array<Order> = [];
  orderItemDetails : Array<OrderItemDetails> = [];
  orderArrayLength : number;
  orderItemArrayLength : number;

  pName : string;
  pQuantity : number;
  orderID : number;

  constructor(private orderService : OrderService,
  private orderItemDetailsService : OrderItemDetailsService) { }

  ngOnInit() {
    this.orderService.getOrders();
    
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

    this.orderID = form.value.OrderID;
    console.log(this.orderID);
    console.log('Bona!')
    this.orderItemDetailsService.getOrderItem(this.orderID);
    this.orderItemDetailsService.oIDList
    .subscribe((oIDArray : Array<OrderItemDetails>) => {
      this.orderItemDetails = oIDArray;
      
      if (oIDArray.length > 0)
      {
        for (var x = 0; x < oIDArray.length; x++)
        {
          this.pName = this.orderItemDetails[x].ProductName;
          this.pQuantity = this.orderItemDetails[x].ProductQuantity;
        }
      }
    })

  }

}
