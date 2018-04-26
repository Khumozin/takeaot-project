import { Injectable } from '@angular/core';
import { Credit } from './credit.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class CreditService {

  credit : Credit;
  creditList : Credit;
  readonly rootUrl = 'http://localhost:53657/';

  constructor(private http : Http, private httpClient : HttpClient) { }

  // HTTP POST Method that ADDS a NEW CREDIT PAYMENT
  addCDPayment(credit : Credit) {
    var body = JSON.stringify(credit);
    var headerOption = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOption });
    return this.http.post(this.rootUrl + 'api/Credit', body, requestOptions)
      .map(responseObservable => responseObservable.json());
  }

  // HTTP GET Method that gets a CREDIT PAYMENT BY PAYMENT ID
  getCredit(id : number)
  {
    return this.http.get(this.rootUrl + 'api/Credit?id=' + id);
  }

  // HTTP PUT Method that UPDATES a CREDIT PAYMENT
  updateCredit(id, credit) {
    var body = JSON.stringify(credit);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put(this.rootUrl + 'api/Credit/' + id, body, requestOptions)
      .map(responseObservable => responseObservable.json());
  }

}
