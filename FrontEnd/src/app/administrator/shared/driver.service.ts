import { Injectable } from '@angular/core';
import { Driver } from './driver.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DriverService {

  driver : Driver;
  selectedDriver : Driver;
  driverList : Driver[];

  readonly rootUrl = 'http://localhost:53657/';

  constructor(private http: Http) { }

  // HTTP POST Method that adds a new driver
  addDriver(driver : Driver) {
    var body = JSON.stringify(driver);
    var headerOption = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOption });
    return this.http.post(this.rootUrl + 'api/Driver', body, requestOptions)
      .map(responseObservable => responseObservable.json());
  }

  // HTTP PUT Method that updates an existing driver's info
  updateDriver(id, driver) {
    var body = JSON.stringify(driver);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put(this.rootUrl + 'api/Driver/' + id, body, requestOptions)
      .map(responseObservable => responseObservable.json());
  }

  // HTTP GET Method the list of all drivers
  getDriverList() {
    this.http.get(this.rootUrl + 'api/Driver')
    .map((data : Response) => {
      return data.json() as Driver[];
    }).toPromise().then(x => {
      this.driverList = x;
    })
  }

  // HTTP DELETE Method that removes the driver from the database
  deleteDriver(id : number) {
    return this.http.delete(this.rootUrl + 'api/Driver/' + id)
    .map(res => res.json());
  }


}
