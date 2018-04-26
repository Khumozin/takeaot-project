import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../schedule/shared/schedule.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-get-schedule',
  templateUrl: './get-schedule.component.html',
  styleUrls: ['./get-schedule.component.css'],
  providers: [ScheduleService]
})
export class GetScheduleComponent implements OnInit {

  constructor(private scheduleService : ScheduleService,
  private toastr : ToastrService) { }

  ngOnInit() {
    this.scheduleService.getSchedule(); // get list of schedues
  }

  // delete schedule
  onDelete(id : number) {
    if (confirm('Are you sure to delete this record?') == true)
    {
      this.scheduleService.deleteSchedule(id)
      .subscribe(x => {
        this.scheduleService.getSchedule();
        this.toastr.warning('Deleted Successfully!');
      })
    }
  }

}
