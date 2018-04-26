import { Component, OnInit } from '@angular/core';

import { AdminService } from '../shared/admin.service';

@Component({
  selector: 'app-manage-admin',
  templateUrl: './manage-admin.component.html',
  styleUrls: ['./manage-admin.component.css'],
  providers: [ AdminService ]
})
export class ManageAdminComponent implements OnInit {

  constructor(private adminService : AdminService) { }

  ngOnInit() {
  }

}
