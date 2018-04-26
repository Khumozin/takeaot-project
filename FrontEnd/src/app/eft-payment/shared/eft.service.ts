import { Injectable } from '@angular/core';
import { Eft } from './eft.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class EftService {

  eft : Eft;
  eftList : Eft;
  readonly rootUrl = 'http://localhost:53657/';

  constructor(private http : Http, private httpClient : HttpClient) { }

  // HTTP POST Method that a new eft payment
  addPayment(eft : Eft) {
    var body = JSON.stringify(eft);
    var headerOption = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOption });
    return this.http.post(this.rootUrl + 'api/Eft', body, requestOptions)
      .map(responseObservable => responseObservable.json());
  }

  // HTTP GET Method that gets an eft by payment id
  getEft(id : number)
  {
    return this.http.get(this.rootUrl + 'api/GetEftByPaymentID?id=' + id);
  }

  // HTTP PUT Method that updates an eft payments
  updateEft(id, eft) {
    var body = JSON.stringify(eft);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put(this.rootUrl + 'api/Eft/' + id, body, requestOptions)
      .map(responseObservable => responseObservable.json());
  }
}
