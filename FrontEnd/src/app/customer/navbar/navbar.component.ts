import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../shared/customer.service';
import { CartDetails } from '../../cart/shared/cart-details.model';
import { CartDetailsService } from '../../cart/shared/cart-details.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [CustomerService, CartDetailsService] // Cart Detail Service is going to get all the cart details
})
export class NavbarComponent implements OnInit {
  
  // variables
  firstname : string;
  customerClaims : any;
  type : string;
  details: Array<CartDetails> = [];
  arrayLength : number;
  totalQuantity : number = 0;
  tQ : number = 0;

  constructor(private customer : CustomerService,
    private cartDetailsService : CartDetailsService,
    private router : Router) { }

  ngOnInit() {
     
    if (localStorage.getItem('type') == 'Customer') // get type of the logged in user
    {
      this.firstname = '';
      this.customer.getCustomerClaims(); // get customer details
      this.customer.getCustomerClaims().subscribe((data : any) => {
        this.firstname = data.FirstName; // assing customer's name to a variable that will be binded in the HTML Page To apper in the navbar
      });

      this.cartDetailsService.getCartList(); // get cart details
      this.cartDetailsService.cartDetailsList
      .subscribe((cartArray: Array<CartDetails>) => {
        this.details = cartArray; // save returned data to an array

        // -- get the length of the array
        if (cartArray.length > 0) {
          this.arrayLength = cartArray.length;
          this.tQ = 0;
          this.tQ = this.calculateQuanity(); // method that calculates cart quantity is assigned to a variable which will be binded to the HTML Page to show in the navbar
        }
      })
    }

  }

  // logout method
  logout()
  {
    location.reload();
    localStorage.clear();
    this.router.navigate(['/sign-in']);
  }

  // this method calculates total cart quantity
  calculateQuanity(){

    for (var i = 0; i < this.arrayLength; i++)
    {
      this.totalQuantity += this.details[i].ProductQuantity; // calculating quantity by index of the item
    }

    return this.totalQuantity || 0;
  
}

}
