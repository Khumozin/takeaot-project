import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../shared/admin.service';
import { NgForm } from '@angular/forms'; // ng forms is imported since we getting data from the form in the UI
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  constructor(private adminService : AdminService, private toastr : ToastrService) { }

  ngOnInit() {
    this.resetForm(); // call reset form method
  }

  // reset the form when the admin is added
  resetForm(form? : NgForm) {
    if (form != null)
      form.reset();
    this.adminService.selectedAdmin = {
      AdminID : 0,
      FirstName : '',
      LastName : '',
      Email : '',
      Password : ''
    }
  }

  // check if the admin is updating anotheradmin or is addid a new admin
  onSubmit(form : NgForm) {
    if(form.value.AdminID == 0) // if the admin id is equals to zero then the admin is added to the database
    {
      this.adminService.addAdmin(form.value)
      .subscribe( data => {
        this.resetForm(form);
        this.adminService.getAdminList(); //get admin list that whill appear on the browers as a list of admins
        this.toastr.success('Admin successfully added!');
      })
      
      
    } else { // if the admin id is not equals to zero then the admin is updated in the database
      this.adminService.updateAdmin(form.value.AdminID, form.value)
      .subscribe(data => {
        this.resetForm(form);
        this.adminService.getAdminList(); //get admin list that whill appear on the browers as a list of admins
        this.toastr.info('Record Updated Successfully!');
      })
    }
    
  }

}
