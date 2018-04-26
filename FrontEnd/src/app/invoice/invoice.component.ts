import { Component, OnInit } from '@angular/core';
import { OrderService } from '../confirmation/shared/order.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
  providers: [OrderService]
})
export class InvoiceComponent implements OnInit {

  myID : any;

  constructor(private orderService : OrderService) { }

  ngOnInit() {
    this.myID = document.cookie.split("=");
    this.orderService.getOrderByID(this.myID[1]); // get order by customer id when the page reloats
  }

}
