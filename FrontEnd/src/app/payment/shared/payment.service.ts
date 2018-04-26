import { Injectable } from '@angular/core';
import { Payment } from './payment.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class PaymentService {

  payment : Payment;
  paymentList : Payment;
  paymentMethod : Payment;
  myID : any = document.cookie.split("=");
  readonly rootUrl = 'http://localhost:53657/';  

  constructor(private http : Http, private httpClient : HttpClient) { }

  // HTTP POST Method that makes a new payment
  addPayment(payment : Payment) {
    var body = JSON.stringify(payment);
    var headerOption = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOption });
    return this.http.post(this.rootUrl + 'api/Payment', body, requestOptions)
      .map(responseObservable => responseObservable.json());
  }

  // HTTP PUT Method that updates pament
  updatePayment(id, payment) {
    var body = JSON.stringify(payment);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put(this.rootUrl + 'api/Payment/' + id, body, requestOptions)
      .map(responseObservable => responseObservable.json());
  }

  // HTTP GET Method that gets a customer's pament details by customer id
  getPayment() {
    return this.http.get(this.rootUrl + 'api/Payment?id=' + this.myID[1] /*+localStorage.getItem('CustomerID');*/);
  }

}
