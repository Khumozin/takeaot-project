import { Component, OnInit } from '@angular/core';
import { DriverService } from '../shared/driver.service';
@Component({
  selector: 'app-manage-driver',
  templateUrl: './manage-driver.component.html',
  styleUrls: ['./manage-driver.component.css'],
  providers: [ DriverService ]
})
export class ManageDriverComponent implements OnInit {

  constructor(private driverService : DriverService) { }

  ngOnInit() {
  }

}
