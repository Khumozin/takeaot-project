import { Injectable } from '@angular/core';
import { Admin } from './admin.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AdminService {

  admin : Admin;
  selectedAdmin : Admin;
  adminList : Admin[];

  readonly rootUrl = 'http://localhost:53657/';

  constructor(private http: Http) { }

  // HTTP POST Method that adds a new admin
  addAdmin(admin: Admin) {
    var body = JSON.stringify(admin);
    var headerOption = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOption });
    return this.http.post(this.rootUrl + 'api/Administrator', body, requestOptions)
      .map(responseObservable => responseObservable.json());
  }

  // HTTP PUT Method that updates an existing admin
  updateAdmin(id, admin) {
    var body = JSON.stringify(admin);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put(this.rootUrl + 'api/Administrator/' + id, body, requestOptions)
      .map(responseObservable => responseObservable.json());
  }

  // HTTP GET Method gets the list of all the admins
  getAdminList() {
    this.http.get(this.rootUrl + 'api/Administrator')
    .map((data : Response) => {
      return data.json() as Admin[];
    }).toPromise().then(x => {
      this.adminList = x;
    })
  }

  // HTTP DELETE Method remooves an admin from the database
  deleteAdmin(id : number) {
    return this.http.delete(this.rootUrl + 'api/Administrator/' + id)
    .map(res => res.json());
  }

}
