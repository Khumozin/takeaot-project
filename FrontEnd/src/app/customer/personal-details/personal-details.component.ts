import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { CustomerService } from '../shared/customer.service';
import { Customer } from '../shared/customer.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css'],
  providers: [CustomerService]
})
export class PersonalDetailsComponent implements OnInit {

  // variables
  customerClaims : any; // variable that will save customer's info
  customer : Customer; // variable of type Customer Model

  constructor(private customerService : CustomerService,
    private toastr : ToastrService) { }

  ngOnInit() {
    // get customer info whe the page is loaded
    this.customerService.getCustomerClaims().subscribe((data : any) => {
      this.customerClaims = data; // assinging the response to a variable of type "any"
    })

  }

  // update customer's profile by customer id
  onSubmit(form : NgForm){
    this.customerService.updateCustomer(form.value.CustomerID, form.value)
    .subscribe(data => {
      this.toastr.info('Updated Successful!');
    })
  }
  
}
