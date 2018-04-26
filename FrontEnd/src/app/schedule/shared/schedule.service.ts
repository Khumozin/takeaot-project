import { Injectable } from '@angular/core';
import { Schedule } from './schedule.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ScheduleService {

  schedule : Schedule;
  scheduleList : Schedule[];

  readonly rootUrl = 'http://localhost:53657/';

  constructor(private http: Http) { }

  // HTTP POST Method that adds asupplier's shedule
  addSchedule(cart: Schedule) {
    var body = JSON.stringify(cart);
    var headerOption = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOption });
    return this.http.post(this.rootUrl + 'api/schedule', body, requestOptions)
      .map(responseObservable => responseObservable.json());
  }

  // HTTP GET Method that gets a list of schedules
  getSchedule() {
    this.http.get(this.rootUrl + 'api/schedule')
    .map((data : Response) => {
      return data.json() as Schedule[];
    }).toPromise().then(x => {
      this.scheduleList = x;
    })
  }

  // HTTP DELETE Method that removes a schedule
  deleteSchedule(id : number) {
    return this.http.delete(this.rootUrl + 'api/schedule/' + id)
    .map(res => res.json());
  }

}
