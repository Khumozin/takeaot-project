import { Component, OnInit } from '@angular/core';
import { Cart } from './shared/cart.model';
import { CartService } from './shared/cart.service';
import { CartDetails } from './shared/cart-details.model';
import { CartDetailsService } from './shared/cart-details.service';
import { ProductService } from '../administrator/shared/product.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [ CartService, CartDetailsService, ProductService ]
})
export class CartComponent implements OnInit {
  
  // Variables

  details: Array<CartDetails> = [];
  arrayLength : number;
  totalQuantity : number = 0;
  tQ : number = 0;
  totalPrice : number = 0;
  tP : number = 0;
  quantityFromProducts : number = 0; 

  // update array
  updateArray : Cart[];
  cart : Cart;

  // - Order Date
  day = new Date();
  date : any;

  myID : any;
  
  constructor(private cartService : CartService,
    private cartDetailsService : CartDetailsService,
    private productService : ProductService,
    private toastr : ToastrService ) { }

  ngOnInit() {
    this.myID = document.cookie.split("=");

    this.cartDetailsService.getCartList(); // get cart list

    this.cartDetailsService.cartDetailsList
    .subscribe((cartArray: Array<CartDetails>) => {
      // set data
      this.details = cartArray;
      console.log(cartArray);
      

      // -- check the length of my array
      if (cartArray.length > 0) {
        this.arrayLength = cartArray.length;
        this.tQ = 0;
        this.tQ = this.calculateQuanity(); // calculate quantity
        this.tP = this.calculatePrice(); //calculate price
        localStorage.setItem('TotalPrice', '' + this.tP);
      }
    })

    
  }


// delete item from cart
  onDelete(id : number) {
    if (confirm('Delete this product?') == true)
    {
      this.cartService.deleteCart(id)
      .subscribe(x => {
        this.cartDetailsService.getCartList();

        // Update Quantity On Cart Summary
        location.reload();
        
        this.toastr.warning('Deleted Successfully!');
      })
    }
  }


  // update item quantity
  onUpdate(cart){

    // get product quantity by product id from the customer's cart
    this.productService.getProductQuantity(cart.ProductID)
    .subscribe(data => {
      this.productService.productQuantity = Object.assign({}, data.json());
      // assign product quantity to a variable
      this.quantityFromProducts = this.productService.productQuantity[0].ProductQuantity;
    })

    // compare if the quantity that the customer's want is more than the avaible quantity in the database
    if (cart.ProductQuantity > this.quantityFromProducts)
    {
      // Show popup message to user
      var popup = document.getElementById("myPopup");
      popup.classList.toggle("show");      
    }
    else
    {
      cart = {
        CartID : cart.CartID,
        ProductID : cart.ProductID,
        CustomerID : this.myID[1],
        ProductQuantity : cart.ProductQuantity
      }
      this.cartService.updateCart(cart.CartID, cart)
        .subscribe(data => {
          this.cartDetailsService.getCartList();
          this.toastr.info('Record Updated Successfully!');
        })
        
        location.reload();
    }

    
  }

  // calculate the sum of all items in the customer's cart
  calculateQuanity(){

      for (var i = 0; i < this.arrayLength; i++)
      {
        this.totalQuantity += this.details[i].ProductQuantity;
      }

      return this.totalQuantity || 0;
    
  }

  // calculate cart total price
  calculatePrice(){

    for (var i = 0; i < this.arrayLength; i++)
    {
      this.totalPrice += this.details[i].ProductPrice * this.details[i].ProductQuantity;
    }

    return this.totalPrice || 0;
    }

  // get currentdatte
  getDateMethod () {
    this.day.getDate();
    this.day.getMonth();
    this.day.getFullYear();

    this.date = this.day +'/'+ this.day +'/'+ this.day;

    return this.date;
  }

  geteToday(){
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

}
