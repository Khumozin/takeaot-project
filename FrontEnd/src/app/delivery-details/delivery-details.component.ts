import { Component, OnInit } from '@angular/core';
import { AddressDetailsService } from '../confirmation/shared/address-details.service';
import { NgForm } from '@angular/forms';
import { OrderService } from '../confirmation/shared/order.service';
import { Order } from '../confirmation/shared/order.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.component.html',
  styleUrls: ['./delivery-details.component.css'],
  providers: [ AddressDetailsService, OrderService ]
})
export class DeliveryDetailsComponent implements OnInit {

  // Order
  order : Order;
  oDate : string;
  dDate : string;
  tPrice : number;
  dStatus : string;
  checkSatus : string;

  // Address Details
  cID : number;
  oID : number;
  recipientName : string;
  complex : string;
  streetName : string;
  suburb : string;
  city : string;
  postalCode : string;



  constructor(private addressDetailsService : AddressDetailsService,
    private orderService : OrderService,
    private router : Router,
    private toastr : ToastrService) { }

  ngOnInit() {

    this.cID = +localStorage.getItem('cID');
    this.oID = +localStorage.getItem('oID');

    this.addressDetailsService.getAdd(this.cID)
    .subscribe( data => {
      this.addressDetailsService.addressList = Object.assign({}, data.json());
      this.recipientName = this.addressDetailsService.addressList[0].RecipientName;
      this.complex = this.addressDetailsService.addressList[0].Complex;
      this.streetName = this.addressDetailsService.addressList[0].StreetName;
      this.suburb = this.addressDetailsService.addressList[0].Suburb;
      this.city = this.addressDetailsService.addressList[0].City;
      this.postalCode = this.addressDetailsService.addressList[0].PostalCode;
    })

    this.orderService.getCustomerOrder(this.cID)
    .subscribe(data => {
      this.orderService.customerOrder = Object.assign({}, data.json());

      this.oDate = this.orderService.customerOrder[0].OrderDate;
      this.dDate = this.orderService.customerOrder[0].DeliveryDate;
      this.tPrice = this.orderService.customerOrder[0].TotalPrice;


      if (this.orderService.customerOrder[0].DeliveryStatus === "Not Delivered")
      {
        var rBtnNotDel = document.getElementById("notDelivered") as HTMLInputElement;
        var rBtnDel = document.getElementById("delivered") as HTMLInputElement;
        rBtnNotDel.checked = true;
        rBtnDel.checked = false;
      }
      else if (this.orderService.customerOrder[0].DeliveryStatus === "Delivered")
      {
        var rBtnNotDel = document.getElementById("notDelivered") as HTMLInputElement;
        var rBtnDel = document.getElementById("delivered") as HTMLInputElement;
        var btn = document.getElementById("btnUpdate") as HTMLInputElement;
        btn.disabled = true;
        rBtnNotDel.checked = false;
        rBtnDel.checked = true;

      }
    })

  }


  onStatus(form : NgForm){


    if ((document.getElementById("notDelivered") as HTMLInputElement).checked)
    {
      this.dStatus = "Not Delivered";
    }
    else if ((document.getElementById("delivered") as HTMLInputElement).checked)
    {
      this.dStatus = "Delivered";
    }

    this.order = {
      OrderID : this.oID,
      CustomerID : this.cID,
      OrderDate : this.oDate,
      DeliveryDate : this.dDate,
      TotalPrice : this.tPrice,
      DeliveryStatus : this.dStatus
    }
    this.orderService.updateOrder(this.oID, this.order)
    .subscribe(data => {
      this.toastr.info('Updated');
      var btn = document.getElementById("btnUpdate") as HTMLInputElement;
      btn.disabled = true;
    })

    
  }

  onClick() {
    this.router.navigate(['/driver']);
  }

}
