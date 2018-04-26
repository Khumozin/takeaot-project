import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../../shared/supplier.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent implements OnInit {

  constructor(private supplierService : SupplierService, 
    private toastr : ToastrService) { }

  ngOnInit() {
    this.resetForm(); // call reset method
  }

  // reset the form when the supplier is added
  resetForm(form? : NgForm) {
    if (form != null)
      form.reset();
    this.supplierService.selectedSupplier = {
      SupplierID : 0,
      FirstName : '',
      LastName : '',
      Email : '',
      Password : '',
      CompanyName : ''
    }
  }


  // check if the admin is updating a supplier or is adding a new supplier
  onSubmit(form : NgForm) {
    if(form.value.SupplierID == 0) // if the supplier id is equals to zero then the supplier is added to the database
    {
      this.supplierService.addSupplier(form.value)
      .subscribe( data => {
        this.resetForm(form);
        this.supplierService.getSupplierList(); // get supplier list
        this.toastr.success('Supplier successfully added!');
      })
      
      
    } else { // if the supplier id is not equals to zero then the supplier is updated in the database
      this.supplierService.updateSupplier(form.value.SupplierID, form.value)
      .subscribe(data => {
        this.resetForm(form);
        this.supplierService.getSupplierList();// get supplier list
        this.toastr.info('Record Updated Successfully!');
      })
    }
  }

}
