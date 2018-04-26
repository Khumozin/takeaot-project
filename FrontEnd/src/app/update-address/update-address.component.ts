import { Component, OnInit } from '@angular/core';
import { AddressDetailsService } from '../confirmation/shared/address-details.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.css'],
  providers: [ AddressDetailsService ]
})
export class UpdateAddressComponent implements OnInit {

  // Address Details
  addressID : number;
  custID: number;
  recipientName : string;
  contactNumber : string;
  complex : string;
  streetName : string;
  suburb : string;
  city : string;
  postalCode : string;

  constructor(private addressDetailsService : AddressDetailsService,
    private toastr : ToastrService,
  private router : Router) { }

  ngOnInit() {

    // get address
    this.addressDetailsService.getAddress()
    .subscribe( data => {
      this.addressDetailsService.addressList = Object.assign({}, data.json());
      
      // assigning data to vaiables
      this.addressID = this.addressDetailsService.addressList[0].AddressID;
      this.custID = this.addressDetailsService.addressList[0].CustomerID;
      this.recipientName = this.addressDetailsService.addressList[0].RecipientName;
      this.contactNumber = this.addressDetailsService.addressList[0].ContactNumber;
      this.complex = this.addressDetailsService.addressList[0].Complex;
      this.streetName = this.addressDetailsService.addressList[0].StreetName;
      this.suburb = this.addressDetailsService.addressList[0].Suburb;
      this.city = this.addressDetailsService.addressList[0].City;
      this.postalCode = this.addressDetailsService.addressList[0].PostalCode;
    })

  }

  // delete address method
  onDelete(id : number){
    if (confirm('Are you sure to delete this record?') == true)
    {
      this.addressDetailsService.deleteAddress(this.addressID)
      .subscribe(data => {
        this.toastr.warning("Address Deleted!");

        var btn = document.getElementById("btnUpdate") as HTMLInputElement;
        btn.disabled = true;

        this.router.navigate(['/checkout']);
      })
    }
  }

// update address method
  onSubmit(form : NgForm){
    this.addressDetailsService.updateAddress(this.addressID, form.value)
    .subscribe(data => {
      this.toastr.info("Address Updated!");
      this.router.navigate(['/checkout']);
    })
  }

}
