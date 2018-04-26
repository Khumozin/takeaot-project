import { Component, OnInit } from '@angular/core';
import { CartDetailsService } from '../cart/shared/cart-details.service';
import { CartDetails } from '../cart/shared/cart-details.model';
import { Order } from './shared/order.model';
import { OrderService } from './shared/order.service';
import { ToastrService } from 'ngx-toastr';
import { AddressDetailsService } from './shared/address-details.service';
import { PaymentService } from '../payment/shared/payment.service';
import { Route, Router } from '@angular/router';

import { OrderItemService } from '../orderItem/shared/order-item.service';
import { OrderItem } from '../orderItem/shared/order-item.model';
import { CartService } from '../cart/shared/cart.service';
import { Cart } from '../cart/shared/cart.model';
import { ProductService } from '../administrator/shared/product.service';
import { Product } from '../administrator/shared/product.model';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
  providers: [ OrderService, CartDetailsService, 
              AddressDetailsService, PaymentService, 
              OrderItemService, ProductService, CartService ]
})
export class ConfirmationComponent implements OnInit {

  order : Order;
  items : Array<Cart> = [];
  products : Array<Product> = [];
  productQ : number;
  itemsQ : number;
  newQuantity : number;
  product : Product;
  productLength : number;
  today : string;
  threeDaysLater : string;
  fiveDaysLater : string;
  sevenDaysLater : string;
  iteration : number;
  deliveryDate : string;
  quantity : number;
  details: Array<CartDetails> = [];
  arrayLength : number;
  totalPrice : number = 0;
  tP : number = 0;
  recipientName : string;
  complex : string;
  streetName : string;
  suburb : string;
  city : string;
  postalCode : string;
  orderSummary : CartDetails;
  method : string;
  orderObj : any;
  oID : number;
  orderItem : OrderItem;
  myID : any;

  constructor(private cartDetailsService : CartDetailsService,
  private orderService : OrderService,
  private paymentService : PaymentService,
  private orderItemService : OrderItemService,
  private addressDetailsService : AddressDetailsService,
  private productService : ProductService,
  private cartService : CartService,
  private toastr : ToastrService,
  private router : Router) { }

  ngOnInit() {

    this.myID = document.cookie.split("=");
    this.today = this.getToday(); //get current date
    this.threeDaysLater = this.getThreeDaysLate(); // three days from today
    this.fiveDaysLater = this.getFiveDaysLate(); // 5 days fom today
    this.sevenDaysLater = this.getSevenDaysLate(); // 7 days from today
    
    // get address
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

     this.cartDetailsService.getList(); // get cart list
     this.cartDetailsService.getCartList(); // get cart list

     // get cart list
     this.cartDetailsService.cartDetailsList
    .subscribe((cartArray: Array<CartDetails>) => {
      this.details = cartArray;
      console.log(cartArray);
      if (cartArray.length > 0) {
        this.arrayLength = cartArray.length;
        this.tP = this.calculatePrice(); // call calculate price method
      }
    })

    // get payment
    this.paymentService.getPayment()
    .subscribe(data => {
      this.paymentService.paymentMethod = Object.assign({}, data.json());
      this.method = this.paymentService.paymentMethod[0].PaymentType;
    })

    // get cart items
    this.cartService.getCartItem();
    this.cartService.cartItemList
    .subscribe((cartArray : Array<Cart>) => {
      this.items = cartArray; 
      if (cartArray.length > 0) // get the number of products in a cart
      {
        this.iteration = cartArray.length; //assign the length of the cart array to a variable
      }

    })

  }

  // current date
  getToday(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();

    if(dd<10){
        dd= +('0'+dd);
    } 
    if(mm<10){
        mm = +('0'+mm);
    } 

    return dd+'/'+mm+'/'+yyyy;
  }

  // 3 days from today's date
  getThreeDaysLate() {
    var today = new Date();
    var dd = today.getDate() + 3;
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();

    if(dd<10){
        dd = +('0'+dd);
    } 
    if(mm<10){
        mm = +('0'+mm);
    } 
    return dd+'/'+mm+'/'+yyyy;
  }

