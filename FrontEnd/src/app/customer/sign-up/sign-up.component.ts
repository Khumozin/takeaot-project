import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerService } from '../shared/customer.service'; // service that handles the user registration and login
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [CustomerService] // service that handles the user registration and login
})
export class SignUpComponent implements OnInit {

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"; // pattern to validate an email in the User Input

  constructor(private customerService: CustomerService, 
    private toastr : ToastrService) { }

  ngOnInit() {
    this.resetForm(); // calling the reset form method
  }

  // reset form after user registration
  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.customerService.customer = {
      CustomerID: null,
      FirstName: '',
      LastName: '',
      Email: '',
      Password: '',
      MobileNumber: '',
      Gender: '',
      Birthday: ''
    }
  }

  // this method will save user's info to the database when the button is clicked
  onSubmit(form : NgForm){
    this.customerService.registerCustomer(form.value)
    .subscribe( data => {
      this.resetForm(form);
      this.toastr.success('Registered Succesful!');
    })
  }
}
