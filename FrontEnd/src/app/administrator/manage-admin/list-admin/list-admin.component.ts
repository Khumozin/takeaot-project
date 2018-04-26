import { Component, OnInit } from '@angular/core';

import { AdminService } from '../../shared/admin.service';
import { Admin } from '../../shared/admin.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.component.html',
  styleUrls: ['./list-admin.component.css']
})
export class ListAdminComponent implements OnInit {

  constructor(private adminService : AdminService,
  private toastr : ToastrService) { }

  ngOnInit() {
    this.adminService.getAdminList(); // get admin list whn page reloads
  }

  // button to populate all the text fields for updating an admin
  showForEdit(admin : Admin) {
    this.adminService.selectedAdmin = Object.assign({}, admin); 
  }

  // when the delete button is click on, the admin will be removed fromthe database
  onDelete(id : number) {
    if (confirm('Are you sure to delete this record?') == true)
    {
      this.adminService.deleteAdmin(id)
      .subscribe(x => {
        this.adminService.getAdminList();// get admin list
        this.toastr.warning('Deleted Successfully!');
      })
    }
  }

}