  // 5 days from today's date
  getFiveDaysLate() {
    var today = new Date();
    var dd = today.getDate() + 5;
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();

    if(dd<10){
        dd= +('0'+dd);
    } 
    if(mm<10){
        mm = +('0'+mm);
    } 
    return dd+'/'+mm+'/'+yyyy;
  }

  // 7 days from today's date
  getSevenDaysLate() {
    var today = new Date();
    var dd = today.getDate() + 7;
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();

    if(dd<10){
        dd= +('0'+dd);
    } 
    if(mm<10){
        mm = +('0'+mm);
    } 
    return dd+'/'+mm+'/'+yyyy;
  }

  // calculate price method
  calculatePrice(){
    // calculating the total price of the products in cart
    for (var i = 0; i < this.arrayLength; i++)
    {
      this.totalPrice += this.details[i].ProductPrice * this.details[i].ProductQuantity;
    }
    return this.totalPrice || 0;
  }

  // confirm order method
  onClick() {

    if ((document.getElementById("sameDay") as HTMLInputElement).checked)
    {
      this.deliveryDate = this.getToday();
    } 
    else if ((document.getElementById("dayThree") as HTMLInputElement).checked)
    {
      this.deliveryDate = this.getThreeDaysLate();
    } 
    else if ((document.getElementById("dayFive") as HTMLInputElement).checked)
    {
      this.deliveryDate = this.getFiveDaysLate();
    } 
    else if ((document.getElementById("daySeven") as HTMLInputElement).checked)
    {
      this.deliveryDate = this.getSevenDaysLate();
    }
    this.order = {
      OrderID : 0,
      CustomerID : this.myID[1],
      OrderDate : this.getToday(),
      DeliveryDate : this.deliveryDate,
      TotalPrice : this.tP,
      DeliveryStatus : "Not Delivered"
    }
    this.orderService.addOrder(this.order)
    .subscribe(data => {
      this.toastr.success('Ordered Successful!');
      var btnCont = document.getElementById("btnContinue") as HTMLInputElement;
      btnCont.disabled = false;
      var btnConf = document.getElementById("btnConfirm") as HTMLInputElement;
      btnConf.disabled = true; // disable a button after confirming an order
    })
    this.productMethod(); // call get product method
  }

  // get product
  productMethod()
  {
    for (var x = 0; x < this.iteration; x++)
    {
      this.itemsQ = this.items[x].ProductQuantity;
      this.productService.getP(this.items[x].ProductID); // get a specific product from cart by product id
      this.productService.p.subscribe((productArray : Array<Product>) => {
        this.products = productArray; // product length, which is one
        if (productArray.length > 0)
        {
          this.productLength = productArray.length;
          for (var z = 0; z < this.productLength; z++)
          {
            this.productQ = this.products[z].ProductQuantity;
            this.newQuantity = this.productQ - this.itemsQ; // subtracting quantity everytime a customer confirms an order
            
            this.product = {
              ProductID : this.products[z].ProductID,
              SupplierID : this.products[z].SupplierID,
              ProductName : this.products[z].ProductName,
              CategoryName : this.products[z].CategoryName,
              ProductDescription : this.products[z].ProductDescription,
              ProductPrice : this.products[z].ProductPrice,
              ProductQuantity : this.newQuantity,
              ProductImg : this.products[z].ProductImg,
              MinimumQuantity : this.products[z].MinimumQuantity
            }

              //update product
              this.productService.updateProduct(this.products[z].ProductID, this.product) // update new product
              .subscribe(data => {
              })
          }
        }
      })
    }
  }


  onContinue(){
    this.orderService.getOrder()
    .subscribe(data => {
      this.orderObj = Object.assign({}, data.json());
      this.oID = this.orderObj.OrderID;
      console.log(this.oID);

        for (var i = 0; i < this.arrayLength; i++)
        {

          console.log('Cart ID : '+ this.details[i].CartID);
          
          this.orderItem = {
            OrderItemID : 0,
            OrderID : this.oID,
            ProductID : this.details[i].ProductID,
            ProductQuantity : this.details[i].ProductQuantity
          }
          
          this.orderItemService.addOrderItem(this.orderItem)
          .subscribe(data => {
              
          })

          this.orderItemService.deleteCart(this.details[i].CartID)
          .subscribe(data => {
            console.log('Deleted');
          })
        }

      location.reload();
      this.router.navigate(['/details']);
    })

      

  }

}
