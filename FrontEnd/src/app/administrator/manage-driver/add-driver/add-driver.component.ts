import { Component, OnInit } from '@angular/core';
import { DriverService } from '../../shared/driver.service';
import { NgForm } from '@angular/forms'; // ng forms is imported since we getting data from the form in the UI
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})
export class AddDriverComponent implements OnInit {

  constructor(private driverService : DriverService, 
    private toastr : ToastrService) { }

  ngOnInit() {
    this.resetForm(); // call reset form method
  }

  // reset the form when the driver is added
  resetForm(form? : NgForm) {
    if (form != null)
      form.reset();
    this.driverService.selectedDriver = {
      DriverID : 0,
      FirstName : '',
      LastName : '',
      Email : '',
      Password : ''
    }
  }

// check if the admin is updating a driver or is addin a new driver
  onSubmit(form : NgForm) {
    if(form.value.DriverID == 0) // if the driver id is equals to zero then the driver is added to the database
    {
      this.driverService.addDriver(form.value)
      .subscribe( data => {
        this.resetForm(form);
        this.driverService.getDriverList(); //get admin list
        this.toastr.success('Driver successfully added!');
      })
      
      
    } else {  // if the driver id is not equals to zero then the driver is updated in the database
      this.driverService.updateDriver(form.value.DriverID, form.value)
      .subscribe(data => {
        this.resetForm(form);
        this.driverService.getDriverList(); //get admin list
        this.toastr.info('Record Updated Successfully!');
      })
    }
  }

}