import { Component, OnInit } from '@angular/core';
import { ProductService } from '../administrator/shared/product.service';
import { Product } from '../administrator/shared/product.model';
import { CartService } from '../cart/shared/cart.service';
import { Cart } from '../cart/shared/cart.model';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ ProductService ]
})
export class HomeComponent implements OnInit {

  cart : Cart;
  customerID : number = 1;
  quantity : number = 1;
  myID : any;

  constructor(private productService : ProductService,
    private cartService : CartService,
    private toastr : ToastrService) { }

  ngOnInit() {
    this.productService.getProductList(); // get productlist
    this.myID = document.cookie.split("="); // get browser cookie
  }

  // adding product to cart
  addCart(product : Product) {
    this.cart ={
      CartID : 0,
      ProductID : product.ProductID,
      CustomerID : this.myID[1],
      ProductQuantity : 1
    }
    console.log(this.cart);
     this.cartService.addCart(this.cart)
     .subscribe( data => {
       location.reload();
       this.cartService.getCartList();
       this.toastr.success('Added to cart!');
     })
   }

}
