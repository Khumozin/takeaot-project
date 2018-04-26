import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerService } from '../shared/customer.service'; // customer service that has HTTP methoda
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Route, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { SupplierService } from '../../administrator/shared/supplier.service'; // supplier service that has HTTP methoda

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [ CustomerService, SupplierService ] // these services that handles the user registration and login
})
export class SignInComponent implements OnInit {
  
  // Variables
  isLoginError: boolean = false;
  userEmail : string; // assign user email to a variable to be use
  userID : number;  // assign user customer/supplier id to a variable to be use

  constructor(private customerService: CustomerService, 
    private supplierService : SupplierService,
    private toastr : ToastrService, 
    private router : Router) { 
    }

  ngOnInit() {
  }

  // login method
  OnSubmit(Email, Password) {

    // getting user token to check if the user is provided valid email and password
    this.customerService.authentication(Email, Password)
    .subscribe((data : any) => {
      localStorage.setItem('token', data.access_token);
      location.reload();
   

     if (Email.substr(-18) === 'admin@takealot.com') // check if user is admin
     {
       localStorage.setItem('type', 'Admin'); // saving user type to localStorage which will later be used in the navbar
       this.toastr.success('Welcome Admin!'); 
       this.router.navigate(['/manage-admin']); // direct admin to admin page
     }
     else if (Email.substr(-19) === 'driver@takealot.com') // check if user is driver
     { 
      localStorage.setItem('type', 'Driver'); // saving user type to localStorage which will later be used in the navbar
      this.toastr.success('Welcome Driver!'); 
      this.router.navigate(['/driver']); // direct driver to driver page
     }
     else if (Email.substr(-21) === 'supplier@takealot.com') // check if user is supplier
     {
      this.userEmail = Email;
      localStorage.setItem('type', 'Supplier'); // saving user type to localStorage which will later be used in the navbar
      this.supplierMethod(); // calling supplier method that gets the supplier's id
      this.toastr.success('Welcome Supplier!'); 
      this.router.navigate(['/supplier']); // direct supplier to supplier page
     }
     else // user is cusstomer
     {
      localStorage.setItem('type', 'Customer'); // saving user type to localStorage which will later be used in the navbar

      this.userEmail = Email;
      this.customerMethod(); // calling supplier method that gets the supplier's id
      this.toastr.success('Youre now logged in. Sweet.');
      this.router.navigate(['/home']); // direct customer home page
     }
    },
      (err: HttpErrorResponse) => {
        this.isLoginError = true;
        this.toastr.error("Invalid email or password!");
      });
  }


  // method to get the customer's id
  // using customer service
  customerMethod()
  {
    if (this.userEmail != '') // check if the customer did not pass an empty email
    {
      // get customer id by a parameter which is the customer's email add
      this.customerService.getCustomer(this.userEmail)
      .subscribe(data => {
        this.customerService.cID = Object.assign({}, data.json());
        this.userID = this.customerService.cID[0].CustomerID; // save customer id to a variable
        
        document.cookie = "ID=" + this.userID; // save customer id to browser cookie
        
      })
    }
  }

  // method to get the supplier's id
  // using supplier service
  supplierMethod()
  {
    if (this.userEmail != '') // check if the supplier did not pass an empty email
    {
      // get supplier id by a parameter which is the customer's email add
      this.supplierService.getSupplierID(this.userEmail)
      .subscribe(data => {
        this.supplierService.sID = Object.assign({}, data.json());
        this.userID = this.supplierService.sID[0].SupplierID; // save supplier id to a variable

        document.cookie = "ID=" + this.userID; // save supplier id to browser cookie
      })
    }
  }
  
}
