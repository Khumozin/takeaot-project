import { Component, OnInit } from '@angular/core';
import { DriverService } from '../../shared/driver.service';
import { Driver } from '../../shared/driver.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-driver',
  templateUrl: './list-driver.component.html',
  styleUrls: ['./list-driver.component.css']
})
export class ListDriverComponent implements OnInit {

  constructor(private driverService : DriverService,
    private toastr : ToastrService) { }
  
    ngOnInit() {
      this.driverService.getDriverList(); // get driver list when page reloads
    }
  
    // button to populate all the text fields for updating the driver
    showForEdit(driver : Driver) {
      this.driverService.selectedDriver = Object.assign({}, driver);
    }
  
     // when the delete button is click on, the driver will be removed fromthe database
    onDelete(id : number) {
      if (confirm('Are you sure to delete this record?') == true)
      {
        this.driverService.deleteDriver(id)
        .subscribe(x => {
          this.driverService.getDriverList(); // get driver list
          this.toastr.warning('Deleted Successfully!');
        })
      }
    }

}
