import { Component, OnInit } from '@angular/core';
import { ScheduleService } from './shared/schedule.service';
import { NgForm } from '@angular/forms';
import { Schedule } from './shared/schedule.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  providers: [ ScheduleService ]
})
export class ScheduleComponent implements OnInit {

  schedule : Schedule;
  category : string = 'Cellphones';
  myID : any;
  constructor(private scheduleService : ScheduleService,
  private toastr : ToastrService) { }

  ngOnInit() {
    this.myID = document.cookie.split("=");
  }

  onSubmit(form : NgForm)
  {

    if ((document.getElementById("computers") as HTMLInputElement).checked)
    {
      this.category = "Computers & Tablets";
    } 
    else if ((document.getElementById("tv") as HTMLInputElement).checked)
    {
      this.category = "TV, Audio & Video"
    }
    else if ((document.getElementById("cellphones") as HTMLInputElement).checked)
    {
      this.category = "Cellphones";
    }
    else if ((document.getElementById("cameras") as HTMLInputElement).checked)
    {
      this.category = "Cameras";
    }
    else if ((document.getElementById("gaming") as HTMLInputElement).checked)
    {
      this.category = "Gaming";
    }

    this.schedule = {
      ScheduleID : 0,
      SupplierID : this.myID[1], /*+localStorage.getItem('sID'),*/
      Category : this.category,
      CompanyName : form.value.CompanyName,
      ProductName : form.value.ProductName,
      ProductQuantity : form.value.ProductQuantity,
      SupplyDate : form.value.SupplyDate
    }

    this.scheduleService.addSchedule(this.schedule)
    .subscribe(data => {
        this.toastr.success("Notification Sent!");
    })
  }

}
